import { Router } from "express";
import {
  createBlog,
  getAllBlogs,
  deleteBlog,
  updateBlog,
  getBlogOfParticularUser,
  getMyBlogs,
  getBlogById
} from "../controllers/blog.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";


const router = Router();

router.route("/getAllBlogs").get(getAllBlogs);
router.route("/create-blog").post(verifyJWT, createBlog);
router.route("/getBlogById/:blogId").get(verifyJWT,getBlogById)
router.route("/update-blog/:blogId").patch(verifyJWT, updateBlog);
router.route("/deleteblog/:blogId").delete(verifyJWT, deleteBlog);
router.route("/get-my-blogs").get(verifyJWT,getMyBlogs);
router.route("/getUserBlog/:userId").get(verifyJWT, getBlogOfParticularUser);

export default router;
