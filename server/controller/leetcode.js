import fetch from "node-fetch";
import { getCodeforcesStats } from "./codeforces.js";
import fetchGithubStats from "./github.js";

export const getLeetCodeStats = async (req, res) => {
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

    res.json(data.data.matchedUser);
  } catch (error) {
    console.error("LeetCode Fetch Error:", error);
    res.status(500).json({ error: "Failed to fetch LeetCode data" });
  }
};

export const getCodeForcesData = async(req , res) => {
  try {
    const data = await getCodeforcesStats("Sudhanshu_Baberwal")
    return res.status(200).json({success : true ,data } )
  } catch (error) {
    console.log("Error in codeForces data" + error)
  }
  
}

export const getGitHubData = async (req , res) => {
  try {
    const data = await fetchGithubStats("SudhanshuBaberwal")
    return res.status(201).json({success : true , data})
  } catch (error) {
    return res.status(500).json({success : false , message : error.message})
  }
}