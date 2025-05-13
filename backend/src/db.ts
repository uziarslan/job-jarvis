import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mongodb",
  url: process.env.MONGO_URL,
  synchronize: true,
  logging: true,
  entities: ["src/models/**/*.ts"],
});
