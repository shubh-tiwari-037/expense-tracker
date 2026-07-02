import Wallet from "../models/wallet.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

export const getWalletSummary = asyncHandler(async (req, res) => {
  const wallet = await Wallet.findOne({ user: req.user.id });

  if (!wallet) {
    throw new ApiError(404, "Wallet not found");
  }

  return res.status(200).json({
    success: true,
    message: "Wallet fetched successfully",
    wallet: {
      currentBalance: wallet.currentBalance,
      totalExpense: wallet.totalExpense,
      totalIncome: wallet.totalIncome,
    },
  });
});

export default { getWalletSummary };
