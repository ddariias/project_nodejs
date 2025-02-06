import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api.error";
import { tokenRepository } from "../repositories/token.repository";

class AuthMiddleware {
  public authDataValid(validator) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        req.body = await validator.validateAsync(req.body);
        next();
      } catch (e) {
        next(e);
      }
    };
  }
  public async checkAccessToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const header = req.headers.authorization;
      if (!header) {
        throw new ApiError("No token provider", 403);
      }
      const accessToken = header.split("Bearer ")[1];
      if (!accessToken) {
        throw new ApiError("No token provider", 403);
      }
      const pair = await tokenRepository.findByParam({ accessToken });
      if (!pair) {
        throw new ApiError("No token pair", 403);
      }

      req.res.locals.tokenId = pair._id;
      req.res.locals.userId = pair._userId;
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const authMiddleware = new AuthMiddleware();
