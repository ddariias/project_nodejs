import { ApiError } from "../errors/api.error";
import { IPost, PostBody } from "../interfaces/post.interface";
import { postRepository } from "../repositories/post.repository";

class PostService {
  public async create(body: PostBody, userId: string): Promise<IPost> {
    return await postRepository.create(body, userId);
  }
  public async update(
    body: PostBody,
    userId: string,
    postId: string,
  ): Promise<IPost> {
    const post = await postRepository.getByPostId(postId);
    if (!post) {
      throw new ApiError("Post does not exist", 404);
    }
    if (String(post._userId) !== String(userId)) {
      throw new ApiError("Invalid user data", 403);
    }
    return await postRepository.update(body, postId);
  }
  public async getPostsByUserId(userId: string): Promise<IPost[]> {
    return await postRepository.getPostsByUserId(userId);
  }
  public async deleteById(postId: string, userId: string): Promise<void> {
    const post = await postRepository.getByPostId(postId);
    if (!post) {
      throw new ApiError("Post does not exist", 404);
    }
    if (String(post._userId) !== String(userId)) {
      throw new ApiError("Invalid user data", 403);
    }
    await postRepository.deleteById(postId);
  }
}
export const postService = new PostService();
