import express from "express";
import {
  register,
  login,
  logout,
  getMe,
  updateProfile,
  changePassword,
  refreshAccessToken,
} from "../controllers/user.controller.js";
import { auth } from "../middleware/auth.middleware.js";
import { validateRegister, validateLogin } from "../validators/auth.validator.js";
import { googleLogin } from "../controllers/googleAuth.controller.js";


const userRoute = express.Router();

userRoute.post("/register", validateRegister, register);
userRoute.post("/login", validateLogin, login);
userRoute.post("/google", googleLogin);

userRoute.post("/logout", auth, logout);
userRoute.get("/me", auth, getMe);
userRoute.patch("/profile", auth, updateProfile);
userRoute.patch("/change-password", auth, changePassword);
userRoute.post("/refresh-token", refreshAccessToken);

export default userRoute;
