import express from "express";
import {
  addBalance,
  addExpense,
  getAllTransactions,
  getTransactionHistory,
  deleteTransaction,
} from "../controllers/transaction.controller.js";

import { auth, } from "../middleware/auth.middleware.js";
// import { isAdmin } from "../middleware/isAdmin.js";



const transactionRoute = express.Router();

transactionRoute.post("/balance",auth,addBalance)
transactionRoute.post("/expense",auth,addExpense)
transactionRoute.get("/get",auth,getAllTransactions)

transactionRoute.get("/:id",auth,getTransactionHistory)

transactionRoute.delete("/:id",auth,deleteTransaction)


export default transactionRoute