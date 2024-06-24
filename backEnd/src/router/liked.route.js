import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { isLiked, toggleLike } from "../controllers/likes.controller.js";
const likedRouter = Router();
likedRouter.route("/toggleLike").post(verifyJWT, toggleLike);
likedRouter.route("/isLiked/").post(verifyJWT,isLiked)
export default likedRouter