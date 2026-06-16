import express from "express"
import { getGitHubData } from "../controller/leetcode.js";

const githubRoute = express.Router()

githubRoute.get("/github", getGitHubData)
githubRoute.get("/test", async (req, res) => {
  try {
    const response = await fetch("https://api.github.com/users/octocat");
    const data = await response.json();

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
export default githubRoute;