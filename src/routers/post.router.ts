import { Router } from "express";

import { postController } from "../controllers/post.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { postMiddleware } from "../middlewares/post.middleware";
import { PostValidator } from "../validator/post.validator";

const router = Router();

router.get(
  "/:userId",
  postMiddleware.isPostIdValid("userId"),
  postController.getPostsByUserId,
);
router.post(
  "/",
  authMiddleware.checkAccessToken,
  postMiddleware.isPostBodyValid(PostValidator.bodyValidatePost),
  postController.create,
);
router.put(
  "/:postId",
  postMiddleware.isPostIdValid("postId"),
  authMiddleware.checkAccessToken,
  postMiddleware.isPostBodyValid(PostValidator.bodyValidatePost),
  postController.update,
);
router.delete(
  "/:postId",
  postMiddleware.isPostIdValid("postId"),
  authMiddleware.checkAccessToken,
  postController.deleteById,
);

export const postRouter = router;
