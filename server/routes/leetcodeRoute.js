import express from "express"
import { getLeetCodeStats } from "../controller/leetcode.js";

const leetcodeRoute= express.Router()

leetcodeRoute.get("/leetcode", getLeetCodeStats);

export default leetcodeRoute;