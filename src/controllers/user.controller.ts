import { NextFunction, Request, Response } from "express";

import { userService } from "../services/user.service";

class UserController {
  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.body as any;
      const result = await userService.register(user);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
