import fetch from "node-fetch";
import { getCodeforcesStats } from "./codeforces.js";
import fetchGithubStats from "./github.js";

export const fetchLeetCodeStats = async (username) => {
  try {
    const query = {
      query: `
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
    `,
      variables: { username },
    };

    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Referer": "https://leetcode.com",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
      body: JSON.stringify(query),
    });
    if (!res.ok) {
      throw new Error(`LeetCode HTTP ${res.status}`);
    }
    const json = await res.json();
    const matchedUser = json.data?.matchedUser;
    if (!matchedUser) {
      throw new Error('LeetCode data missing');
    }
    const acSubmissions = matchedUser.submitStatsGlobal?.acSubmissionNum || [];
    const solved = {};
    for (const item of acSubmissions) {
      if (item.difficulty === "All") solved.all = item.count;
      else if (item.difficulty === "Easy") solved.easy = item.count;
      else if (item.difficulty === "Medium") solved.medium = item.count;
      else if (item.difficulty === "Hard") solved.hard = item.count;
    }
    const data = { solved };
    const profileUrl = `https://leetcode.com/u/${username}/`;
    return { status: "ok", handle: username, profileUrl, data };
  } catch (err) {
    console.error("LeetCode Service Error:", err.message);
    return { status: "error", handle: username, profileUrl: `https://leetcode.com/u/${username}/` };
  }
};

export const getLeetCodeStats = async (req, res) => {
  const username = "sudhanshubaberwal";
  const result = await fetchLeetCodeStats(username);
  if (result.status === "error") {
    return res.status(500).json({ error: "Failed to fetch LeetCode data" });
  }
  return res.json(result.data);
};
  try {
    const username = "sudhanshubaberwal";

    const query = {
      query: `
    query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        username

              profile {
                ranking
                reputation
                realName
                aboutMe
                userAvatar
              }

              submitStats {
                acSubmissionNum {
                  difficulty
                  count
                  submissions
                }
              }

              badges {
                id
                displayName
                icon
                creationDate
              }

              userCalendar {
                totalActiveDays
                submissionCalendar
              }
            }

            userContestRanking(username: $username) {
              rating
              globalRanking
              attendedContestsCount
              topPercentage
            }

            userContestRankingHistory(username: $username) {
              contest {
                title
                startTime
              }
              rating
              ranking
            }
          }
  `,
      variables: { username },
    };

    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    });

    const data = await response.json();

    response.json(data.data.matchedUser);
  } catch (error) {
    console.error("LeetCode Fetch Error:", error);
    res.status(500).json({ error: "Failed to fetch LeetCode data" });
  }


export const getCodeForcesData = async (req, res) => {
  try {
    const data = await getCodeforcesStats("Sudhanshu_Baberwal");
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.log("Error in codeForces data" + error);
  }
};

export const getGitHubData = async (req, res) => {
  try {
    const username = process.env.GITHUB_USERNAME || "SudhanshuBaberwal";

    const data = await fetchGithubStats(username);

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch GitHub stats",
      error: error.message,
    });
  }
};
