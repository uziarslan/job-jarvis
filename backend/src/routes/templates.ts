import { Router, Request, Response } from "express";
import { AppDataSource } from "../db";
import { Template } from "../entities/Template";

const templatesRouter = Router();

const templatesRepository = AppDataSource.getRepository(Template);

templatesRouter.get("/", async (req: Request, res: Response) => {
  res.json(await templatesRepository.find());
});

templatesRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  res.json(await templatesRepository.findOneBy({ id: parseInt(id, 10) }));
});

templatesRouter.post("/", async (req: Request, res: Response) => {
  const { title, description, content, userId } = req.body;
  const template = templatesRepository.create({
    title,
    description,
    content,
    user: { id: userId },
  });
  await templatesRepository.save(template);
  res.json(template);
});

templatesRouter.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, content } = req.body;
  const template = await templatesRepository.findOneBy({
    id: parseInt(id, 10),
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
});

templatesRouter.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const template = await templatesRepository.findOneBy({
    id: parseInt(id, 10),
  });
  if (!template) {
    res.status(404).json({ message: "Template not found" });
  } else {
    await templatesRepository.remove(template);
    res.json({ message: "Template deleted" });
  }
});

export default templatesRouter;
