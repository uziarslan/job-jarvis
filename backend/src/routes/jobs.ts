import { Router } from "express";
import { addJob, getAllJobs } from "../controllers/jobs";

const jobsRouter = Router();

jobsRouter.get("/", getAllJobs);

jobsRouter.post("/", addJob);

export default jobsRouter;
