import User from "../models/user.model.js";
import Wallet from "../models/wallet.model.js";
import Transaction from "../models/transaction.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password -refreshToken").sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    message: "Users fetched successfully",
    count: users.length,
    users,
  });
});

export const getAllTransactions = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find()
    .populate("user", "fullName email")
    .sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    message: "Transactions fetched successfully",
    count: transactions.length,
    transactions,
  });
});

export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  await Promise.all([
    User.findByIdAndDelete(id),
    Wallet.deleteOne({ user: id }),
    Transaction.deleteMany({ user: id }),
  ]);

  return res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});

export const deleteTransactionAsAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const transaction = await Transaction.findById(id);

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

export const getDashboardStats = asyncHandler(async (req, res) => {
  const [totalUsers, totalTransactions, totals] = await Promise.all([
    User.countDocuments(),
    Transaction.countDocuments(),
    Transaction.aggregate([
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" },
        },
      },
    ]),
  ]);

  const totalIncome = totals.find((t) => t._id === "income")?.total || 0;
  const totalExpense = totals.find((t) => t._id === "expense")?.total || 0;

  return res.status(200).json({
    success: true,
    message: "Dashboard stats fetched successfully",
    stats: {
      totalUsers,
      totalTransactions,
      totalIncome,
      totalExpense,
    },
  });
});

export default {
  getAllUsers,
  getAllTransactions,
  deleteUser,
  deleteTransactionAsAdmin,
  getDashboardStats,
};
