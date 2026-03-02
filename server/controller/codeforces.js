import axios from "axios";

export const getCodeforcesStats = async (handle) => {
  try {
    const [userInfoRes, ratingRes, submissionsRes] = await Promise.all([
      axios.get(`https://codeforces.com/api/user.info?handles=${handle}`),
      axios.get(`https://codeforces.com/api/user.rating?handle=${handle}`),
      axios.get(`https://codeforces.com/api/user.status?handle=${handle}`)
    ]);

    const userInfo = userInfoRes.data.result[0];
    const contests = ratingRes.data.result;
    const submissions = submissionsRes.data.result;

    const accepted = submissions.filter(sub => sub.verdict === "OK");

    const uniqueSolved = new Set(
      accepted.map(sub => `${sub.problem.contestId}-${sub.problem.index}`)
    );

    return {
      // Basic Info
      handle: userInfo.handle,
      rating: userInfo.rating || 0,
      maxRating: userInfo.maxRating || 0,
      rank: userInfo.rank,
      maxRank: userInfo.maxRank,
      contribution: userInfo.contribution,

      // Contest Info
      contestsAttended: contests.length,
      bestRank: Math.min(...contests.map(c => c.rank)),

      // Problem Solving
      totalSolved: uniqueSolved.size,
      totalSubmissions: submissions.length
    };

  } catch (error) {
    console.error("Codeforces Service Error:", error.message);
    
  }
};