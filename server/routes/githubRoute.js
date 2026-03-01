import express from "express"
import { getGitHubData } from "../controller/leetcode.js";

const githubRoute = express.Router()

githubRoute.get("/github", getGitHubData)

export default githubRoute;