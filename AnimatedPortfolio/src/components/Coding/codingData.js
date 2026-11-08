/**
 * codingData.js
 * Endpoints, fallbacks, profiles, and normalized client fetchers
 * for LeetCode, GitHub, CodeChef, and Codeforces.
 */

export const AS_OF = "Nov 2026";

// Handles from server controllers & config:
// - LeetCode: sudhanshubaberwal
// - GitHub: SudhanshuBaberwal
// - CodeChef: aided_care_69 (from server/controller/codechefController.js)
// - Codeforces: Sudhanshu_Baberwal (from server/controller/leetcode.js getCodeForcesData)
export const PROFILES = {
  leetcode: {
    handle: "sudhanshubaberwal",
    url: "https://leetcode.com/u/sudhanshubaberwal/",
  },
  github: {
    handle: "SudhanshuBaberwal",
    url: "https://github.com/SudhanshuBaberwal",
  },
  codechef: {
    handle: "aided_care_69",
    url: "https://www.codechef.com/users/aided_care_69",
  },
  codeforces: {
    handle: "Sudhanshu_Baberwal",
    url: "https://codeforces.com/profile/Sudhanshu_Baberwal",
  },
};

export const ENDPOINTS = {
  leetcode: "/api/leetcode",
  github: "/api/github",
  codechef: "/api/codechef",
  codeforces: "/api/code-forces",
};

export const FALLBACK = {
  leetcode: {
    solved: { all: 428, easy: 168, medium: 215, hard: 45 },
    ranking: 295747,
    totalActiveDays: 200,
    badgesCount: 8,
    latestBadge: "Feb LeetCoding Challenge",
    contest: {
      rating: 1485,
      globalRanking: 438972,
      attended: 6,
      top: 49.68,
    },
  },
  github: {
    publicRepos: 38,
    followers: 9,
    following: 7,
    totalStars: 3,
    totalForks: 0,
    languages: [
      { name: "JavaScript", count: 14 },
      { name: "TypeScript", count: 10 },
      { name: "Java", count: 8 },
      { name: "HTML", count: 2 },
      { name: "Jupyter Notebook", count: 2 },
      { name: "Python", count: 1 },
    ],
  },
  codechef: {
    currentRating: 1228,
    highestRating: 1251,
    stars: 1,
    globalRank: 83505,
    countryRank: 80288,
  },
  codeforces: {
    rating: 398,
    maxRating: 398,
    rank: "newbie",
    contests: 1,
    bestRank: 15871,
  },
};

// Helper: parse first run of digits
function parseDigits(val) {
  if (val == null) return null;
  if (typeof val === "number") return val;
  const match = String(val).match(/\d+/);
  return match ? parseInt(match[0], 10) : null;
}

// Helper: parse stars count from star symbols e.g. "1★" or "★"
function parseStars(val) {
  if (val == null) return null;
  if (typeof val === "number") return val;
  const count = (String(val).match(/★/g) || []).length;
  if (count > 0) return count;
  const match = String(val).match(/\d+/);
  return match ? parseInt(match[0], 10) : null;
}

/**
 * Fetch platform stats and normalize to the shape expected by Coding.jsx
 */
export async function fetchPlatform(key, base = "") {
  const url = `${base}${ENDPOINTS[key]}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 6000);

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();

    if (key === "leetcode") {
      // Shape: { status, handle, profileUrl, data: { solved, ranking, totalActiveDays, badgesCount, latestBadge, contest } }
      // Or directly matchedUser / controller result
      const raw = json.data || json;
      if (!raw || (!raw.solved && !raw.submitStats && !raw.submitStatsGlobal)) {
        throw new Error("Invalid leetcode response");
      }

      let solved = raw.solved;
      if (!solved && raw.submitStatsGlobal?.acSubmissionNum) {
        solved = { all: 0, easy: 0, medium: 0, hard: 0 };
        for (const it of raw.submitStatsGlobal.acSubmissionNum) {
          if (it.difficulty === "All") solved.all = it.count;
          else if (it.difficulty === "Easy") solved.easy = it.count;
          else if (it.difficulty === "Medium") solved.medium = it.count;
          else if (it.difficulty === "Hard") solved.hard = it.count;
        }
      }

      let contest = null;
      if (raw.contest) {
        contest = {
          rating: Math.round(raw.contest.rating || 0),
          attended: raw.contest.attendedContestsCount ?? raw.contest.attended ?? 0,
          top: raw.contest.topPercentage ?? raw.contest.top,
          globalRanking: raw.contest.globalRanking,
        };
      }

      return {
        ok: true,
        data: {
          solved: solved || FALLBACK.leetcode.solved,
          ranking: raw.ranking ?? raw.profile?.ranking ?? null,
          totalActiveDays: raw.totalActiveDays ?? raw.userCalendar?.totalActiveDays ?? null,
          badgesCount: raw.badgesCount ?? raw.badges?.length ?? null,
          latestBadge: raw.latestBadge ?? (raw.badges?.length ? raw.badges[raw.badges.length - 1].displayName : null),
          contest,
        },
      };
    }

    if (key === "github") {
      // Shape: { success: true, data: { publicRepos, followers, following, totalStars, totalForks, languagesUsed, ... } }
      const raw = json.data || json;
      if (!raw || typeof raw !== "object") throw new Error("Invalid github response");

      let languages = [];
      if (Array.isArray(raw.languages)) {
        languages = raw.languages;
      } else if (raw.languagesUsed && typeof raw.languagesUsed === "object") {
        languages = Object.entries(raw.languagesUsed)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count);
      }

      return {
        ok: true,
        data: {
          publicRepos: raw.publicRepos ?? 0,
          followers: raw.followers ?? 0,
          following: raw.following ?? 0,
          totalStars: raw.totalStars ?? 0,
          totalForks: raw.totalForks ?? 0,
          languages,
        },
      };
    }

    if (key === "codechef") {
      // Shape: { success: true, data: { currentRating, highestRating, stars, globalRank, countryRank } }
      const raw = json.data || json;
      if (!raw || typeof raw !== "object") throw new Error("Invalid codechef response");

      const currentRating = parseDigits(raw.currentRating);
      const highestRating = parseDigits(raw.highestRating);
      const stars = parseStars(raw.stars);
      const globalRank = parseDigits(raw.globalRank);
      const countryRank = parseDigits(raw.countryRank);

      if (!currentRating && !globalRank) {
        throw new Error("Empty codechef data");
      }

      return {
        ok: true,
        data: {
          currentRating: currentRating ?? FALLBACK.codechef.currentRating,
          highestRating: highestRating ?? currentRating ?? FALLBACK.codechef.highestRating,
          stars: stars ?? FALLBACK.codechef.stars,
          globalRank: globalRank ?? FALLBACK.codechef.globalRank,
          countryRank: countryRank ?? FALLBACK.codechef.countryRank,
        },
      };
    }

    if (key === "codeforces") {
      // Shape: { success: true, data: { rating, maxRating, rank, maxRank, contestsAttended, bestRank } }
      const raw = json.data || json;
      if (!raw || typeof raw !== "object") throw new Error("Invalid codeforces response");

      return {
        ok: true,
        data: {
          rating: raw.rating ?? raw.maxRating ?? FALLBACK.codeforces.rating,
          maxRating: raw.maxRating ?? raw.rating ?? FALLBACK.codeforces.maxRating,
          rank: raw.rank ?? FALLBACK.codeforces.rank,
          contests: raw.contestsAttended ?? raw.contests ?? FALLBACK.codeforces.contests,
          bestRank: raw.bestRank != null && isFinite(raw.bestRank) ? raw.bestRank : FALLBACK.codeforces.bestRank,
        },
      };
    }

    return { ok: false, data: FALLBACK[key] };
  } catch (err) {
    return { ok: false, data: FALLBACK[key], error: err.message };
  } finally {
    clearTimeout(timer);
  }
}
