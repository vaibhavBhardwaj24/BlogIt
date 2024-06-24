import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { toggleSaved,isSaved } from "../controllers/saved.controller.js";
const savedRouter = Router();
savedRouter.route("/savePost").post(verifyJWT, toggleSaved);
savedRouter.route("/isSaved").post(verifyJWT, isSaved);
export default savedRouter;
