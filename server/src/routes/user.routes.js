import {
  logoutUser,
  loginUser,
  registerUser,
  updateUser,
} from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { Router } from "express";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/updateAccountDetails").patch(verifyJWT, updateUser);

export default router;
