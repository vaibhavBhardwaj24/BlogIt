import { asyncHandler } from "../utils/asyncHandle.js";
import { User } from "../models/user.model.js";
import { uploadCloud, delCloud } from "../utils/cloudinary.js";
import fs from "fs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { log } from "console";

const registerUser = asyncHandler(async (req, res) => {
  const {
    username,
    email,
    fullName,
    avatar,
    password,
    fullerName,
    description,
  } = req.body;
  if (
    [username, email, fullName, password].some((field) => field?.trim() === "")
  ) {
    console.error("all fields required");
  }
  console.log(username, email, fullName, password, fullerName);
  User.findOne({ $or: [{ username }, { email }] })
    .then((user) => {
      if (user) {
        console.error("user already exists", user);
      } else {
        console.log("proceeding");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  const newUser = await User.create({
    username,
    email,
    fullName,
    password,
    avatar,
    description,
  });
  const { accToken, refToken } = await generateRefreshAndAccessToken(
    newUser._id
  );
  const checkUser = await User.findById(newUser._id);

  return res
    .status(200)
    .json({ checkUser, accToken: accToken, redirectTo: "/b/blogFeed" });
});
const generateRefreshAndAccessToken = async (id) => {
  try {
    const specificUser = await User.findById(id);
    const accToken = specificUser.generateAccessToken();
    const refToken = specificUser.generateRefreshToken();
    specificUser.refreshToken = refToken;
    await specificUser.save({ validateBeforeSave: false });
    return { refToken, accToken };
  } catch (error) {
    console.error("cant generate access and refresh token", error);
  }
};
const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  if (!username && !email) {
    console.error("send email or username");
  }
  if (!password) {
    console.error("send password");
  }
  const specificUser = await User.findOne({ $or: [{ username }, { email }] });
  if (!specificUser) {
    console.error("user not found");
  }
  const checkPass = await specificUser.isPassCorrect(password);
  if (!checkPass) {
    return res.status(300).json({ message: "wrong password" });
  }

  const { accToken, refToken } = await generateRefreshAndAccessToken(
    specificUser._id
  );

  return res
    .status(200)
    .json({ specificUser, accToken: accToken, redirectTo: "/b/blogFeed" });
});
const logoutUser = asyncHandler(async (req, res) => {
  console.log(req.user);
  await User.findByIdAndUpdate(req.user._id, {
    $set: { refreshToken: null },
  });
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res.status(200).json({ message: "logged out" });
});
const AccRefToken = asyncHandler(async (req, res) => {
  const intialToken = req.cookie.accessToken;
  try {
    const verifyToken = jwt.verify(
      intialToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const specificUser = await User.findById(verifyToken._id);
    if (!specificUser) {
      console.error("invalid token");
    }
    if (intialToken !== specificUser.refreshToken) {
      console.error("incorrect refresh token");
    }
    const { accToken, refToken } = await generateAccessAndRefreshToken(
      specificUser._id
    );
    return res
      .status(201)
      .cookie("accessToken", accToken, { httpOnly: true, secure: true })
      .cookie("refreshToken", refToken, { httpOnly: true, secure: true });
  } catch (error) {
    console.error(error);
  }
});
const changePass = asyncHandler(async (req, res) => {
  const { oldPass, newPass } = req.body;
  console.log(req.user._conditions._id);
  const specificUser = await User.findById(req.user._conditions._id.toString());
  if (!specificUser) {
    console.error("user not found");
  }
  const isCorrect = await specificUser.isPassCorrect(oldPass);
  if (!isCorrect) {
    console.error("incorrect password");
  }
  specificUser.password = newPass;
  await specificUser.save({ validateBeforeSave: false });
  return res.status(200).json({ message: "password updated" });
});
const currUser = asyncHandler(async (req, res) => {
  const currUser = req.user;
  const Obj = new mongoose.Types.ObjectId(currUser._id);
  const profile = await User.aggregate([
    {
      $match: {
        _id: Obj,
      },
    },
    {
      $lookup: {
        from: "followers",
        localField: "_id",
        foreignField: "following",
        as: "followers",
      },
    },
    {
      $lookup: {
        from: "followers",
        localField: "_id",
        foreignField: "follower",
        as: "following",
      },
    },
    {
      $lookup: {
        from: "blogs",
        localField: "_id",
        foreignField: "creator",
        as: "posts",
      },
    },
    {
      $lookup: {
        from: "likeds",
        localField: "_id",
        foreignField: "user",
        as: "likedPosts",
      },
    },
    {
      $lookup: {
        from: "commentschemas",
        localField: "_id",
        foreignField: "user",
        as: "commentsMade",
      },
    },
  ]);
  return res.status(200).json({ profile });
});
const updateUser = asyncHandler(async (req, res) => {
  const { username, fullName, email } = req.body;
  await User.findByIdAndUpdate(req.user._id.toString(), {
    $set: {
      username,
      fullName,
      email,
    },
  });
  return res.status(200).json({
    message: "updated",
  });
});
const updateAvatar = asyncHandler(async (req, res) => {
  const avaLocalPath2 = req.files.avatar2;
  const imgURL = await uploadCloud(avaLocalPath2);
  const publicId = url.split("/").pop().split(".")[0];
  await User.findByIdAndUpdate(req.user._id.toString(), {
    $set: {
      avatar: imgURL,
    },
  });
  await delCloud(publicId);
  return res.status(200).json({ message: "updated" });
});
const userProfile = asyncHandler(async (req, res) => {
  // console.log(req.user);
  const currUser = req.user;
  const Obj = new mongoose.Types.ObjectId(currUser._id);
  const profile = await User.aggregate([
    {
      $match: {
        _id: Obj,
      },
    },
    {
      $lookup: {
        from: "followers",
        localField: "_id",
        foreignField: "following",
        pipeline: [
          {
            $project: {
              followers: 1,
              followerName: 1,
            },
          },
        ],
        as: "followers",
      },
    },
    {
      $lookup: {
        from: "followers",
        localField: "_id",
        foreignField: "follower",
        pipeline: [
          {
            $project: {
              following: 1,
              followingName: 1,
            },
          },
        ],
        as: "following",
      },
    },
    {
      $lookup: {
        from: "blogs",
        localField: "_id",
        foreignField: "creator",
        as: "posts",
      },
    },
    {
      $lookup: {
        from: "likeds",
        localField: "_id",
        foreignField: "user",
        as: "likedPosts",
      },
    },
    {
      $lookup: {
        from: "saveds",
        localField: "_id",
        foreignField: "user",
        as: "saved",
      },
    },
    {
      $addFields: {
        totalPosts: { $size: "$posts" },
        totalFollowers: { $size: "$followers" },
        totalFollowing: { $size: "$following" },
        totalSaved: { $size: "$saved" },
      },
    },
    {
      $project: {
        username: 1,
        email: 1,
        fullName: 1,
        avatar: 1,
        totalPosts: 1,
        followers: 1,
        following: 1,
        posts: 1,
        likedPosts: 1,
        saved: 1,
        totalFollowers: 1,
        totalFollowing: 1,
        totalSaved: 1,
        description: 1,
      },
    },
  ]);
  return res.status(200).json({ profile });
});
const trial = asyncHandler(async (req, res) => {
  const currUser = req.user;
  return res.status(200).json({ currUser });
});
const findUser = asyncHandler(async (req, res) => {
  const { username } = req.body;
  // console.log(username);
  const specificUser = await User.findOne({ username });
  // console.log(specificUser);
  return res.status(200).json({ specificUser });
});
const otherProfile = asyncHandler(async (req, res) => {
  const { otherUser } = req.body;
  const Obj = new mongoose.Types.ObjectId(otherUser);
  // console.log(otherUser);
  const profile = await User.aggregate([
    {
      $match: {
        _id: Obj,
      },
    },
    {
      $lookup: {
        from: "followers",
        localField: "_id",
        foreignField: "following",
        pipeline: [
          {
            $project: {
              followers: 1,
              followerName: 1,
            },
          },
        ],
        as: "followers",
      },
    },
    {
      $lookup: {
        from: "followers",
        localField: "_id",
        foreignField: "follower",
        pipeline: [
          {
            $project: {
              following: 1,
              followingName: 1,
            },
          },
        ],
        as: "following",
      },
    },
    {
      $lookup: {
        from: "blogs",
        localField: "_id",
        foreignField: "creator",
        as: "posts",
      },
    },
    {
      $project: {
        username: 1,
        email: 1,
        avatar: 1,
        followers: 1,
        following: 1,
        posts: 1,
        description: 1,
      },
    },
  ]);
  return res.status(200).json({ profile });
});

export {
  registerUser,
  loginUser,
  logoutUser,
  AccRefToken,
  changePass,
  currUser,
  updateAvatar,
  updateUser,
  userProfile,
  findUser,
  trial,
  otherProfile,
};
