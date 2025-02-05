import { IPost, PostBody } from "../interfaces/post.interface";
import { postRepository } from "../repositories/post.repository";

class PostService {
  public async create(body: PostBody, userId: string): Promise<IPost> {
    return await postRepository.create(body, userId);
  }
}
export const postService = new PostService();
