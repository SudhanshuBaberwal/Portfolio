import axios from "axios";

const fetchGithubStats = async (username) => {
  try {
    // Get basic profile
    const userRes = await axios.get(
      `https://api.github.com/users/${username}`
    );

    // Get repositories (max 100)
    const reposRes = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=100`
    );

    const user = userRes.data;
    const repos = reposRes.data;

    // Calculate total stars
    const totalStars = repos.reduce(
      (acc, repo) => acc + repo.stargazers_count,
      0
    );

    // Calculate total forks
    const totalForks = repos.reduce(
      (acc, repo) => acc + repo.forks_count,
      0
    );

    // Language usage count
    const languageMap = {};
    repos.forEach(repo => {
      if (repo.language) {
        languageMap[repo.language] =
          (languageMap[repo.language] || 0) + 1;
      }
    });

    return {
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
      languagesUsed: languageMap
    };

  } catch (error) {
    console.error("GitHub Service Error:");
    console.error("Status:", error.response?.status);
    console.error("Message:", error.message);
    return null;
  }
};

export default fetchGithubStats;