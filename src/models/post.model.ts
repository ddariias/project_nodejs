import { model, Schema } from "mongoose";

import { IPost } from "../interfaces/post.interface";
import { User } from "./user.model";

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    _userId: { type: Schema.Types.ObjectId, ref: User, required: true },
  },
  { timestamps: true, versionKey: false },
);

export const Post = model<IPost>("post", postSchema);
