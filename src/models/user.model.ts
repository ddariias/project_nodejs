import { model, Schema } from "mongoose";

import { IUser } from "../interfaces/user.interface";

const userSchema = new Schema(
  {
    name: { type: String, required: false, default: null },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, required: false, default: 18 },
  },
  { timestamps: true, versionKey: false },
);

export const User = model<IUser>("user", userSchema);
