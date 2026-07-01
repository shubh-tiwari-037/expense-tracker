// import { useState } from "react";
// import { useMutation } from "@tanstack/react-query";
// import { AddExpenseApi } from "../apis/AddExpenseApi";

// export default function AddExpense() {
//   const [form, setForm] = useState({
//     title: "",
//     amount: "",
//     category: "",
//   });

//   const { mutate, isPending } = useMutation({
//     mutationFn: AddExpenseApi,

//     onSuccess: (data) => {
//       console.log(data);
//       alert(data.message || "Expense Added Successfully");

//       setForm({
//         title: "",
//         amount: "",
//         category: "",
//       });
//     },

//     onError: (error) => {
//       console.log(error);
//       alert(
//         error.response?.data?.message ||
//           "Something went wrong"
//       );
//     },
//   });

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!form.title || !form.amount || !form.category) {
//       return alert("All fields are required");
//     }

//     mutate({
//       title: form.title,
//       amount: Number(form.amount),
//       category: form.category,
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
//       <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">

//         <h2 className="text-2xl font-bold text-center mb-6">
//           Add Expense
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">

//           {/* Title */}
//           <div>
//             <label className="block mb-2 font-medium">
//               Title
//             </label>

//             <input
//               type="text"
//               name="title"
//               placeholder="Enter Title"
//               value={form.title}
//               onChange={handleChange}
//               className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
//             />
//           </div>

//           {/* Amount */}
//           <div>
//             <label className="block mb-2 font-medium">
//               Amount
//             </label>

//             <input
//               type="number"
//               name="amount"
//               placeholder="Enter Amount"
//               value={form.amount}
//               onChange={handleChange}
//               className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
//             />
//           </div>

//           {/* Category */}
//           <div>
//             <label className="block mb-2 font-medium">
//               Category
//             </label>

//             <input
//               type="text"
//               name="category"
//               placeholder="Enter Category"
//               value={form.category}
//               onChange={handleChange}
//               className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={isPending}
//             className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
//           >
//             {isPending ? "Adding..." : "Add Expense"}
//           </button>

//         </form>
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { AddExpenseApi } from "../../apis/AddExpence.js";

export default function AddExpense() {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
  });

  const categories = [
    "Salary",
    "Food",
    "Rent",
    "Shopping",
    "Travel",
    "Other",
  ];

  const { mutate, isPending } = useMutation({
    mutationFn: AddExpenseApi,

    onSuccess: (data) => {
      console.log(data);
      alert(data.message || "Expense Added Successfully");

      setForm({
        title: "",
        amount: "",
        category: "",
      });
    },

    onError: (error) => {
      console.log(error);
      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    },
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.amount || !form.category) {
      return alert("All fields are required");
    }

    mutate({
      title: form.title,
      amount: Number(form.amount),
      category: form.category,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-6">
          Add Expense
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Title */}
          <div>
            <label className="block mb-2 font-medium">
              Title
            </label>

            <input
              type="text"
              name="title"
              placeholder="Enter Title"
              value={form.title}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block mb-2 font-medium">
              Amount
            </label>

            <input
              type="number"
              name="amount"
              placeholder="Enter Amount"
              value={form.amount}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Category (FIXED - Dropdown) */}
          <div>
            <label className="block mb-2 font-medium">
              Category
            </label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none bg-white"
            >
              <option value="">Select Category</option>

              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
          >
            {isPending ? "Adding..." : "Add Expense"}
          </button>

        </form>
      </div>
    </div>
  );
}