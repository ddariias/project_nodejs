import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../errors/api.error";

class PostMiddleware {
  public isPostIdValid(key: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = req.params[key];
        if (!isObjectIdOrHexString(id)) {
          throw new ApiError("Invalid id", 404);
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }
  public isPostBodyValid(validator) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        req.body = await validator.validateAsync(req.body);
        next();
      } catch (e) {
        next(e);
      }
    };
  }
}
export const postMiddleware = new PostMiddleware();
