import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./router/user.router.js";
import followRouter from "./router/follow.router.js";
import blogRouter from "./router/blogs.router.js";
import commentRouter from "./router/comment.router.js";
import likedRouter from "./router/liked.route.js";
import savedRouter from "./router/saved.router.js";
const app = express();
app.use(
  cors(
    {
      // origin: ["http://localhost:5173"," https://db1e-182-69-182-255.ngrok-free.app"],
      origin:"*",
      credentials: true,
      allowedHeaders: ["Authorization", "Content-Type"],
    },
   
  )
);
app.use(express.json({ limit: "32kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use("/v1/user", userRouter);
app.use("/v1/f", followRouter);
app.use("/v1/b", blogRouter);
app.use("/v1/c", commentRouter);
app.use("/v1/l", likedRouter);
app.use("/v1/s", savedRouter);
export { app };