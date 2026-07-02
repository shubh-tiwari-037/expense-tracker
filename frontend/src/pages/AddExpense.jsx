import QuickAddForm from "../components/QuickAddForm";

export default function AddExpense() {
  return (
    <div className="min-h-[calc(100vh-56px)] flex items-center justify-center bg-gray-100 dark:bg-gray-950 px-4">
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-100 dark:border-gray-800">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Add Expense</h2>
        <QuickAddForm type="expense" />
      </div>
    </div>
  );
}
