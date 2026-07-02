import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#16a34a", "#dc2626"];

export default function IncomeExpenseChart({ totalIncome, totalExpense }) {
  const data = [
    { name: "Income", value: totalIncome || 0 },
    { name: "Expense", value: totalExpense || 0 },
  ];

  if (!totalIncome && !totalExpense) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-400 text-sm">
        No data to display yet
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={4}>
          {data.map((entry, index) => (
            <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `₹${Number(value).toLocaleString()}`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
