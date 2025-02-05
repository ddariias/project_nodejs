import { Router } from "express";

import { postController } from "../controllers/post.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { postMiddleware } from "../middlewares/post.middleware";
import { PostValidator } from "../validator/post.validator";

const router = Router();

router.post(
  "/",
  authMiddleware.checkAccessToken,
  postMiddleware.isPostBodyValid(PostValidator.bodyValidatePost),
  postController.create,
);
router.put(
  "/",
  authMiddleware.checkAccessToken,
  postMiddleware.isPostBodyValid(PostValidator.bodyValidatePost),
  postController.update,
);

export const postRouter = router;
