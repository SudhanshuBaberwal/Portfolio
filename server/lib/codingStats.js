/**
 * server/lib/codingStats.js
 * Aggregate endpoint logic.
 * Reuses existing controllers – no duplicated fetch code.
 * Platforms: github, leetcode, codechef, codeforces.
 */

import fetchGithubStats from "../controller/github.js";
import { fetchCodeChefStats } from "../controller/codechefController.js";
import { getCodeforcesStats } from "../controller/codeforces.js";

// In-memory cache: 1 hour fresh, serve stale up to 24 h
const cache = { data: null, cachedAt: 0 };
const ONE_HOUR = 60 * 60 * 1000;
const TWENTY_FOUR_HOURS = 24 * ONE_HOUR;

// ── helpers ──────────────────────────────────────────────────────────────────

function withAbort(promise, signal) {
  return new Promise((resolve, reject) => {
    signal.addEventListener("abort", () => reject(Object.assign(new Error("timeout"), { name: "AbortError" })), { once: true });
    promise.then(resolve, reject);
  });
}

function makeTimer(ms) {
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), ms);
  return { signal: ctrl.signal, clear: () => clearTimeout(id) };
}

function firstDigits(raw) {
  if (raw == null) return undefined;
  const s = String(raw).replace(/\s+/g, " ").trim();
  const m = s.match(/^(\d+)/);
  if (!m) return undefined;
  return parseInt(m[1], 10);
}

function countStars(raw) {
  if (raw == null) return undefined;
  const count = (String(raw).match(/★/g) || []).length;
  return count > 0 ? count : undefined;
}

function sortedLanguages(languagesUsed) {
  if (!languagesUsed || typeof languagesUsed !== "object") return [];
  return Object.entries(languagesUsed)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

// ── per-platform fetchers (all return { status, errorCode?, handle, profileUrl, data? }) ──

async function fetchGitHub(env, signal) {
  const username = env.GITHUB_USERNAME || "SudhanshuBaberwal";
  const token = env.GITHUB_TOKEN || "";
  const profileUrl = `https://github.com/${username}`;
  const t0 = Date.now();
  try {
    const raw = await withAbort(fetchGithubStats(username), signal);
    if (!raw) throw Object.assign(new Error("null response"), { code: "parse_error" });
    const data = {
      publicRepos: raw.publicRepos,
      followers: raw.followers,
      following: raw.following,
      totalStars: raw.totalStars,
      totalForks: raw.totalForks,
      languages: sortedLanguages(raw.languagesUsed),
    };
    if (token && raw.totalContributions != null) {
      data.contributionsLastYear = raw.totalContributions;
    }
    return { status: "ok", handle: username, profileUrl, data, _durationMs: Date.now() - t0 };
  } catch (err) {
    console.error("[codingStats] GitHub error:", err.message);
    const code = err.name === "AbortError" ? "timeout"
      : err.code === "parse_error" ? "parse_error"
      : err.response?.status ? `upstream_status_${err.response.status}`
      : "network";
    return { status: "error", errorCode: code, handle: username, profileUrl, _durationMs: Date.now() - t0 };
  }
}

async function fetchLeetCode(env, signal) {
  const username = env.LEETCODE_USERNAME || "sudhanshubaberwal";
  const profileUrl = `https://leetcode.com/u/${username}/`;
  const t0 = Date.now();
  try {
    const query = {
      query: `
        query getUserProfile($username: String!) {
          matchedUser(username: $username) {
            profile { ranking }
            submitStatsGlobal { acSubmissionNum { difficulty count } }
            badges { displayName creationDate }
            userCalendar { totalActiveDays streak }
          }
          userContestRanking(username: $username) {
            attendedContestsCount
            rating
            globalRanking
            topPercentage
          }
        }
      `,
      variables: { username },
    };

    const fetchPromise = fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Referer": "https://leetcode.com",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
      body: JSON.stringify(query),
    });

    const res = await withAbort(fetchPromise, signal);
    if (!res.ok) {
      return { status: "error", errorCode: `upstream_status_${res.status}`, handle: username, profileUrl, _durationMs: Date.now() - t0 };
    }

    const json = await res.json();
    const mu = json.data?.matchedUser;
    if (!mu) {
      return { status: "error", errorCode: "parse_error", handle: username, profileUrl, _durationMs: Date.now() - t0 };
    }

    // solved counts
    const solved = {};
    for (const it of (mu.submitStatsGlobal?.acSubmissionNum || [])) {
      if (it.difficulty === "All") solved.all = it.count;
      else if (it.difficulty === "Easy") solved.easy = it.count;
      else if (it.difficulty === "Medium") solved.medium = it.count;
      else if (it.difficulty === "Hard") solved.hard = it.count;
    }

    // badges
    const badges = mu.badges || [];
    const badgesCount = badges.length || undefined;
    const latestBadge = badges.length > 0 ? badges[badges.length - 1].displayName : undefined;

    // calendar
    const cal = mu.userCalendar;
    const totalActiveDays = cal?.totalActiveDays ?? undefined;
    const streak = (cal?.streak != null && typeof cal.streak === "number") ? cal.streak : undefined;

    // ranking
    const ranking = mu.profile?.ranking ?? undefined;

    // contest (only if attended)
    let contest = undefined;
    const cr = json.data?.userContestRanking;
    if (cr && cr.attendedContestsCount > 0) {
      contest = {
        rating: cr.rating != null ? Math.round(cr.rating) : undefined,
        globalRanking: cr.globalRanking ?? undefined,
        attendedContestsCount: cr.attendedContestsCount,
        topPercentage: cr.topPercentage ?? undefined,
      };
    }

    const data = { solved };
    if (ranking != null) data.ranking = ranking;
    if (totalActiveDays != null) data.totalActiveDays = totalActiveDays;
    if (streak != null) data.streak = streak;
    if (badgesCount != null) data.badgesCount = badgesCount;
    if (latestBadge != null) data.latestBadge = latestBadge;
    if (contest != null) data.contest = contest;

    return { status: "ok", handle: username, profileUrl, data, _durationMs: Date.now() - t0 };
  } catch (err) {
    console.error("[codingStats] LeetCode error:", err.message);
    const code = err.name === "AbortError" ? "timeout" : "network";
    return { status: "error", errorCode: code, handle: username, profileUrl, _durationMs: Date.now() - t0 };
  }
}

async function fetchCodeChef(env, signal) {
  const username = env.CODECHEF_USERNAME || "aided_care_69";
  const profileUrl = `https://www.codechef.com/users/${username}`;
  const t0 = Date.now();
  try {
    const raw = await withAbort(fetchCodeChefStats(username), signal);
    if (!raw || raw.status === "error") {
      const code = raw?.status === "error" ? "upstream_status_200" : "network";
      return { status: "error", errorCode: code, handle: username, profileUrl, _durationMs: Date.now() - t0 };
    }
    // Normalize the data returned by the existing controller
    const d = raw.data || {};
    const stars = countStars(d.stars);
    const globalRank = firstDigits(d.globalRank);
    const countryRank = firstDigits(d.countryRank);
    const data = {};
    if (d.currentRating != null) data.currentRating = d.currentRating;
    if (d.highestRating != null) data.highestRating = d.highestRating;
    if (stars != null) data.stars = stars;
    if (globalRank != null) data.globalRank = globalRank;
    if (countryRank != null) data.countryRank = countryRank;
    return { status: "ok", handle: username, profileUrl, data, _durationMs: Date.now() - t0 };
  } catch (err) {
    console.error("[codingStats] CodeChef error:", err.message);
    const code = err.name === "AbortError" ? "timeout" : "network";
    return { status: "error", errorCode: code, handle: username, profileUrl, _durationMs: Date.now() - t0 };
  }
}

async function fetchCodeforces(env, signal) {
  const handle = env.CODEFORCES_HANDLE || "";
  const profileUrl = handle ? `https://codeforces.com/profile/${handle}` : "";
  if (!handle) return { status: "unconfigured", errorCode: "unconfigured", handle: "", profileUrl: "" };
  const t0 = Date.now();
  try {
    const raw = await withAbort(getCodeforcesStats(handle), signal);
    if (!raw) throw new Error("null response");
    const data = {};
    if (raw.rating != null) data.rating = raw.rating;
    if (raw.maxRating != null) data.maxRating = raw.maxRating;
    if (raw.rank != null) data.rank = raw.rank;
    if (raw.maxRank != null) data.maxRank = raw.maxRank;
    if (raw.contestsAttended != null) data.contests = raw.contestsAttended;
    if (raw.bestRank != null && isFinite(raw.bestRank)) data.bestRank = raw.bestRank;
    return { status: "ok", handle, profileUrl, data, _durationMs: Date.now() - t0 };
  } catch (err) {
    console.error("[codingStats] Codeforces error:", err.message);
    const code = err.name === "AbortError" ? "timeout" : "network";
    return { status: "error", errorCode: code, handle, profileUrl, _durationMs: Date.now() - t0 };
  }
}

// ── Main export ───────────────────────────────────────────────────────────────

export async function getCodingStats(env = process.env, { debug = false } = {}) {
  const now = Date.now();

  // Serve from fresh cache if < 1 hour old (unless debug)
  if (!debug && cache.data && now - cache.cachedAt < ONE_HOUR) {
    return { ...cache.data, stale: false };
  }

  const timer = makeTimer(6000);
  const { signal } = timer;

  try {
    const [ghRes, lcRes, ccRes, cfRes] = await Promise.allSettled([
      fetchGitHub(env, signal),
      fetchLeetCode(env, signal),
      fetchCodeChef(env, signal),
      fetchCodeforces(env, signal),
    ]);

    const pick = (res, fallback) =>
      res.status === "fulfilled" ? res.value : fallback;

    const github     = pick(ghRes, { status: "error", errorCode: "network", handle: env.GITHUB_USERNAME || "SudhanshuBaberwal", profileUrl: `https://github.com/${env.GITHUB_USERNAME || "SudhanshuBaberwal"}` });
    const leetcode   = pick(lcRes, { status: "error", errorCode: "network", handle: env.LEETCODE_USERNAME || "sudhanshubaberwal", profileUrl: `https://leetcode.com/u/${env.LEETCODE_USERNAME || "sudhanshubaberwal"}/` });
    const codechef   = pick(ccRes, { status: "error", errorCode: "network", handle: env.CODECHEF_USERNAME || "aided_care_69", profileUrl: `https://www.codechef.com/users/${env.CODECHEF_USERNAME || "aided_care_69"}` });
    const codeforces = pick(cfRes, { status: env.CODEFORCES_HANDLE ? "error" : "unconfigured", errorCode: env.CODEFORCES_HANDLE ? "network" : "unconfigured", handle: env.CODEFORCES_HANDLE || "", profileUrl: env.CODEFORCES_HANDLE ? `https://codeforces.com/profile/${env.CODEFORCES_HANDLE}` : "" });

    const result = {
      updatedAt: new Date().toISOString(),
      github,
      leetcode,
      codechef,
      codeforces,
    };

    // Strip internal _durationMs from cached copy but keep for debug
    const forCache = JSON.parse(JSON.stringify(result, (k, v) => k === "_durationMs" ? undefined : v));
    cache.data = forCache;
    cache.cachedAt = now;

    if (debug && process.env.NODE_ENV !== "production") {
      return {
        ...forCache,
        stale: false,
        debugInfo: {
          github:     { url: `https://api.github.com/users/${env.GITHUB_USERNAME || "SudhanshuBaberwal"}`, httpStatus: github.status === "ok" ? 200 : null, durationMs: github._durationMs, errorCode: github.errorCode },
          leetcode:   { url: "https://leetcode.com/graphql", httpStatus: leetcode.status === "ok" ? 200 : null, durationMs: leetcode._durationMs, errorCode: leetcode.errorCode },
          codechef:   { url: `https://www.codechef.com/users/${env.CODECHEF_USERNAME || "aided_care_69"}`, httpStatus: codechef.status === "ok" ? 200 : null, durationMs: codechef._durationMs, errorCode: codechef.errorCode },
          codeforces: { url: env.CODEFORCES_HANDLE ? `https://codeforces.com/api/user.info?handles=${env.CODEFORCES_HANDLE}` : null, httpStatus: codeforces.status === "ok" ? 200 : null, durationMs: codeforces._durationMs, errorCode: codeforces.errorCode },
        },
      };
    }

    return { ...forCache, stale: false };

  } catch (err) {
    console.error("[codingStats] aggregate error:", err.message);
    // Serve stale if under 24 hours
    if (cache.data && now - cache.cachedAt < TWENTY_FOUR_HOURS) {
      return { ...cache.data, stale: true };
    }
    // Otherwise return error shape
    const u = env.GITHUB_USERNAME || "SudhanshuBaberwal";
    const l = env.LEETCODE_USERNAME || "sudhanshubaberwal";
    const cc = env.CODECHEF_USERNAME || "aided_care_69";
    const cf = env.CODEFORCES_HANDLE || "";
    return {
      updatedAt: new Date().toISOString(),
      github:     { status: "error", errorCode: "network", handle: u, profileUrl: `https://github.com/${u}` },
      leetcode:   { status: "error", errorCode: "network", handle: l, profileUrl: `https://leetcode.com/u/${l}/` },
      codechef:   { status: "error", errorCode: "network", handle: cc, profileUrl: `https://www.codechef.com/users/${cc}` },
      codeforces: { status: cf ? "error" : "unconfigured", errorCode: cf ? "network" : "unconfigured", handle: cf, profileUrl: cf ? `https://codeforces.com/profile/${cf}` : "" },
    };
  } finally {
    timer.clear();
  }
}
