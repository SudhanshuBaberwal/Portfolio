/**
 * server/lib/codingStats.js
 * Plain reusable module for fetching coding stats from GitHub, LeetCode, and CodeChef.
 */

// In-memory cache: 1 hour fresh, 24 hours stale
const memoryCache = {
  data: null,
  cachedAt: 0,
};

const ONE_HOUR = 60 * 60 * 1000;
const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

async function fetchWithTimeout(url, options = {}, timeoutMs = 6000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(id);
  }
}

async function fetchGitHubStats(username, token) {
  if (!username) {
    return { status: "unconfigured", handle: "", profileUrl: "" };
  }

  const profileUrl = `https://github.com/${username}`;
  try {
    const headers = {
      "User-Agent": "Portfolio-Coding-Stats-Server",
    };
    if (token) {
      headers["Authorization"] = `bearer ${token}`;
    }

    // 1. User profile
    const userRes = await fetchWithTimeout(`https://api.github.com/users/${username}`, { headers });
    if (!userRes.ok) {
      return { status: "error", handle: username, profileUrl };
    }
    const user = await userRes.json();

    // 2. Repos (up to 300)
    let repos = [];
    for (let page = 1; page <= 3; page++) {
      const repoRes = await fetchWithTimeout(
        `https://api.github.com/users/${username}/repos?per_page=100&type=owner&page=${page}`,
        { headers }
      );
      if (!repoRes.ok) break;
      const batch = await repoRes.json();
      if (!Array.isArray(batch) || batch.length === 0) break;
      repos.push(...batch);
      if (batch.length < 100) break;
    }

    const nonForkRepos = repos.filter((r) => !r.fork);
    const totalStars = nonForkRepos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);

    // Language counts across non-fork repos
    const langCounts = {};
    for (const r of nonForkRepos) {
      if (r.language) {
        langCounts[r.language] = (langCounts[r.language] || 0) + 1;
      }
    }
    const sortedLangs = Object.entries(langCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([lang, count]) => ({ language: lang, count }));

    const data = {
      publicRepos: user.public_repos ?? nonForkRepos.length,
      followers: user.followers ?? 0,
      totalStars,
      topLanguages: sortedLangs,
    };

    // 3. GraphQL contributions if token is set
    if (token) {
      try {
        const query = `
          query($username: String!) {
            user(login: $username) {
              contributionsCollection {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      contributionCount
                    }
                  }
                }
              }
            }
          }
        `;
        const gqlRes = await fetchWithTimeout("https://api.github.com/graphql", {
          method: "POST",
          headers: {
            "Authorization": `bearer ${token}`,
            "User-Agent": "Portfolio-Coding-Stats-Server",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query, variables: { username } }),
        });

        if (gqlRes.ok) {
          const gqlData = await gqlRes.json();
          const calendar = gqlData.data?.user?.contributionsCollection?.contributionCalendar;
          if (calendar) {
            data.totalContributions = calendar.totalContributions;
            const weeks = calendar.weeks || [];
            // Last 20 weekly counts
            data.recentWeeklyContributions = weeks.slice(-20).map((w) =>
              (w.contributionDays || []).reduce((acc, d) => acc + (d.contributionCount || 0), 0)
            );
          }
        }
      } catch {
        // Token might be invalid or expired; keep REST data without GraphQL
      }
    }

    return {
      status: "ok",
      handle: username,
      profileUrl,
      data,
    };
  } catch {
    return { status: "error", handle: username, profileUrl };
  }
}

async function fetchLeetCodeStats(username) {
  if (!username) {
    return { status: "unconfigured", handle: "", profileUrl: "" };
  }

  const profileUrl = `https://leetcode.com/u/${username}/`;
  try {
    const query = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          profile {
            ranking
          }
          submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
            }
          }
        }
        userContestRanking(username: $username) {
          attendedContestsCount
          rating
          topPercentage
        }
      }
    `;

    const res = await fetchWithTimeout("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Referer": "https://leetcode.com",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
      body: JSON.stringify({ query, variables: { username } }),
    });

    if (!res.ok) {
      return { status: "error", handle: username, profileUrl };
    }

    const json = await res.json();
    const matchedUser = json.data?.matchedUser;
    if (!matchedUser) {
      return { status: "error", handle: username, profileUrl };
    }

    const acSubmissions = matchedUser.submitStatsGlobal?.acSubmissionNum || [];
    const solved = {};
    for (const item of acSubmissions) {
      if (item.difficulty === "All") solved.all = item.count;
      else if (item.difficulty === "Easy") solved.easy = item.count;
      else if (item.difficulty === "Medium") solved.medium = item.count;
      else if (item.difficulty === "Hard") solved.hard = item.count;
    }

    const data = {
      solved,
    };

    if (matchedUser.profile?.ranking) {
      data.ranking = matchedUser.profile.ranking;
    }

    const contest = json.data?.userContestRanking;
    if (contest && typeof contest.attendedContestsCount === "number" && contest.attendedContestsCount > 0) {
      data.contestRating = Math.round(contest.rating || 0);
      data.attendedContests = contest.attendedContestsCount;
      if (contest.topPercentage) {
        data.topPercentage = contest.topPercentage;
      }
    }

    return {
      status: "ok",
      handle: username,
      profileUrl,
      data,
    };
  } catch {
    return { status: "error", handle: username, profileUrl };
  }
}

async function fetchCodeChefStats(username) {
  if (!username) {
    return { status: "unconfigured", handle: "", profileUrl: "" };
  }

  const profileUrl = `https://www.codechef.com/users/${username}`;
  try {
    const res = await fetchWithTimeout(profileUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Accept": "text/html,application/xhtml+xml",
      },
    });

    if (!res.ok) {
      return { status: "error", handle: username, profileUrl };
    }

    const html = await res.text();
    const data = {};

    // Rating (e.g. <div class="rating-number">1542</div>)
    const ratingMatch = html.match(/class=["']rating-number["'][^>]*>(\d+)</i);
    if (ratingMatch) {
      data.rating = parseInt(ratingMatch[1], 10);
    }

    // Stars (e.g. <span class="rating">2★</span> or div class="rating-star">...★...)
    const starsMatch = html.match(/(\d+)★/) || html.match(/class=["']rating-star["'][^>]*>([^<]+)</i);
    if (starsMatch) {
      data.stars = starsMatch[1].trim();
    }

    // Global Rank (e.g. <strong class="global-rank">12345</strong> or href="/ratings/all">12345</a>)
    const globalRankMatch = html.match(/class=["']global-rank["'][^>]*>(\d+)</i) ||
      html.match(/href=["']\/ratings\/all["'][^>]*>(\d+)</i);
    if (globalRankMatch) {
      data.globalRank = parseInt(globalRankMatch[1], 10);
    }

    // Problems Solved (e.g. Total Problems Solved: <strong>120</strong>)
    const problemsMatch = html.match(/Total Problems Solved:\s*<strong>(\d+)<\/strong>/i) ||
      html.match(/Problems Solved\s*\((\d+)\)/i);
    if (problemsMatch) {
      data.problemsSolved = parseInt(problemsMatch[1], 10);
    }

    if (Object.keys(data).length === 0) {
      return { status: "error", handle: username, profileUrl };
    }

    return {
      status: "ok",
      handle: username,
      profileUrl,
      data,
    };
  } catch {
    return { status: "error", handle: username, profileUrl };
  }
}

export async function getCodingStats(env = process.env) {
  const now = Date.now();

  // If memory cache is fresh (less than 1 hour old), return cached data
  if (memoryCache.data && now - memoryCache.cachedAt < ONE_HOUR) {
    return { ...memoryCache.data, stale: false };
  }

  const githubUser = env.GITHUB_USERNAME || "SudhanshuBaberwal";
  const leetcodeUser = env.LEETCODE_USERNAME || "sudhanshubaberwal";
  const codechefUser = env.CODECHEF_USERNAME || ""; // Defaults to unconfigured
  const githubToken = env.GITHUB_TOKEN || "";

  try {
    const [githubRes, leetcodeRes, codechefRes] = await Promise.allSettled([
      fetchGitHubStats(githubUser, githubToken),
      fetchLeetCodeStats(leetcodeUser),
      fetchCodeChefStats(codechefUser),
    ]);

    const github = githubRes.status === "fulfilled"
      ? githubRes.value
      : { status: "error", handle: githubUser, profileUrl: `https://github.com/${githubUser}` };

    const leetcode = leetcodeRes.status === "fulfilled"
      ? leetcodeRes.value
      : { status: "error", handle: leetcodeUser, profileUrl: `https://leetcode.com/u/${leetcodeUser}/` };

    const codechef = codechefRes.status === "fulfilled"
      ? codechefRes.value
      : { status: "error", handle: codechefUser, profileUrl: codechefUser ? `https://www.codechef.com/users/${codechefUser}` : "" };

    const freshResult = {
      updatedAt: new Date().toISOString(),
      github,
      leetcode,
      codechef,
    };

    // Update memory cache
    memoryCache.data = freshResult;
    memoryCache.cachedAt = now;

    return { ...freshResult, stale: false };
  } catch {
    // If upstream call fails, serve stale if under 24 hours
    if (memoryCache.data && now - memoryCache.cachedAt < TWENTY_FOUR_HOURS) {
      return { ...memoryCache.data, stale: true };
    }

    // Otherwise return clean error shape
    return {
      updatedAt: new Date().toISOString(),
      github: { status: "error", handle: githubUser, profileUrl: `https://github.com/${githubUser}` },
      leetcode: { status: "error", handle: leetcodeUser, profileUrl: `https://leetcode.com/u/${leetcodeUser}/` },
      codechef: { status: codechefUser ? "error" : "unconfigured", handle: codechefUser, profileUrl: "" },
    };
  }
}
