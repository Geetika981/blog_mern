import { Blog } from "../models/blog.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { isValidObjectId } from "mongoose";

const getAllBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find();
  if (!blogs) {
    throw new ApiError(400, "No blogs are created yet");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, blogs, "All bloga are fetched successfully"));
});

const createBlog = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    throw new ApiError(400, "all fields are required");
  }
  const newBlog = await Blog.create({
    owner: req.user._id,
    title: title,
    description: description,
  });
  if (!newBlog) {
    throw new ApiError(500, "Internal error while creating blogs");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, newBlog, "blog is created successfully"));
});

const deleteBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.params;
  if (!isValidObjectId(blogId)) {
    throw new ApiError(400, "invalid blogId");
  }
  const toDeleteId = await Blog.findById(blogId);
  if (!toDeleteId) {
    throw new ApiError(400, "invalid todoId");
  }
  const deletedBlog = await Blog.findByIdAndDelete(blogId);
  if (!deletedBlog) {
    throw new ApiError(500, "Internal error while deleting blog");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "blog deleted successfully"));
});

const updateBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.params;
  const { title, description } = req.body;

  if (!title && !description) {
    throw new ApiError(400, "Atleast change in one field is required");
  }
  if (!isValidObjectId(blogId)) {
    throw new ApiError(400, "Invalid Blog Id");
  }
  const blog = await Blog.findById(blogId);
  if (!blog) {
    throw new ApiError(400, "Invalid Blog Id");
  }
  const updatedBlog = await Blog.findByIdAndUpdate(
    blogId,
    {
      $set: {
        title,
        description,
      },
    },
    { new: true }
  );
  if (!updateBlog) {
    throw new ApiError(500, "Internal error while updating blog");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, updatedBlog, "Blog updated successfully"));
});
const getMyBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.aggragate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(req.user._id),
      },
    },
  ]);

  if (blogs.length === 0) {
    throw new ApiError(400, "No blogs are created by You yet");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, blogs, "all blogs are fetched successfully"));
});
const getBlogOfParticularUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  if (!isValidObjectId(userId)) {
    throw new ApiError(400, "No user with this Id exists");
  }
  const blogs = await Blog.aggragate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(userId),
      },
    },
  ]);

  if (blogs.length === 0) {
    throw new ApiError(400, "No blogs are created by the asked user yet");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, blogs, "all blogs are fetched successfully"));
});

export {
  createBlog,
  deleteBlog,
  updateBlog,
  getBlogOfParticularUser,
  getAllBlogs,
  getMyBlogs,
};
