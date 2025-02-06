import * as mongoose from "mongoose";

import { IPost, PostBody } from "../interfaces/post.interface";
import { Post } from "../models/post.model";

class PostRepository {
  public async create(body: PostBody, userId: string): Promise<IPost> {
    return await Post.create({ ...body, _userId: userId });
  }
  public async getByPostId(postId: string): Promise<IPost> {
    return await Post.findById(postId);
  }
  public async update(body: PostBody, postId: string): Promise<IPost> {
    return await Post.findByIdAndUpdate(postId, body, { new: true });
  }
  public async getPostsByUserId(userId: string): Promise<IPost[]> {
    const userIdObj = new mongoose.Types.ObjectId(userId);
    return await Post.find({ _userId: userIdObj });
  }
  public async deleteById(postId: string): Promise<void> {
    await Post.findByIdAndDelete(postId);
  }
}
export const postRepository = new PostRepository();
