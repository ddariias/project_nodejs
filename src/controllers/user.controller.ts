import { NextFunction, Request, Response } from "express";
import {
  IQuery,
  IQueryFilterDto,
  IQuerySearch,
} from "../interfaces/user.interface";
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
  public async getAllUsers(req: Request, res: Response, next: NextFunction) {
    const query = req.query as unknown as IQuery;
    const result = await userService.getAllUsers(query);
    res.status(200).json(result);
  }
  public async searchByParams(req: Request, res: Response, next: NextFunction) {
    const query = req.query as unknown as IQuerySearch;
    const result = await userService.searchByParams(query);
    res.status(200).json(result);
  }
  public async filter(req: Request, res: Response, next: NextFunction) {
    const query = req.query.filter as unknown as IQueryFilterDto;
    const result = await userService.filter(query);
    res.status(200).json(result);
  }
}

export const userController = new UserController();
