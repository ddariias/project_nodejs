import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { userMiddleware } from "../middlewares/user.middleware";
import { UserValidator } from "../validator/user.validator";

const router = Router();

router.post(
  "/register",
  userMiddleware.isBodyValid(UserValidator.register),
  userController.register,
);
router.delete(
  "/me",
  userMiddleware.isBodyValid(UserValidator.signIn),
  authMiddleware.checkAccessToken,
  userController.delete,
);
router.put("/me", authMiddleware.checkAccessToken, userController.update);

export const userRouter = router;
