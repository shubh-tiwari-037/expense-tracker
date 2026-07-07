import User from "../models/user.model.js"
import jwt from "jsonwebtoken";

// // export const auth = async (req, res, next) => {
// //   try {
// //     const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

// //     if (!token) {
// //       return res.status(401).json({
// //         success: false,
// //         message: "Please login first",
// //       });
// //     }

// //     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

// //     const user = await User.findById(decoded.id).select("-password -refreshToken");

// //     if (!user) {
// //       return res.status(401).json({
// //         success: false,
// //         message: "User not found",
// //       });
// //     }

// //     req.user = user;

// //     next();
// //   } catch (error) {
// //      console.log(error);
// //     return res.status(401).json({
// //       success: false,
// //       message: "Invalid or Expired Token",
// //     });
// //   }
// // };


// export const auth = (req, res, next) => {
//   try {
//     const token =
//       req.cookies?.accessToken ||
//       req.header("Authorization")?.replace("Bearer ", "");

//     if (!token) {
//       // 👇 IMPORTANT CHANGE (no 401 noise)
//       return res.status(200).json({
//         success: false,
//         user: null,
//       });
//     }

//     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

//     req.user = decoded;
//     next();
//   } catch (error) {
//     return res.status(200).json({
//       success: false,
//       user: null,
//     });
//   }
// };



export const auth = (req, res, next) => {
  try {
    console.log("========== AUTH ==========");
    console.log("Cookies:", req.cookies);

    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    console.log("Token:", token);

    if (!token) {
      console.log("NO TOKEN FOUND");

      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    console.log("Decoded:", decoded);

    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};