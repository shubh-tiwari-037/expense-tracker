import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getTransactionsApi, deleteTransactionApi, exportTransactionsCsvApi } from "../apis/transactionApi";
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from "../constants/categories";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "highest", label: "Highest Amount" },
  { value: "lowest", label: "Lowest Amount" },
];

export default function History() {
  const queryClient = useQueryClient();

  const [filters, setFilters] = useState({
    search: "",
    type: "",
    category: "",
    sort: "newest",
    page: 1,
    limit: 10,
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["transactions", filters],
    queryFn: () => getTransactionsApi(filters),
  });

  const { mutate: removeTransaction, isPending: isDeleting } = useMutation({
    mutationFn: deleteTransactionApi,
    onSuccess: (res) => {
      toast.success(res.message || "Transaction deleted");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to delete transaction");
    },
  });

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: key === "page" ? value : 1 }));
  };

  const handleExport = async () => {
    try {
      const blob = await exportTransactionsCsvApi();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "transactions.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch {
      toast.error("Failed to export transactions");
    }
  };

  const categories = [...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES].filter(
    (c, i, arr) => arr.indexOf(c) === i
  );

  const transactions = data?.transactions || [];
  const pagination = data?.pagination;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">📜 Transaction History</h1>
        <button
          onClick={handleExport}
          className="text-sm bg-gray-800 dark:bg-gray-700 text-white px-3 py-2 rounded hover:bg-gray-900"
        >
          Export CSV
        </button>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-4 mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <input
          type="text"
          placeholder="Search title..."
          value={filters.search}
          onChange={(e) => updateFilter("search", e.target.value)}
          className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-2 rounded"
        />

        <select
          value={filters.type}
          onChange={(e) => updateFilter("type", e.target.value)}
          className="border p-2 rounded bg-white dark:bg-gray-900"
        >
          <option value="">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          value={filters.category}
          onChange={(e) => updateFilter("category", e.target.value)}
          className="border p-2 rounded bg-white dark:bg-gray-900"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={filters.sort}
          onChange={(e) => updateFilter("sort", e.target.value)}
          className="border p-2 rounded bg-white dark:bg-gray-900"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <p className="text-center text-gray-500 dark:text-gray-400">Loading...</p>
      ) : isError ? (
        <p className="text-center text-red-500">Error fetching transactions</p>
      ) : transactions.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">No transactions found</p>
      ) : (
        <div className="space-y-3">
          {transactions.map((t) => (
            <div
              key={t._id}
              className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{t.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t.category} · {new Date(t.transactionDate).toLocaleDateString()}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <p className={t.type === "expense" ? "text-red-500 font-bold" : "text-green-600 font-bold"}>
                  {t.type === "expense" ? "-" : "+"}₹{t.amount}
                </p>

                <button
                  onClick={() => removeTransaction(t._id)}
                  disabled={isDeleting}
                  className="text-sm text-red-500 hover:underline disabled:text-gray-400"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            disabled={pagination.page <= 1}
            onClick={() => updateFilter("page", pagination.page - 1)}
            className="px-3 py-1 rounded border disabled:opacity-40"
          >
            Prev
          </button>
          <span className="text-sm text-gray-600">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <button
            disabled={pagination.page >= pagination.totalPages}
            onClick={() => updateFilter("page", pagination.page + 1)}
            className="px-3 py-1 rounded border disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
