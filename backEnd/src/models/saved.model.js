import mongoose, { Schema } from "mongoose";
const saved = new Schema({
  blogId: {
    type: Schema.Types.ObjectId,
    ref: "Blog",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});
export const Saved = mongoose.model("saved", saved);
