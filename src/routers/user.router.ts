import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { userMiddleware } from "../middlewares/user.middleware";
import { UserValidator } from "../validator/user.validator";

const router = Router();

router.get(
  "/",
  authMiddleware.checkAccessToken,
  userMiddleware.isQueryValid(UserValidator.queryValidator),
  userController.getAllUsers,
);
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
router.get(
  "/search/:userId",
  authMiddleware.checkAccessToken,
  userMiddleware.isUserIdValid("userId"),
  userController.searchById,
);
router.get(
  "/search",
  authMiddleware.checkAccessToken,
  userMiddleware.isQuerySearchValid(UserValidator.querySearchValidator),
  userController.searchByEmail,
);
router.get(
  "/filter",
  userMiddleware.isQueryFilterValid(UserValidator.queryFilterValidator),
  userController.filter,
);

export const userRouter = router;
