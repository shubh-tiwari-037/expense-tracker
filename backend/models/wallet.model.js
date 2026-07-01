import mongoose from "mongoose";

const walletSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    totalIncome: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalExpense: {
      type: Number,
      default: 0,
      min: 0,
    },

    currentBalance: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Wallet", walletSchema);