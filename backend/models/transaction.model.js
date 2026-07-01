import mongoose from "mongoose";

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
     
    },

    category: {
      type: String,
      enum: [
        "Salary",
        "Food",
        "Rent",
        "Shopping",
        "Travel",
        "Other",
      ],
    
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