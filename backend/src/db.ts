import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mongodb",
  url: process.env.MONGO_URL,
  synchronize: true,
  logging: true,
  entities: [
    process.env.NODE_ENV === "dev"
      ? "dist/models/**/*.ts"
      : "src/models/**/*.js",
  ],
});
