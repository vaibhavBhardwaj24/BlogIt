import { configureStore } from "@reduxjs/toolkit";
import blogs from "./blogs.js";
import users from "./users.js";
import liked from "./liked.js";
import follow from "./follower.js";
import commentSlice from "./comment.js";
import saved from "./saved.js";
const store = configureStore({
  reducer: {
    allBlogs: blogs,
    user: users,
    liked: liked,
    follow: follow,
    comment: commentSlice,
    saved:saved
  },
  //   preloadedState:i
});
export default store;
