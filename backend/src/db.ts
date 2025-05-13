import { DataSource } from "typeorm";
import { AIProfile } from "./models/AIProfile";
import { Template } from "./models/Template";
import { User } from "./models/User";

export const AppDataSource = new DataSource({
  type: "mongodb",
  url: process.env.MONGO_URL,
  synchronize: true,
  logging: true,
  entities: [AIProfile, Template, User],
  extra: {
    dbName: "job-jarvis-dev",
  },
});
