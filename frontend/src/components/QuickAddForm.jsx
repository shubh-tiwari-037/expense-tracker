import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createTransactionApi } from "../apis/transactionApi";
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from "../constants/categories";

export default function QuickAddForm({ type }) {
  const isIncome = type === "income";
  const categories = isIncome ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const { mutateAsync } = useMutation({
    mutationFn: createTransactionApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });

  const onSubmit = async (form) => {
    try {
      const res = await mutateAsync({
        title: form.title,
        amount: Number(form.amount),
        category: form.category,
        type,
      });

      toast.success(res.message || "Transaction added");
      reset();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <input
        type="text"
        placeholder="Title"
        className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-2 rounded"
        {...register("title", { required: "Title is required" })}
      />
      {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}

      <input
        type="number"
        step="0.01"
        placeholder="Amount"
        className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-2 rounded"
        {...register("amount", {
          required: "Amount is required",
          min: { value: 0.01, message: "Amount must be positive" },
        })}
      />
      {errors.amount && <p className="text-red-500 text-xs">{errors.amount.message}</p>}

      <select
        className="border border-gray-300 dark:border-gray-700 p-2 rounded bg-white dark:bg-gray-800"
        {...register("category", { required: "Category is required" })}
        defaultValue=""
      >
        <option value="" disabled>
          Select Category
        </option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      {errors.category && <p className="text-red-500 text-xs">{errors.category.message}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className={`text-white py-2 rounded font-semibold disabled:bg-gray-400 ${
          isIncome ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {isSubmitting ? "Adding..." : isIncome ? "Add Income" : "Add Expense"}
      </button>
    </form>
  );
}
