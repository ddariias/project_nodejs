import { NextFunction, Request, Response } from "express";

import { postService } from "../services/post.service";

class PostController {
  public async create(req: Request, res: Response, next: NextFunction) {
    const body = req.body;
    const userId = req.res.locals.userId;
    const post = await postService.create(body, userId);
    res.status(201).json(post);
  }
  public async update(req: Request, res: Response, next: NextFunction) {
    const userId = req.res.locals.userId;
    const body = req.body;
    const postId = req.params.postId;
    const post = await postService.update(body, userId, postId);
    res.status(200).json(post);
  }
  public async getPostsByUserId(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const userId = req.params.userId;
    const posts = await postService.getPostsByUserId(userId);
    res.status(200).json(posts);
  }
}
export const postController = new PostController();
