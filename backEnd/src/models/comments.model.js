import mongoose, { Schema } from "mongoose";
const comment = new Schema(
  {
    blogId: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
    comment:{
      type:String,
      required:true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    username:{
      type:String,
      required:true
    },
    userURL:{
      type:String
    }
  },
  {
    timestamps: true,
  }
);
export const CommentSchema = mongoose.model("CommentSchema", comment);
