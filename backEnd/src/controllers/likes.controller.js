import { asyncHandler } from "../utils/asyncHandle.js";
import { Liked } from "../models/liked.model.js";
const toggleLike = asyncHandler(async (req, res) => {
  const currUser = req.user;
  const { blogId,title } = req.body;
  const isLiked = await Liked.findOne({
    blogId: blogId,
    user: currUser._id,
  });
  if (isLiked) {
    await Liked.deleteOne({ _id: isLiked });
    return res.status(200).json({ message: "unliked", isLiked });
  } else {
    const newLike = await Liked.create({
      blogId,
      user: currUser._id,
      username: currUser.username,
      userUrl: currUser.avatar,
      title: title,
    });
    return res.status(200).json({ message: "liked", newLike });
  }
});
const isLiked = asyncHandler(async (req, res) => {
  const currUser = req.user;
  const { blogId, title } = req.body;
  //   console.log(req.user);
  const isLiked = await Liked.findOne({
    blogId: blogId,
    user: currUser._id,
    
  });
  if (isLiked) {
    return res.status(200).json({ isLiked, message: true });
  } else {
    return res.status(200).json({ message: false });
  }
});

export { toggleLike, isLiked };
