import mongoose from "mongoose";
import { Blog } from "../models/blog.model.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandle.js";
import { uploadCloud, delCloud } from "../utils/cloudinary.js";
import fs from "fs";
import { title } from "process";
const createBlog = asyncHandler(async (req, res) => {
  const { article, title, isPublic, coverURL } = req.body;
  const currUser = req.user;
  if (article == null || title == null || isPublic == null) {
    console.error("All fields required");
  }

  // let coverLocalPath;
  // console.log(req.files);
  // if (req.files?.cover) {
  //   coverLocalPath = req.files?.cover[0]?.path;
  // }
  // const coverId = await uploadCloud(coverLocalPath);
  const newBlog = await Blog.create({
    creator: currUser._id,
    creatorName: currUser.username,
    creatorURL: currUser.avatar,
    title,
    article,
    coverImage: coverURL,
    isPublic,
  });
  // if (coverLocalPath) {
  //   fs.unlinkSync(coverLocalPath);
  // }
  return res.status(200).json({ newBlog, message: "blog created" });
});
const getBlogs = asyncHandler(async (req, res) => {
  console.log("yaha tk aya");
  const { lim=10 } = req.body;
  // console.log(req.body);
  const blogs = await Blog.aggregate([
    {
      $match: {
        isPublic: true,
      },
    },
    {
      $lookup: {
        from: "likeds",
        let: { blogId: "$_id" },
        pipeline: [{ $match: { $expr: { $eq: ["$blogId", "$$blogId"] } } }],
        as: "liker",
      },
    },
    {
      $lookup: {
        from: "commentschemas",
        let: { blogId: "$_id" },
        pipeline: [{ $match: { $expr: { $eq: ["$blogId", "$$blogId"] } } }],
        as: "allComments",
      },
    },
    {
      $addFields: {
        totalComments: { $size: "$allComments" },
        totalLikes: { $size: "$liker" },
        likers: { body: "$liker" },
        createdAt: {
          $dateToString: {
            format: "%d-%m-%Y", // MongoDB uses uppercase Y for four-digit year
            date: "$createdAt",
          },
        },
      },
    },
    {
      $project: {
        _id: 1,
        article: { $substr: ["$article", 0, 20] },
        coverImage: 1,
        creator: 1,
        isPublic: 1,
        title: 1,

        totalComments: 1,
        totalLikes: 1,
        creatorName: 1,
        creatorURL: 1,
        createdAt: 1,
      },
    },
    {
      $limit: lim,
    },
    { $sort: {
      createdAt:-1
    } },
  ]);

  return res.status(200).json({ blogs });
});
const getBlogById = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  // console.log(blogId);
  const Obj = new mongoose.Types.ObjectId(blogId);
  // console.log(Obj);
  // const blogs=await Blog.findById(blogId)
  const blogs = await Blog.aggregate([
    {
      $match: {
        _id: Obj,
      },
    },
    {
      $lookup: {
        from: "likeds",
        let: { blogId: "$_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$blogId", "$$blogId"] } } },
          { $project: { _id: 0, userId: 1, likedAt: 1 } },
          // Project necessary fields
        ],
        as: "liker",
      },
    },
    {
      $lookup: {
        from: "commentschemas",
        let: { blogId: "$_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$blogId", "$$blogId"] } } },
          {
            $addFields: {
              createdAt: {
                $dateToString: {
                  format: "%d-%m-%Y", // MongoDB uses uppercase Y for four-digit year
                  date: "$createdAt",
                },
              },
            },
          },
          {
            $project: {
              _id: 0,
              username: 1,
              user: 1,
              comment: 1,
              createdAt: 1,
              userURL: 1,
            },
          }, // Project necessary fields
        ],
        as: "allComments",
      },
    },
    {
      $addFields: {
        totalComments: { $size: "$allComments" },
        totalLikes: { $size: "$liker" },
        likers: { body: "$liker" },
        createdAt: {
          $dateToString: {
            format: "%d-%m-%Y", // MongoDB uses uppercase Y for four-digit year
            date: "$createdAt",
          },
        },
      },
    },
  ]);
  // console.log(blogs[0]._id);
  return res.status(200).json({ blogs });
});
const updateBlogs = asyncHandler(async (req, res) => {
  const currUser = req.user;
  const { blogId } = req.params;
  const { title, article, isPublic } = req.body;
  const blogs = await Blog.findById(blogId);
  if (blogs.creator == currUser._id.toString()) {
    await Blog.findByIdAndUpdate(blogId, {
      $set: {
        title: title,
        article: article,
        isPublic: isPublic,
      },
    });
    return res.status(200).json({ message: "updated" });
  } else {
    return res.status(200).json({
      message: "unauthorized access",
      creator: blogs.creator,
      user: currUser._id,
    });
  }
});
const deleteBlog = asyncHandler(async (req, res) => {
  const currUser = req.user;
  const { blogId } = req.body;
  const blogs = await Blog.findById(blogId);
  if (blogs.creator == currUser._id.toString()) {
    await Blog.findByIdAndDelete(blogId);
    return res.status(200).json({ message: "deleted" });
  } else {
    return res.status(200).json({ message: "unauthorized access" });
  }
});
const getBlogSmall = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  const blogs = await Blog.findById(blogId);
  return res.status(200).json({ blogs });
});
const togglePublic = asyncHandler(async (req, res) => {
  const { blogId, isPub } = req.body;

  const upd = await Blog.findByIdAndUpdate(
    blogId,
    { $set: { isPublic: isPub } },
    { new: true, runValidators: true }
  );
  return res.status(200).json({ messag: "updated", upd });
});
export {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlogs,
  deleteBlog,
  getBlogSmall,
  togglePublic,
};
