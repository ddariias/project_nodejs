import { ApiError } from "../errors/api.error";
import { IPost, PostBody } from "../interfaces/post.interface";
import { postRepository } from "../repositories/post.repository";

class PostService {
  public async create(body: PostBody, userId: string): Promise<IPost> {
    return await postRepository.create(body, userId);
  }
  public async update(body: PostBody, userId: string): Promise<IPost> {
    const post = await postRepository.getByUserId(userId);
    if (!post) {
      throw new ApiError("Post does not exist", 401);
    }
    return await postRepository.update(body, userId);
  }
}
export const postService = new PostService();
