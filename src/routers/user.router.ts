import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { userMiddleware } from "../middlewares/user.middleware";
import { UserValidator } from "../validator/user.validator";

const router = Router();

router.post(
  "/register",
  userMiddleware.isBodyValid(UserValidator.register),
  userController.register,
);

export const userRouter = router;
