import Transaction from "../models/transaction.model.js";
import Wallet from "../models/wallet.model.js";


export const addBalance = async (req, res) => {
  try {
    const { amount, title, category } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid amount",
      });
    }

    const wallet = await Wallet.findOne({ user: req.user.id });

    if (!wallet) {
      return res.status(404).json({
        success: false,
        message: "Wallet not found",
      });
    }

    const transaction = await Transaction.create({
      user: req.user.id,
      wallet: wallet._id,
      title: title || "Wallet Top-up",
      amount,
      type: "income",
      category: category || "Salary",
    });

    wallet.totalIncome += Number(amount);
    wallet.currentBalance += Number(amount);

    await wallet.save();

    return res.status(201).json({
      success: true,
      message: "Balance Added Successfully",
      transaction,
      wallet,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const addExpense = async (req, res) => {
  try {
    const { amount, title, category } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid amount",
      });
    }

    const wallet = await Wallet.findOne({
      user: req.user.id,
    });

    if (!wallet) {
      return res.status(404).json({
        success: false,
        message: "Wallet not found",
      });
    }

    if (wallet.currentBalance < amount) {
      return res.status(400).json({
        success: false,
        message: "Insufficient Balance",
      });
    }

    const transaction = await Transaction.create({
      user: req.user.id,
      wallet: wallet._id,
      title: title || "expense",
      amount,
      type: "expense",
      category: category || "Other",
    });

    wallet.totalExpense += Number(amount);
    wallet.currentBalance -= Number(amount);

    await wallet.save();

    return res.status(201).json({
      success: true,
      message: "Expense Added Successfully",
      transaction,
      wallet,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getTransactionHistory = async (req, res) => {
  try {

   const transactions = await Transaction.find({
  user: req.user.id,
})
.populate("user", "fullName email")
.sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: transactions.length,
      transactions,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


export const getAllTransactions = async (req, res) => {
    console.log("getAllTransactions Hit");
  try {

    const transactions = await Transaction.find()
      .populate("user", "fullName email")
      .populate("wallet", "currentBalance")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      totalTransactions: transactions.length,
      transactions,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findOne({
      _id: id,
      user: req.user.id,
    });

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    await Transaction.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default {
    addBalance,
    addExpense,
    getAllTransactions,
    deleteTransaction,
    getTransactionHistory
}