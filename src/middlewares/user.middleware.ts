import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api.error";

class UserMiddleware {
  public isBodyValid(validator) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        req.body = await validator.validateAsync(req.body);
        next();
      } catch (e) {
        next(new ApiError("The data is not valid", 400));
      }
    };
  }
  public isQueryValid(validator) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        req.query = await validator.validateAsync(req.query);
        next();
      } catch (e) {
        next(new ApiError("The data is not valid", 400));
      }
    };
  }
  public isQuerySearchValid(validator) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        req.query = await validator.validateAsync(req.query);
        next();
      } catch (e) {
        next(new ApiError("The data is not valid", 400));
      }
    };
  }
  public isQueryFilterValid(validator) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        if (typeof req.query.filter === "string") {
          req.query.filter = JSON.parse(req.query.filter);
        } else {
          throw new ApiError("The filter must be object", 400);
        }
        req.query = await validator.validateAsync(req.query);
        next();
      } catch (e) {
        next(new ApiError("The data is not valid", 400));
      }
    };
  }
}

export const userMiddleware = new UserMiddleware();
