import { Schema, model } from "mongoose";

const jobSchema = new Schema({
  upworkId: { type: String, unique: true, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  budget: String,
  duration: String,
  location: { type: String, required: true },
  postedAt: { type: String, required: true },
  skills: [{ type: String }],
  jobType: { type: String, required: true },
  contractorTier: { type: String, required: true },
  proposals: { type: String, required: true },
  clientInfo: {
    rating: String,
    totalSpent: String,
    paymentVerified: String,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

jobSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export const Job = model("Job", jobSchema);
