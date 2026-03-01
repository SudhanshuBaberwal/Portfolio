import express from "express";
import emailRouter from "./routes/EmailRoute.js";
import cors from "cors"
import leetcodeRoute from "./routes/leetcodeRoute.js";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true,
  }),
);

app.use("/api", emailRouter);
app.use("/api" , leetcodeRoute)

app.listen(3000, () => {
  console.log("Server Running");
});
