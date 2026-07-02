import express from "express";
import {
  getAllUsers,
  getAllTransactions,
  deleteUser,
  deleteTransactionAsAdmin,
  getDashboardStats,
} from "../controllers/admin.controller.js";

import { auth } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/isAdmin.js";

const adminRoute = express.Router();

adminRoute.use(auth, isAdmin);

adminRoute.get("/users", getAllUsers);
adminRoute.get("/transactions", getAllTransactions);
adminRoute.get("/dashboard", getDashboardStats);
adminRoute.delete("/user/:id", deleteUser);
adminRoute.delete("/transaction/:id", deleteTransactionAsAdmin);

export default adminRoute;
