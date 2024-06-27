import { asyncHandler } from "../utils/asyncHandle.js";
import { Saved } from "../models/saved.model.js";
const toggleSaved = asyncHandler(async (req, res) => {
  const currUser = req.user;
  const { blogId, title,coverURL } = req.body;
  console.log(title);
  const isSaved = await Saved.findOne({
    blogId: blogId,
    user: currUser._id,
    
  });
  if (isSaved) {
    await Saved.deleteOne({ _id: isSaved });
    return res.status(200).json({ message: "unSaved", isSaved });
  } else {
    const newSave = await Saved.create({
      blogId,
      user: currUser._id,
      title: title,
      coverURL:coverURL,
    });
    return res.status(200).json({ message: "saved", newSave });
  }
});
const isSaved = asyncHandler(async (req, res) => {
  const currUser = req.user;
  const { blogId } = req.body;
  const isSaved = await Saved.findOne({
    blogId: blogId,
    user: currUser._id,
  });
  if (isSaved) {
    return res.status(200).json({ isSaved, message: true });
  } else {
    return res.status(200).json({ message: false });
  }
});
export { toggleSaved, isSaved };
