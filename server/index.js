import express from "express";
import emailRouter from "./routes/EmailRoute.js";
import cors from "cors";
import leetcodeRoute from "./routes/leetcodeRoute.js";
import CFroute from "./routes/codeforcesRoute.js";
import githubRoute from "./routes/githubRoute.js";
import codingStatsRoute from "./routes/codingStatsRoute.js";
import codechefRoute from "./routes/codechefRoute.js"
import dotenv from "dotenv";

const app = express();
dotenv.config();

const allowedOrigins = [
  process.env.ALLOWED_ORIGIN,
  process.env.FRONTEND_ORIGIN,
  "https://animatedportfolio-new.vercel.app",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);
      // In non-production, allow localhost origins
      if (process.env.NODE_ENV !== "production") {
        if (
          /^http:\/\/localhost:\d+$/.test(origin) ||
          /^http:\/\/127\.0\.0\.1:\d+$/.test(origin) ||
          origin === "http://localhost:5173"
        ) {
          return callback(null, true);
        }
      }
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use("/api", emailRouter);
app.use("/api", leetcodeRoute);
app.use("/api", CFroute);
app.use("/api", githubRoute);
app.use("/api", codingStatsRoute);
app.use("/api" , codechefRoute)

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server Running on port :", port);
});
