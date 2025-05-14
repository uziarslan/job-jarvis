import { DataSource } from "typeorm";
import { AIProfile } from "./models/AIProfile";
import { Template } from "./models/Template";
import { User } from "./models/User";
import { Job } from "./models/Job";

export const AppDataSource = new DataSource({
  type: "mongodb",
  url: process.env.MONGO_URL,
  synchronize: true,
  logging: true,
  entities: [AIProfile, Template, User, Job],
  extra: {
    dbName: "job-jarvis-dev",
  },
});
