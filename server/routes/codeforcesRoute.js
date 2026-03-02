import express from "express"
import { getCodeForcesData } from "../controller/leetcode.js";

const CFroute = express.Router()

CFroute.get("/code-forces" ,getCodeForcesData)

export default CFroute;