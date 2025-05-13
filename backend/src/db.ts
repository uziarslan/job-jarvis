import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mongodb",
  url: process.env.MONGO_URL,
  database: "job-jarvis-dev",
  synchronize: true, // ⚠️ dev only
  logging: true,
  entities: ["src/models/**/*.ts"],
});
