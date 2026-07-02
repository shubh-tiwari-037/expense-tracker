import QuickAddForm from "../components/QuickAddForm";

export default function AddBalance() {
  return (
    <div className="min-h-[calc(100vh-56px)] flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 px-4">
      <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-100 dark:border-gray-800">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Add Income</h2>
        <QuickAddForm type="income" />
      </div>
    </div>
  );
}
