import express from "express"
import { email } from "../controller/emailController.js"

const emailRouter = express.Router()

emailRouter.post("/send-email" , email)

export default emailRouter;