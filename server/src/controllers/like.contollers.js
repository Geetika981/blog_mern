import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Like } from "../models/likes.models.js";
import { Blog } from "../models/blog.models.js";
import { Comment } from "../models/comments.models.js";
import { isValidObjectId } from "mongoose";

const toggleblogLike = asyncHandler(async (req, res) => {
  const { blogId } = req.params;
  if (!isValidObjectId(blogId)) {
    throw new ApiError(400, "invalid blogid");
  }
  const blog = await Blog.findById(blogId);
  if (!blog) {
    throw new ApiError(400, "invalid blogid");
  }
  let like = "Liked";
  let likedOne = await Like.findOne({
    likedBy: req.user._id,
    blog: blogId,
  });
  if (!likedOne) {
    likedOne = await Like.create({
      likedBy: req.user._id,
      blog: blogId,
    });
    like = "Liked";
  } else {
    await Like.deleteOne({
      likedBy: req.user._id,
      blog: blogId,
    });
    like = "Disliked";
  }
  if (!likedOne) {
    throw new ApiError(500, `internal error while ${like} to the blog`);
  }
  return res
    .status(200)
    .json(new ApiResponse(200, likedOne, `${like} the Blog successfully`));
});

const togglecommentlike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  if (!isValidObjectId(commentId)) {
    throw new ApiError(400, "invalid commentId");
  }
  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new ApiError(400, "invalid commentId");
  }
  let like = "Liked";
  let likedOne = await Comment.findOne({
    likedBy: req.user._id,
    comment: commentId,
  });
  if (!likedOne) {
    likedOne = await Like.create({
      likedBy: req.user._id,
      comment: commentId,
    });
    like = "Liked";
  } else {
    await Like.deleteOne({
      likedBy: req.user._id,
      comment: comment,
    });
    like = "Disliked";
  }
  if (!likedOne) {
    throw new ApiError(500, `internal error while ${like} to the blog`);
  }
  return res
    .status(200)
    .json(new ApiResponse(200, likedOne, `${like} the Comment successfully`));
});

const getLikedBlogs = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const blogs = await Like.aggregate([
    {
      $match: {
        likedBy: new mongoose.Types.ObjectId(_id),
      },
    },
    {
      $lookup: {
        from: "blogs",
        localField: "blog",
        foreignField: "_id",
        as: "blogs",
        pipeline: {
          $lookup: {
            from: "users",
            localField: "owner",
            foreignField: "_id",
            as: "owner",
            pipeline: [
              {
                $project: {
                  username: 1,
                  profile: 1,
                },
              },
            ],
          },
        },
      },
    },
  ]);
  if (!blogs.length) {
    throw new ApiError(400, "No liked blogs");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, blogs, "all liked blogs are fetched successfully")
    );
});

export { toggleblogLike, togglecommentlike, getLikedBlogs };
