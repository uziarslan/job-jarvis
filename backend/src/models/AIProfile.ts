import { Schema, model, Types } from "mongoose";

const aiProfileSchema = new Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now },
  userId: { type: Types.ObjectId, required: true, ref: "User" },
});

aiProfileSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export const AIProfile = model("AIProfile", aiProfileSchema);
