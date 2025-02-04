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
  public async delete(req: Request, res: Response, next: NextFunction) {
    const userId = req.res.locals.userId;
    const user = req.body;
    await userService.delete(userId, user);
    res.status(200).json();
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    const userId = req.res.locals.userId;
    const user = req.body;
    const result = await userService.update(userId, user);
    res.status(201).json(result);
  }
}

export const userController = new UserController();
