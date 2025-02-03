import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { UserValidator } from "../validator/user.validator";

const router = Router();

router.post(
  "/sign-in",
  authMiddleware.authDataValid(UserValidator.signIn),
  authController.signIn,
);

router.post("/logout", authMiddleware.checkAccessToken, authController.logout);
router.post("/logoutAll", authMiddleware.checkAccessToken, authController.logoutAll);

export const authRouter = router;
