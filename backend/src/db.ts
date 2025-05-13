import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mongodb",
  host: process.env.MONGOHOST,
  database: process.env.MONGODB,
  username: process.env.MONGOUSER,
  password: process.env.MONGOPASSWORD,
  synchronize: true, // ⚠️ dev only
  logging: true,
  entities: ["src/models/**/*.ts"],
});
