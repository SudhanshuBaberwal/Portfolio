import axios from "axios";

const GITHUB_API = "https://api.github.com";

const githubHeaders = {
  Accept: "application/vnd.github+json",
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
};

const fetchGithubStats = async (username) => {
  try {

    // Get basic profile
    const userRes = await axios.get(
      `https://api.github.com/users/${username}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      },
    );

    const reposRes = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=100`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      },
    );

    const user = userRes.data;
    const repos = reposRes.data;

    // Calculate total stars
    const totalStars = repos.reduce(
      (acc, repo) => acc + repo.stargazers_count,
      0,
    );

    // Calculate total forks
    const totalForks = repos.reduce((acc, repo) => acc + repo.forks_count, 0);

    // Language usage count
    const languageMap = {};
    repos.forEach((repo) => {
      if (repo.language) {
        languageMap[repo.language] = (languageMap[repo.language] || 0) + 1;
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
      languagesUsed: languageMap,
    };
  } catch (error) {
    console.error("GitHub Service Error:");
    console.error("Status:", error.response?.status);
    console.error("Message:", error.message);
    return null;
  }
};

export default fetchGithubStats;

// import axios from "axios";

// const GITHUB_API = "https://api.github.com";

// const githubHeaders = {
//   Accept: "application/vnd.github+json",
//   Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
// };

// const fetchGithubStats = async (username) => {
//   try {
//     if (!process.env.GITHUB_TOKEN) {
//       throw new Error("GITHUB_TOKEN missing");
//     }

//     const [userRes, reposRes] = await Promise.all([
//       axios.get(`${GITHUB_API}/${username}`, {
//         headers: githubHeaders,
//       }),
//       axios.get(
//         `${GITHUB_API}/${username}/repos?per_page=100&type=owner&sort=updated`,
//         {
//           headers: githubHeaders,
//         },
//       ),
//     ]);

//     const user = userRes.data;
//     const repos = reposRes.data;

//     const totalStars = repos.reduce(
//       (sum, repo) => sum + repo.stargazers_count,
//       0,
//     );

//     const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);

//     const totalWatchers = repos.reduce(
//       (sum, repo) => sum + repo.watchers_count,
//       0,
//     );

//     const languageMap = {};

//     repos.forEach((repo) => {
//       if (repo.language) {
//         languageMap[repo.language] = (languageMap[repo.language] || 0) + 1;
//       }
//     });

//     const topLanguages = Object.entries(languageMap)
//       .sort((a, b) => b[1] - a[1])
//       .slice(0, 5)
//       .map(([language, count]) => ({
//         language,
//         count,
//       }));

//     const latestProjects = repos.slice(0, 5).map((repo) => ({
//       name: repo.name,
//       stars: repo.stargazers_count,
//       forks: repo.forks_count,
//       language: repo.language,
//       url: repo.html_url,
//       updatedAt: repo.updated_at,
//     }));

//     return {
//       profile: {
//         username: user.login,
//         name: user.name,
//         avatar: user.avatar_url,
//         bio: user.bio,
//         location: user.location,
//         company: user.company,
//         blog: user.blog,
//         githubUrl: user.html_url,
//         joinedAt: user.created_at,
//       },

//       stats: {
//         publicRepos: user.public_repos,
//         followers: user.followers,
//         following: user.following,
//         totalStars,
//         totalForks,
//         totalWatchers,
//       },

//       topLanguages,

//       latestProjects,
//     };
//   } catch (error) {
//     console.error("GitHub Error:");

//     if (error.response) {
//       console.error(error.response.status);
//       console.error(error.response.data);
//     } else {
//       console.error(error.message);
//     }

//     throw error;
//   }
// };

// export default fetchGithubStats;
