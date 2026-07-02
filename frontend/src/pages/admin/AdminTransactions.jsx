import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getAllTransactionsAdminApi, deleteTransactionAdminApi } from "../../apis/adminApi";

export default function AdminTransactions() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin", "transactions"],
    queryFn: getAllTransactionsAdminApi,
  });

  const { mutate: removeTransaction, isPending } = useMutation({
    mutationFn: deleteTransactionAdminApi,
    onSuccess: (res) => {
      toast.success(res.message || "Transaction deleted");
      queryClient.invalidateQueries({ queryKey: ["admin", "transactions"] });
    },
    onError: (err) => toast.error(err.response?.data?.message || "Failed to delete transaction"),
  });

  const transactions = data?.transactions || [];

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">All Transactions</h1>

      {isLoading ? (
        <p className="text-gray-500 dark:text-gray-400">Loading...</p>
      ) : isError ? (
        <p className="text-red-500">Failed to load transactions</p>
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow divide-y dark:divide-gray-800">
          {transactions.map((t) => (
            <div key={t._id} className="p-4 flex justify-between items-center">
              <div>
                <p className="font-semibold">{t.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t.user?.fullName} ({t.user?.email}) · {t.category}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <p className={t.type === "expense" ? "text-red-500 font-bold" : "text-green-600 font-bold"}>
                  {t.type === "expense" ? "-" : "+"}₹{t.amount}
                </p>
                <button
                  onClick={() => removeTransaction(t._id)}
                  disabled={isPending}
                  className="text-sm text-red-500 hover:underline disabled:text-gray-400"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
