import express from "express";
import {
  createTransaction,
  addBalance,
  addExpense,
  getMyTransactions,
  getTransactionById,
  exportTransactionsCsv,
  deleteTransaction,
} from "../controllers/transaction.controller.js";

import { auth } from "../middleware/auth.middleware.js";
import { validateTransaction, validateAmount } from "../validators/transaction.validator.js";

const transactionRoute = express.Router();

// Spec-aligned CRUD
transactionRoute.post("/", auth, validateTransaction, createTransaction);
transactionRoute.get("/", auth, getMyTransactions);
transactionRoute.get("/export/csv", auth, exportTransactionsCsv);
transactionRoute.get("/:id", auth, getTransactionById);
transactionRoute.delete("/:id", auth, deleteTransaction);

// Quick-add shortcuts used by the dashboard's Quick Add Income / Quick Add Expense
transactionRoute.post("/balance", auth, validateAmount, addBalance);
transactionRoute.post("/expense", auth, validateAmount, addExpense);

export default transactionRoute;
