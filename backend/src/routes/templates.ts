import { Router } from "express";
import {
  addTemplate,
  deleteTemplate,
  getAllTemplates,
  getTemplateById,
  updateTemplate,
} from "../controllers/templates";

const templatesRouter = Router();

templatesRouter.get("/", getAllTemplates);

templatesRouter.get("/:id", getTemplateById);

templatesRouter.post("/", addTemplate);

templatesRouter.put("/:id", updateTemplate);

templatesRouter.delete("/:id", deleteTemplate);

export default templatesRouter;
