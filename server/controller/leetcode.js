import fetch from "node-fetch";
import { getCodeforcesStats } from "./codeforces.js";
import fetchGithubStats from "./github.js";

// Helper function to fetch data from LeetCode
export const fetchLeetCodeStats = async (username) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6000);
  
  try {
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
            submitStatsGlobal {
              acSubmissionNum {
                difficulty
                count
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
      signal: controller.signal,
    });

    if (!res.ok) {
      return { status: "error", errorCode: `upstream_status_${res.status}`, handle: username };
    }

    const json = await res.json();
    const mu = json.data?.matchedUser;

    if (!mu) {
      return { status: "error", errorCode: "parse_error", handle: username };
    }

    // Parse solved counts
    const solved = {};
    (mu.submitStatsGlobal?.acSubmissionNum || []).forEach((it) => {
      if (it.difficulty === "All") solved.all = it.count;
      else if (it.difficulty === "Easy") solved.easy = it.count;
      else if (it.difficulty === "Medium") solved.medium = it.count;
      else if (it.difficulty === "Hard") solved.hard = it.count;
    });

    // Parse badges
    const badges = mu.badges?.map((b) => b.displayName) || [];
    const latestBadge = badges[badges.length - 1] ?? null;

    const data = {
      solved,
      profile: mu.profile,
      totalActiveDays: mu.userCalendar?.totalActiveDays,
      badgesCount: badges.length,
      latestBadge,
      contestRanking: json.data?.userContestRanking || null,
    };

    const profileUrl = `https://leetcode.com/u/${username}/`;
    return { status: "ok", handle: username, profileUrl, data };
  } catch (err) {
    console.error("LeetCode Service Error:", err.message);
    const code = err.name === "AbortError" ? "timeout" : "network";
    return { status: "error", errorCode: code, handle: username };
  } finally {
    clearTimeout(timeout);
  }
};

// Express Controller for LeetCode
export const getLeetCodeStats = async (req, res) => {
  try {
    const username = "sudhanshubaberwal";
    const result = await fetchLeetCodeStats(username);
    
    if (result.status !== "ok") {
      return res.status(500).json({ error: "Failed to fetch LeetCode data", errorCode: result.errorCode });
    }
    
    return res.status(200).json(result);
  } catch (error) {
    console.error("LeetCode Controller Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Express Controller for CodeForces
export const getCodeForcesData = async (req, res) => {
  try {
    const data = await getCodeforcesStats("Sudhanshu_Baberwal");
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.log("Error in codeForces data: " + error);
    return res.status(500).json({ success: false, message: "Failed to fetch CodeForces data" });
  }
};

// Express Controller for GitHub
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