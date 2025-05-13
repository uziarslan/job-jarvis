import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mongodb",
  url: process.env.MONGO_URL,
  database: process.env.MONGO_DB,
  username: process.env.MONGO_USER,
  password: process.env.MONGO_PASSWORD,
  synchronize: true, // ⚠️ dev only
  logging: true,
  entities: ["src/models/**/*.ts"],
});
