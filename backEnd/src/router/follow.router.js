import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { ToggleFollow, allFollowers, allFollowing, isFollowed } from "../controllers/follower.controller.js";
const followRouter = Router();
// followRouter.route("/toggleFollow").post(verifyJWT, ToggleFollow);
// followRouter.route("/allFollowers").get(verifyJWT,allFollowers)
// followRouter.route("/allFollowing").get(verifyJWT,allFollowing)
// followRouter.route("/isFollowed").post(verifyJWT,isFollowed)
export default followRouter;
