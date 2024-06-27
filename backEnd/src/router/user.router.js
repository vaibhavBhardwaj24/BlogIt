import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  changePass,
  updateAvatar,
  updateUser,
  userProfile,
  findUser,
  otherProfile,
  currAva,
} from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
const userRouter = Router();
userRouter
  .route("/register")
  .post(upload.fields([{ name: "avatar", maxCount: 1 }]), registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/findUser").post(findUser);
userRouter.route("/logout").post(verifyJWT, logoutUser);
userRouter.route("/changePassword").post(verifyJWT, changePass);
userRouter.route("/currUser").post(verifyJWT, userProfile);
userRouter
  .route("updAvatar")
  .post(
    verifyJWT,
    upload.fields([{ name: "avatar2", maxCount: 1 }]),
    updateAvatar
  );
userRouter.route("/updUser").post(verifyJWT, updateUser);
userRouter.route("/otherProfile").post(otherProfile);
userRouter.route("/currAva").post(currAva)
// userRouter.route("/profile/:profile").post(verifyJWT, userProfile);
// userRouter.route("/profile/:profile").post(verifyJWT,trial)
export default userRouter;
