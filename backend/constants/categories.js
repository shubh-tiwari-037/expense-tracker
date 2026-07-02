export const INCOME_CATEGORIES = [
  "Salary",
  "Freelancing",
  "Investment",
  "Bonus",
  "Other",
];

export const EXPENSE_CATEGORIES = [
  "Food",
  "Rent",
  "Shopping",
  "Entertainment",
  "Medical",
  "Transport",
  "Education",
  "Bills",
  "Other",
];

export const ALL_CATEGORIES = [
  ...new Set([...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES]),
];
