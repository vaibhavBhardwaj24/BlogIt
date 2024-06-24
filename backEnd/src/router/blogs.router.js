import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import {
  createBlog,
  deleteBlog,
  getBlogById,
  getBlogs,
  togglePublic,
  updateBlogs,
} from "../controllers/blog.controller.js";
const blogRouter = Router();
blogRouter.route("/createBlog").post(
  verifyJWT,
  // upload.fields([{ name: "cover", maxCount: 1 }]),
  createBlog
);
blogRouter.route("/getBlogs").post(getBlogs);
blogRouter.route("/getBlogById").post(getBlogById);
blogRouter.route("/blogSmall").post(getBlogById);
blogRouter.route("/updateBlog/:blogId").post(verifyJWT, updateBlogs);
blogRouter.route("/togglePublic").post(verifyJWT, togglePublic);
blogRouter.route("/deleteBlog").post(verifyJWT, deleteBlog);
export default blogRouter;
