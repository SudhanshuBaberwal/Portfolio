import express from "express";
import { getCodeChefData } from "../controller/codechefController.js";

const router = express.Router();

router.get("/codechef", getCodeChefData);

export default router;