import { NextFunction, Request, Response } from "express";

import { BodyOnSignIn } from "../interfaces/user.interface";
import { authService } from "../services/auth.service";

class AuthController {
  public async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as BodyOnSignIn;
      const result = await authService.signIn(body);
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
  public async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const param = req.res.locals.tokenId as string;
      await authService.logout(param);
      res.status(200);
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
