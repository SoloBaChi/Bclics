import express from "express";
import {
  getUserProfile,
  signupUser,
  loginUser,
  logoutUser,
  followUnFollowUser,
  updateUser,
} from "../controllers/userController.js";
import authenticate from "../utils/authenticate.js";

const router = express.Router();

router.get("/:query", authenticate, getUserProfile); // Fetch user profile
router.post("/signup", signupUser); // Signup new user
router.post("/login", loginUser); // Login user
router.post("/logout", authenticate, logoutUser); // Logout user
router.put("/:id/follow", authenticate, followUnFollowUser); // Follow/Unfollow
router.put("/update/:id", authenticate, updateUser); // Update profile

export default router;
