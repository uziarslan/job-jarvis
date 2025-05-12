import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./db";
import templatesRouter from "./routes/templates";
import cors from "cors";

const API_PREFIX = "/api";

const app = express();
app.use(cors());
app.use(express.json());
app.use(API_PREFIX + "/templates", templatesRouter);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");

  AppDataSource.initialize()
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => console.error(err));
});
