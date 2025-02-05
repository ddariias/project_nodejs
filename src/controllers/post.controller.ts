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
    const post = postService.update(body, userId);
    res.status(200).json(post);
  }
}
export const postController = new PostController();
