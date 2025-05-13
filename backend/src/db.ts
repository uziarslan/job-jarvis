import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mongodb",
  host: process.env.MONGO_URL,
  port: 27017,
  database: "job-jarvis-dev",
  synchronize: true, // ⚠️ dev only
  logging: true,
  entities: ["src/models/**/*.ts"],
});
