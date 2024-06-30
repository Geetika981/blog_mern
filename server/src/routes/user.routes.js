import {
  logoutUser,
  loginUser,
  registerUser,
  updateUser,
  getUser,
} from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { Router } from "express";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(verifyJWT, logoutUser);
router.route("/updateAccountDetails").patch(verifyJWT, updateUser);
router.route("/getUser").get(verifyJWT,getUser);

export default router;
