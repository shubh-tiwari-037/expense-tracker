import User from "../models/user.model.js";
import Wallet from "../models/wallet.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../middleware/accessAndRefreshToken.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "lax",
};

export const register = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, "Email already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    fullName,
    email,
    password: hashedPassword,
  });

  await Wallet.create({
    user: user._id,
  });

  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  return res.status(201).json({
    success: true,
    message: "User Registered Successfully",
    user: createdUser,
  });
});


export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(401, "Invalid Credentials");
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    throw new ApiError(401, "Invalid Credentials");
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

  return res
    .status(200)
    .cookie("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: 15 * 60 * 1000,
    })
    .cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json({
      success: true,
      message: "Login Successful",
      accessToken,
      refreshToken,
      user: loggedInUser,
    });
});



export const logout = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, { $unset: { refreshToken: 1 } });

  return res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json({
      success: true,
      message: "Logout Successful",
    });
});


export const getMe = asyncHandler(async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Current user fetched successfully",
    user: req.user,
  });
});


export const updateProfile = asyncHandler(async (req, res) => {
  const { fullName } = req.body;

  if (!fullName || fullName.trim().length < 3) {
    throw new ApiError(400, "Full name must be at least 3 characters");
  }

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { fullName: fullName.trim() },
    { new: true }
  ).select("-password -refreshToken");

  return res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user,
  });
});


export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    throw new ApiError(400, "Current and new password are required");
  }

  if (newPassword.length < 6) {
    throw new ApiError(400, "New password must be at least 6 characters");
  }

  const user = await User.findById(req.user.id);

  const isPasswordMatched = await bcrypt.compare(currentPassword, user.password);

  if (!isPasswordMatched) {
    throw new ApiError(401, "Current password is incorrect");
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  return res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
});



export const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body?.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Refresh token is required");
  }

  let decoded;
  try {
    decoded = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    throw new ApiError(401, "Invalid or Expired Refresh Token");
  }

  const user = await User.findById(decoded.id);

  if (!user || user.refreshToken !== incomingRefreshToken) {
    throw new ApiError(401, "Invalid or Expired Refresh Token");
  }

  const accessToken = generateAccessToken(user);
  const newRefreshToken = generateRefreshToken(user);

  user.refreshToken = newRefreshToken;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .cookie("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: 15 * 60 * 1000,
    })
    .cookie("refreshToken", newRefreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json({
      success: true,
      message: "Access Token Refreshed",
      accessToken,
      refreshToken: newRefreshToken,
    });
});

export default {
  register,
  login,
  logout,
  getMe,
  updateProfile,
  changePassword,
  refreshAccessToken,
};
