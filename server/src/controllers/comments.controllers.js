import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Blog } from "../models/blog.models.js";
import { Comment } from "../models/comments.models.js";

const createComment = asyncHandler(async (req, res) => {
  const { blogId } = req.params;
  const { content } = req.body;
  if (!content) {
    throw new ApiError(400, "Content is required");
  }
  if (!isValidObjectId(blogId)) {
    throw new ApiError(400, "invalid blogid");
  }
  const blog = await Blog.findById(blogId);
  if (!blog) {
    throw new ApiError(400, "invalid blogid");
  }
  const newComment = await Comment.create({
    owner: req.user._id,
    blog: blogId,
    content,
  });
  if (!newComment) {
    throw new ApiError(500, "Internal error while creating comment");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, newComment, "commented on the blog successfully")
    );
});

const getAllComments = asyncHandler(async (req, res) => {
  const { blogId } = req.params;
  if (!content) {
    throw new ApiError(400, "Content is required");
  }
  if (!isValidObjectId(blogId)) {
    throw new ApiError(400, "invalid blogid");
  }
  const comments = await Comment.aggregate([
    {
      $match: {
        blog: new mongoose.Types.ObjectId(blogId),
      },
    },
    {
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
  ]);
  if (comments.length === 0) {
    throw new ApiError(
      400,
      "No comments yet on this blog..Be first to Comment"
    );
  }
  return res
    .status(200)
    .json(new ApiResponse(200, comments, "comments fetched successfully"));
});

const getUserComment = asyncHandler(async (req, res) => {
  const comments = await Comment.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $lookup: {
        from: "blogs",
        localField: "blog",
        foreignField: "_id",
        as: "blog",
        pipeline: [
          {
            $project: {
              title: 1,
              imageUrl: 1,
            },
          },
        ],
      },
    },
  ]);

  if (comments.length === 0) {
    throw new ApiError(400, "You have not commented yet on any blog");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, comments, "Your comments are fetches successfully")
    );
});

export { getUserComment, getAllComments, createComment };
