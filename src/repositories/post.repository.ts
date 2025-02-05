import { IPost, PostBody } from "../interfaces/post.interface";
import { Post } from "../models/post.model";

class PostRepository {
  public async create(body: PostBody, userId: string): Promise<IPost> {
    return await Post.create({ ...body, _userId: userId });
  }
}
export const postRepository = new PostRepository();
