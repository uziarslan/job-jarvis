import { Request, Response } from "express";
import { Template } from "../models/Template";

export const getAllTemplates = async (req: Request, res: Response) => {
  res.json(await Template.find());
};

export const getTemplateById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const template = await Template.findById(id);
  res.json(template);
};

export const addTemplate = async (req: Request, res: Response) => {
  const { title, description, content, userId } = req.body;
  const template = await Template.create({
    title,
    description,
    content,
    userId,
  });
  res.json(template);
};

export const updateTemplate = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, content } = req.body;
  const template = await Template.findById(id);
  if (!template) {
    res.status(404).json({ message: "Template not found" });
  } else {
    template.title = title;
    template.description = description;
    template.content = content;
    await template.save();
    res.json(template);
  }
};

export const deleteTemplate = async (req: Request, res: Response) => {
  const { id } = req.params;
  const template = await Template.findById(id);
  if (!template) {
    res.status(404).json({ message: "Template not found" });
  } else {
    await template.deleteOne();
    res.json({ message: "Template deleted" });
  }
};
