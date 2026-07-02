import mongoose from "mongoose";
import { ALL_CATEGORIES } from "../constants/categories.js";

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    wallet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wallet",
      required: true,
    },

    title: {
      type: String,
      required: [true, "Title is required"],
    },

    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: 1,
    },

    type: {
      type: String,
      enum: ["income", "expense"],
      required: [true, "Type is required"],
    },

    category: {
      type: String,
      enum: ALL_CATEGORIES,
      default: "Other",
    },

    description: {
      type: String,
      default: "",
    },

    transactionDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Transaction", transactionSchema);