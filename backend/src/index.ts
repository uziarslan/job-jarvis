import express from "express";
import { connectDB } from "./db";
import templatesRouter from "./routes/templates";
import cors from "cors";
import jobsRouter from "./routes/jobs";
import dotenv from "dotenv";

dotenv.config();

const API_PREFIX = "/api";

const app = express();
app.use(cors());
app.use(express.json());
app.use(API_PREFIX + "/templates", templatesRouter);
app.use(API_PREFIX + "/jobs", jobsRouter);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");

  connectDB()
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => console.error(err));
});
