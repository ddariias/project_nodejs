import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

import { ApiError } from "../errors/api.error";
import {isObjectIdOrHexString} from "mongoose";

class UserMiddleware {
  public isBodyValid(validator: ObjectSchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        req.body = await validator.validateAsync(req.body);
        next();
      } catch (e) {
        next(new ApiError("The data is not valid", 400));
      }
    };
  }
  public isQueryValid(validator: ObjectSchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        req.query = await validator.validateAsync(req.query);
        next();
      } catch (e) {
        next(new ApiError("The data is not valid", 400));
      }
    };
  }
  public isUserIdValid(key: string) {
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
          throw new ApiError("The filter must be string", 400);
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
