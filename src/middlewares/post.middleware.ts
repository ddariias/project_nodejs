import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api.error";

class PostMiddleware {
  public isPostBodyValid(validator) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        req.body = await validator.validateAsync(req.body);
        next();
      } catch (e) {
        throw new ApiError("Post data is not valid", 400);
      }
    };
  }
}
export const postMiddleware = new PostMiddleware();
