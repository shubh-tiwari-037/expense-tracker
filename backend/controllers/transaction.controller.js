import Transaction from "../models/transaction.model.js";
import Wallet from "../models/wallet.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

export const createTransaction = asyncHandler(async (req, res) => {
  const { title, amount, type, category, description, date } = req.body;

  const wallet = await Wallet.findOne({ user: req.user.id });

  if (!wallet) {
    throw new ApiError(404, "Wallet not found");
  }

  if (type === "expense" && wallet.currentBalance < amount) {
    throw new ApiError(400, "Insufficient Balance");
  }

  const transaction = await Transaction.create({
    user: req.user.id,
    wallet: wallet._id,
    title,
    amount,
    type,
    category,
    description,
    transactionDate: date || Date.now(),
  });

  if (type === "income") {
    wallet.totalIncome += Number(amount);
    wallet.currentBalance += Number(amount);
  } else {
    wallet.totalExpense += Number(amount);
    wallet.currentBalance -= Number(amount);
  }

  await wallet.save();

  return res.status(201).json({
    success: true,
    message: `${type === "income" ? "Income" : "Expense"} added successfully`,
    transaction,
    wallet,
  });
});


// Backward-compatible helpers kept so existing "quick add" style calls still work.
export const addBalance = asyncHandler(async (req, res) => {
  req.body.type = "income";
  req.body.category = req.body.category || "Other";
  req.body.title = req.body.title || "Wallet Top-up";
  return createTransaction(req, res);
});


export const addExpense = asyncHandler(async (req, res) => {
  req.body.type = "expense";
  req.body.category = req.body.category || "Other";
  req.body.title = req.body.title || "Expense";
  return createTransaction(req, res);
});


const SORT_MAP = {
  newest: { transactionDate: -1 },
  oldest: { transactionDate: 1 },
  highest: { amount: -1 },
  lowest: { amount: 1 },
};


export const getMyTransactions = asyncHandler(async (req, res) => {
  const {
    search,
    type,
    category,
    startDate,
    endDate,
    sort = "newest",
    page = 1,
    limit = 10,
  } = req.query;

  const filter = { user: req.user.id };

  if (search) {
    filter.title = { $regex: search, $options: "i" };
  }

  if (type) {
    filter.type = type;
  }

  if (category) {
    filter.category = category;
  }

  if (startDate || endDate) {
    filter.transactionDate = {};
    if (startDate) filter.transactionDate.$gte = new Date(startDate);
    if (endDate) filter.transactionDate.$lte = new Date(endDate);
  }

  const pageNum = Math.max(Number(page) || 1, 1);
  const limitNum = Math.max(Number(limit) || 10, 1);
  const skip = (pageNum - 1) * limitNum;

  const [transactions, total] = await Promise.all([
    Transaction.find(filter)
      .sort(SORT_MAP[sort] || SORT_MAP.newest)
      .skip(skip)
      .limit(limitNum),
    Transaction.countDocuments(filter),
  ]);

  return res.status(200).json({
    success: true,
    message: "Transactions fetched successfully",
    transactions,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum) || 1,
    },
  });
});


const toCsvValue = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;


export const exportTransactionsCsv = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find({ user: req.user.id }).sort({ transactionDate: -1 });

  const header = ["Title", "Amount", "Type", "Category", "Description", "Date"];
  const rows = transactions.map((t) =>
    [t.title, t.amount, t.type, t.category, t.description, t.transactionDate.toISOString()]
      .map(toCsvValue)
      .join(",")
  );

  const csv = [header.join(","), ...rows].join("\n");

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attachment; filename=transactions.csv");

  return res.status(200).send(csv);
});


export const getTransactionById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const transaction = await Transaction.findOne({ _id: id, user: req.user.id });

  if (!transaction) {
    throw new ApiError(404, "Transaction not found");
  }

  return res.status(200).json({
    success: true,
    message: "Transaction fetched successfully",
    transaction,
  });
});


export const deleteTransaction = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const transaction = await Transaction.findOne({
    _id: id,
    user: req.user.id,
  });

  if (!transaction) {
    throw new ApiError(404, "Transaction not found");
  }

  const wallet = await Wallet.findById(transaction.wallet);

  if (wallet) {
    if (transaction.type === "income") {
      wallet.totalIncome -= transaction.amount;
      wallet.currentBalance -= transaction.amount;
    } else {
      wallet.totalExpense -= transaction.amount;
      wallet.currentBalance += transaction.amount;
    }

    await wallet.save();
  }

  await Transaction.findByIdAndDelete(id);

  return res.status(200).json({
    success: true,
    message: "Transaction deleted successfully",
  });
});


export default {
  createTransaction,
  addBalance,
  addExpense,
  getMyTransactions,
  getTransactionById,
  exportTransactionsCsv,
  deleteTransaction,
};
