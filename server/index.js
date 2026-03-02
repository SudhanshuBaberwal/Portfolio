import express from "express";
import emailRouter from "./routes/EmailRoute.js";
import cors from "cors";
import leetcodeRoute from "./routes/leetcodeRoute.js";
import CFroute from "./routes/codeforcesRoute.js";
import githubRoute from "./routes/githubRoute.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(express.json());

app.use(
  cors({
    origin: [
      process.env.FRONTEND_ORIGIN,
      "https://portfolio-wheat-gamma-90.vercel.app/",
    ],
    credentials: true,
  }),
);

app.use("/api", emailRouter);
app.use("/api", leetcodeRoute);
app.use("/api", CFroute);
app.use("/api", githubRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server Running on port :", port);
});
