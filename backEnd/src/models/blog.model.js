import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
const blog = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    creatorName: {
      type: String,
      required: true,
    },
    creatorURL: {
      type: String,
      // required:true
    },
    title: {
      type: String,
      required: true,
      index: true,
    },
    article: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
    },
    isPublic: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
export const Blog = mongoose.model("Blog", blog);
