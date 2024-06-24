import { User } from "../models/user.model.js";
import { Follower } from "../models/follower.model.js";
import { asyncHandler } from "../utils/asyncHandle.js";
const ToggleFollow = asyncHandler(async (req, res) => {
  const currUser = req.user;
  const { otherUserId, otherUserName } = req.body;
  // console.log(currUser._id);
  // const otherUserId = await User.findOne({ username: otherUser });
  // console.log(otherUserId._id.toString());
  const isFollowed = await Follower.findOne({
    follower: currUser._id,
    following: otherUserId,
  });
  if (isFollowed) {
    await Follower.deleteOne({ _id: isFollowed });
    console.log("unfollowed");
    console.log(isFollowed);
    return res.status(200).json({ message: "unfollowed" });
  } else {
    const newFollow = await Follower.create({
      follower: currUser._id,
      following: otherUserId,
      followerName: currUser.username,
      followingName: otherUserName,
    });
    return res.status(200).json({ newFollow, message: "followed" });
  }
});
const isFollowed = asyncHandler(async (req, res) => {
  const currUser = req.user;
  const { otherUserId } = req.body;
  // console.log(currUser._id);
  // const otherUserId = await User.findOne({ username: otherUser });
  // console.log(otherUserId._id.toString());
  const isFollowed = await Follower.findOne({
    follower: currUser._id,
    following: otherUserId,
  });
  if (isFollowed) {
    return res.status(200).json({ isFollowed, message: true });
  } else {
    return res.status(200).json({ message: false });
  }
});
const allFollowers = asyncHandler(async (req, res) => {
  const currUser = req.user;
  //   console.log(currUser._id);
  const allFollowers = await Follower.aggregate([
    {
      $match: {
        follower: currUser._id,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "follower",
        foreignField: "_id",
        as: "followerz",
      },
    },
  ]);
  //   const totalFollowersCount = allFollowers[0] ? allFollowers[0].totalFollowersCount : 0;
  return res.status(200).json({ allFollowers, total: allFollowers.length });
});
const allFollowing = asyncHandler(async (req, res) => {
  const currUser = req.user;
  //   console.log(currUser._id);
  const allFollowers = await Follower.aggregate([
    {
      $match: {
        follower: currUser._id,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "following",
        foreignField: "_id",
        as: "followerz",
      },
    },
  ]);
  return res.status(200).json({ allFollowers, total: allFollowers.length });
});
export { ToggleFollow, allFollowers, allFollowing, isFollowed };
