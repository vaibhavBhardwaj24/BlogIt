import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { createComment, deleteComment } from "../controllers/comments.controller.js";
const commentRouter = Router();
commentRouter.route("/postComment").post(verifyJWT, createComment);
commentRouter.route("/deleteComment").post(verifyJWT,deleteComment)
export default commentRouter;
