import dotenv from "dotenv";
// import { default as connectDB } from "";
import { default as connectDB } from "./src/utils/db.js";

import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./src/router/user.router.js";
import followRouter from "./src/router/follow.router.js";
import blogRouter from "./src/router/blogs.router.js";
import commentRouter from "./src/router/comment.router.js";
import likedRouter from "./src/router/liked.route.js";
import savedRouter from "./src/router/saved.router.js";
import express from "express";
const app = express();
import serverless from "serverless-http";
app.use("", (req, res) => {
  res.json({ message: "sdrty" });
});
// dotenv.config({ path: "src/.env" });
// app.use(
//   cors({
//     origin: "*",
//     credentials: true,
//     allowedHeaders: ["Authorization", "Content-Type"],
//   })
// );
// app.use(express.json({ limit: "32kb" }));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));
// app.use(cookieParser());
// app.use("/v1/user", userRouter);
// app.use("/v1/f", followRouter);
// app.use("/v1/b", blogRouter);
// app.use("/v1/c", commentRouter);
// app.use("/v1/l", likedRouter);
// app.use("/v1/s", savedRouter);
console.log("starting");
connectDB().then(() => {
  app.listen(3000, () => {
    console.log("listening");
  });
});
// export const handler=serverless(app)