import { NextFunction, Request, Response } from "express";

import { postService } from "../services/post.service";

class PostController {
  public async create(req: Request, res: Response, next: NextFunction) {
    const body = req.body;
    const userId = req.res.locals.userId;
    const post = await postService.create(body, userId);
    res.status(201).json(post);
  }
}
export const postController = new PostController();
