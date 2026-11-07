import express from "express";
import { getCodingStatsController } from "../controller/codingStatsController.js";

const codingStatsRoute = express.Router();

codingStatsRoute.get("/coding-stats", getCodingStatsController);

export default codingStatsRoute;
