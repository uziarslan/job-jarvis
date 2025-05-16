import { Schema, model } from "mongoose";

const userSchema = new Schema({
  isPremium: { type: Boolean, default: false },
  stripeData: { type: Schema.Types.Mixed, default: null },
  freeProposalsLeft: { type: Number, default: 10 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

userSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export const User = model("User", userSchema);
