import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getWalletSummaryApi } from "../apis/walletApi";
import { getTransactionsApi } from "../apis/transactionApi";
import StatCard from "../components/StatCard";
import IncomeExpenseChart from "../components/IncomeExpenseChart";
import QuickAddForm from "../components/QuickAddForm";
import useAuth from "../hooks/useAuth";

export default function Dashboard() {
  const { user } = useAuth();
  const [quickAddType, setQuickAddType] = useState(null);

  const { data: walletData, isLoading: walletLoading } = useQuery({
    queryKey: ["wallet"],
    queryFn: getWalletSummaryApi,
  });

  const { data: txData, isLoading: txLoading } = useQuery({
    queryKey: ["transactions", "recent"],
    queryFn: () => getTransactionsApi({ limit: 5, sort: "newest" }),
  });

  const wallet = walletData?.wallet;
  const transactions = txData?.transactions || [];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        Welcome back{user?.fullName ? `, ${user.fullName}` : ""} 👋
      </h1>

      {walletLoading ? (
        <p className="text-gray-500 dark:text-gray-400">Loading wallet...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard label="Current Balance" value={wallet?.currentBalance} colorClass="text-blue-600" />
          <StatCard label="Total Income" value={wallet?.totalIncome} colorClass="text-green-600" />
          <StatCard label="Total Expense" value={wallet?.totalExpense} colorClass="text-red-600" />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg">Recent Activity</h2>
            <Link to="/history" className="text-blue-500 text-sm hover:underline">
              View all
            </Link>
          </div>

          {txLoading ? (
            <p className="text-gray-500 dark:text-gray-400 text-sm">Loading...</p>
          ) : transactions.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-sm">No transactions yet</p>
          ) : (
            <ul className="divide-y">
              {transactions.map((t) => (
                <li key={t._id} className="py-3 flex justify-between items-center">
                  <div>
                    <p className="font-medium">{t.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t.category}</p>
                  </div>
                  <p className={t.type === "expense" ? "text-red-500 font-semibold" : "text-green-600 font-semibold"}>
                    {t.type === "expense" ? "-" : "+"}₹{t.amount}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5">
          <h2 className="font-semibold text-lg mb-2">Income vs Expense</h2>
          <IncomeExpenseChart totalIncome={wallet?.totalIncome} totalExpense={wallet?.totalExpense} />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5">
        <h2 className="font-semibold text-lg mb-4">Quick Add</h2>

        <div className="flex gap-3 mb-4">
          <button
            onClick={() => setQuickAddType(quickAddType === "income" ? null : "income")}
            className={`px-4 py-2 rounded-lg font-medium ${
              quickAddType === "income" ? "bg-blue-700 text-white" : "bg-blue-100 text-blue-700"
            }`}
          >
            + Income
          </button>
          <button
            onClick={() => setQuickAddType(quickAddType === "expense" ? null : "expense")}
            className={`px-4 py-2 rounded-lg font-medium ${
              quickAddType === "expense" ? "bg-green-700 text-white" : "bg-green-100 text-green-700"
            }`}
          >
            + Expense
          </button>
        </div>

        {quickAddType && (
          <div className="max-w-sm">
            <QuickAddForm type={quickAddType} />
          </div>
        )}
      </div>
    </div>
  );
}
