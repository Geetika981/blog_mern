import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {
  toggleblogLike,
  togglecommentlike,
  getLikedBlogs,
} from "../controllers/like.contollers.js";
const router = Router();

router.route("/toggle/b/:blogId").post(verifyJWT, toggleblogLike);
router.route("/toggle/c/:commentId").post(verifyJWT, togglecommentlike);
router.route("/liked-blogs").get(verifyJWT, getLikedBlogs);

export default router;
