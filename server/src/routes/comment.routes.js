import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {
  getUserComment,
  getAllComments,
  createComment,
} from "../controllers/comments.controllers.js";

const router = Router();
router.route("/create-comment/:blogId").post(verifyJWT, createComment);
router.route("/blog-comments/:blogId").get(verifyJWT, getAllComments);
router.route("/my-comments").get(verifyJWT, getUserComment);

export default router;
