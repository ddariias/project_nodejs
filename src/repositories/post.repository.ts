import * as mongoose from "mongoose";

import { IPost, PostBody } from "../interfaces/post.interface";
import { Post } from "../models/post.model";

class PostRepository {
  public async create(body: PostBody, userId: string): Promise<IPost> {
    return await Post.create({ ...body, _userId: userId });
  }
  public async getByUserId(userId: string): Promise<IPost> {
    return await Post.findOne({ _userId: new mongoose.Types.ObjectId(userId) });
  }
  public async update(body: PostBody, userId: string): Promise<IPost> {
    return await Post.findByIdAndUpdate(userId, body);
  }
}
export const postRepository = new PostRepository();
