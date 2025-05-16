import { Request, Response } from "express";
import { Job } from "../models/Job";

export const getAllJobs = async (req: Request, res: Response) => {
  const jobs = await Job.find();
  res.json(jobs);
};

export const addJob = async (req: Request, res: Response) => {
  const {
    id,
    title,
    description,
    budget,
    duration,
    location,
    postedAt,
    skills,
    jobType,
    contractorTier,
    proposals,
    clientInfo,
  } = req.body;

  const job = await Job.create({
    upworkId: id,
    title,
    description,
    budget,
    duration,
    location,
    postedAt,
    skills,
    jobType,
    contractorTier,
    proposals,
    clientInfo,
  });

  res.status(201).json(job);
};
