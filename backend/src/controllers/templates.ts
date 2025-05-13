import { Request, Response } from "express";
import { AppDataSource } from "../db";
import { Template } from "../models/Template";
import { ObjectId } from "mongodb";

const templatesRepository = AppDataSource.getMongoRepository(Template);

export const getAllTemplates = async (req: Request, res: Response) => {
  res.json(await templatesRepository.find());
};

export const getTemplateById = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.json(await templatesRepository.findOneBy({ _id: new ObjectId(id) }));
};

export const addTemplate = async (req: Request, res: Response) => {
  const { title, description, content, userId } = req.body;
  const template = templatesRepository.create({
    title,
    description,
    content,
    userId,
  });
  await templatesRepository.save(template);
  res.json(template);
};

export const updateTemplate = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, content } = req.body;
  const template = await templatesRepository.findOneBy({
    _id: new ObjectId(id),
  });
  if (!template) {
    res.status(404).json({ message: "Template not found" });
  } else {
    template.title = title;
    template.description = description;
    template.content = content;
    await templatesRepository.save(template);
    res.json(template);
  }
};

export const deleteTemplate = async (req: Request, res: Response) => {
  const { id } = req.params;
  const template = await templatesRepository.findOneBy({
    _id: new ObjectId(id),
  });
  if (!template) {
    res.status(404).json({ message: "Template not found" });
  } else {
    await templatesRepository.remove(template);
    res.json({ message: "Template deleted" });
  }
};
