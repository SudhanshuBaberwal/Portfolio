import axios from "axios";

const GITHUB_API = "https://api.github.com";

// 1-hour in-memory cache, serve stale up to 24 hours
let githubCache = {
  data: null,
  cachedAt: 0,
};

const ONE_HOUR = 60 * 60 * 1000;
const TWENTY_FOUR_HOURS = 24 * ONE_HOUR;

const fetchGithubStats = async (username) => {
  const token = process.env.GITHUB_TOKEN?.trim();
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "Portfolio-App",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const now = Date.now();
  // Check fresh cache
  if (githubCache.data && now - githubCache.cachedAt < ONE_HOUR) {
    return githubCache.data;
  }

  try {
    const userRes = await axios.get(`${GITHUB_API}/users/${username}`, {
      headers,
      validateStatus: () => true, // capture raw status and headers
    });

    if (process.env.NODE_ENV !== "production") {
      console.log(
        `[GitHub API] GET /users/${username} -> Status: ${userRes.status}, x-ratelimit-remaining: ${userRes.headers["x-ratelimit-remaining"]}`
      );
    }

    if (userRes.status !== 200) {
      throw new Error(`GitHub user API returned ${userRes.status}`);
    }

    const reposRes = await axios.get(
      `${GITHUB_API}/users/${username}/repos?per_page=100&type=owner`,
      {
        headers,
        validateStatus: () => true,
      }
    );

    if (process.env.NODE_ENV !== "production") {
      console.log(
        `[GitHub API] GET /users/${username}/repos -> Status: ${reposRes.status}, x-ratelimit-remaining: ${reposRes.headers["x-ratelimit-remaining"]}`
      );
    }

    if (reposRes.status !== 200) {
      throw new Error(`GitHub repos API returned ${reposRes.status}`);
    }

    const user = userRes.data;
    const repos = Array.isArray(reposRes.data) ? reposRes.data : [];

    // Calculate total stars across non-forked repos
    const nonForks = repos.filter((repo) => !repo.fork);
    const totalStars = nonForks.reduce(
      (acc, repo) => acc + (repo.stargazers_count || 0),
      0
    );
    const totalForks = repos.reduce((acc, repo) => acc + (repo.forks_count || 0), 0);

    // Language usage count
    const languageMap = {};
    repos.forEach((repo) => {
      if (repo.language) {
        languageMap[repo.language] = (languageMap[repo.language] || 0) + 1;
      }
    });

    // Guard: never cache or treat all-zero as valid if unexpected
    if (
      user.public_repos === 0 &&
      user.followers === 0 &&
      user.following === 0 &&
      Object.keys(languageMap).length === 0
    ) {
      throw new Error("GitHub returned unexpected zero profile data");
    }

    const result = {
      username: user.login,
      name: user.name,
      avatar: user.avatar_url,
      bio: user.bio,
      location: user.location,
      publicRepos: user.public_repos,
      followers: user.followers,
      following: user.following,
      createdAt: user.created_at,
      totalStars,
      totalForks,
      languagesUsed: languageMap,
    };

    // Store in cache
    githubCache.data = result;
    githubCache.cachedAt = now;

    return result;
  } catch (error) {
    console.error("GitHub Service Error:", error.message);
    // Serve stale cache if available within 24 hours
    if (githubCache.data && now - githubCache.cachedAt < TWENTY_FOUR_HOURS) {
      console.log("[GitHub] Serving stale cache from", new Date(githubCache.cachedAt).toISOString());
      return githubCache.data;
    }
    return null;
  }
};

export default fetchGithubStats;
