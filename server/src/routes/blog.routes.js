import { Router } from "express";
import {
  createBlog,
  getAllBlogs,
  deleteBlog,
  updateBlog,
  getBlogOfParticularUser,
  getMyBlogs,
} from "../controllers/blog.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/getAllBlogs").get(getAllBlogs);
router.route("/create-blog").post(verifyJWT, createBlog);
router.route("/deleteblog/:blogId").delete(verifyJWT, deleteBlog);
router.route("/update-blog/:blogId").patch(verifyJWT, updateBlog);
router.route("/getUserBlog/:userId").get(verifyJWT, getBlogOfParticularUser);
router.route("/get-my-blogs").get(verifyJWT,getMyBlogs);

export default router;
