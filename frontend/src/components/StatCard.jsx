export default function StatCard({ label, value, colorClass }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5">
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <p className={`text-2xl font-bold mt-1 ${colorClass}`}>
        ₹{Number(value || 0).toLocaleString()}
      </p>
    </div>
  );
}
