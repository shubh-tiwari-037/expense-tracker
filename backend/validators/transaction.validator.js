import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from "../constants/categories.js";

export const validateTransaction = (req, res, next) => {
  const { title, amount, type, category } = req.body;
  const errors = [];

  if (!title || !title.trim()) {
    errors.push("Title is required");
  }

  if (amount === undefined || amount === null || isNaN(amount) || Number(amount) <= 0) {
    errors.push("Amount must be a positive number");
  }

  if (!type || !["income", "expense"].includes(type)) {
    errors.push("Type must be 'income' or 'expense'");
  }

  if (category) {
    const validCategories = type === "expense" ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

    if (!validCategories.includes(category)) {
      errors.push(`Category must be one of: ${validCategories.join(", ")}`);
    }
  }

  if (errors.length) {
    return res.status(400).json({ success: false, message: errors[0], errors });
  }

  next();
};

export const validateAmount = (req, res, next) => {
  const { amount } = req.body;

  if (amount === undefined || amount === null || isNaN(amount) || Number(amount) <= 0) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid amount",
    });
  }

  next();
};
