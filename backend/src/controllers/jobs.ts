import { Request, Response, Router } from "express";
import { AppDataSource } from "../db";
import { Job } from "../models/Job";

const jobRepository = AppDataSource.getRepository(Job);

export const getAllJobs = async (req: Request, res: Response) => {
  const jobs = await jobRepository.find();
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

  const job = jobRepository.create({
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

  const savedJob = await jobRepository.save(job);

  res.status(201).json(savedJob);
};
