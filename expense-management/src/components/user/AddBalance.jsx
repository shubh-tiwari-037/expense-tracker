// import { useState } from "react";
// import { useMutation } from "@tanstack/react-query";
// import { AddBalanceApi } from "../../apis/AddBalanceApi";

// export default function AddBalance() {
//   const [amount, setAmount] = useState("");

//   const { mutate, isPending } = useMutation({
//     mutationFn: AddBalanceApi,

//     onSuccess: (data) => {
//       console.log(data);
//       alert(data.message || "Balance Added Successfully");

//       setAmount("");
//     },

//     onError: (error) => {
//       console.log(error);

//       alert(
//         error.response?.data?.message ||
//           "Something went wrong"
//       );
//     },
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!amount) {
//       return alert("Please enter amount");
//     }

//     mutate({
//       amount: Number(amount),
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
//       <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">

//         <h2 className="text-2xl font-bold text-center mb-6">
//           Add Balance
//         </h2>

//         <form
//           onSubmit={handleSubmit}
//           className="space-y-5"
//         >
//           <div>
//             <label className="block mb-2 font-medium">
//               Amount
//             </label>

//             <input
//               type="number"
//               placeholder="Enter Amount"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={isPending}
//             className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
//           >
//             {isPending ? "Adding..." : "Add Balance"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { AddBalanceApi } from "../../apis/AddBalanceApi";

export default function AddBalance() {
  const [amount, setAmount] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: AddBalanceApi,

    onSuccess: (data) => {
      alert(data.message || "Balance Added Successfully");
      setAmount("");
    },

    onError: (error) => {
      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount) return alert("Please enter amount");

    mutate({
      amount: Number(amount),
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 px-4">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-100">

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Add Balance
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-600">
              Amount
            </label>

            <input
              type="number"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 active:scale-95 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isPending ? "Adding..." : "Add Balance"}
          </button>

        </form>

      </div>

    </div>
  );
}