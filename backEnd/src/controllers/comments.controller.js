import { asyncHandler } from "../utils/asyncHandle.js";
import { CommentSchema } from "../models/comments.model.js";
import mongoose from "mongoose";

const createComment = asyncHandler(async (req, res) => {
  const { comment,blogId } = req.body;
  const currUser = req.user;
  // const  = req.params;
  // console.log(comment);
  const newComment = await CommentSchema.create({
    blogId: blogId,
    comment,
    user: currUser._id,
    username: currUser.username,
    userURL: currUser.avatar,
  });
  return res.status(200).json({ newComment });
});
const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.body;
  const currUser = req.user;
  const comment = await CommentSchema.findById(commentId);
  // console.log(comment);
  if (comment.user == currUser._id.toString()) {
    const isdelete=await CommentSchema.findByIdAndDelete(commentId);
   
    return res.status(200).json({ message: "deleted the comment" ,isdelete});
  }
  else{
    return res.status(200).json({message:"unathorized access"})
  }
});
export { createComment, deleteComment };
