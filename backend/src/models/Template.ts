import { Schema, model, Types } from "mongoose";

const templateSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  userId: { type: Types.ObjectId, required: true, ref: "User" },
});

templateSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export const Template = model("Template", templateSchema);
