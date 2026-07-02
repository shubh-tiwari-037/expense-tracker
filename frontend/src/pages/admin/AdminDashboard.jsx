import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getDashboardStatsApi } from "../../apis/adminApi";
import StatCard from "../../components/StatCard";

export default function AdminDashboard() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin", "stats"],
    queryFn: getDashboardStatsApi,
  });

  const stats = data?.stats;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <div className="flex gap-4 text-sm">
        <Link to="/admin/users" className="text-blue-500 hover:underline">
          Manage Users
        </Link>
        <Link to="/admin/transactions" className="text-blue-500 hover:underline">
          Manage Transactions
        </Link>
      </div>

      {isLoading ? (
        <p className="text-gray-500 dark:text-gray-400">Loading stats...</p>
      ) : isError ? (
        <p className="text-red-500">Failed to load dashboard stats</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Users" value={stats?.totalUsers} colorClass="text-gray-800" />
          <StatCard label="Total Transactions" value={stats?.totalTransactions} colorClass="text-gray-800" />
          <StatCard label="Total Income" value={stats?.totalIncome} colorClass="text-green-600" />
          <StatCard label="Total Expense" value={stats?.totalExpense} colorClass="text-red-600" />
        </div>
      )}
    </div>
  );
}
