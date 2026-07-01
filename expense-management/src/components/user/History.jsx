import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { GetTransactionsApi } from "../../apis/GetTransication.js";


// export default function History() {
//   const { id } = useParams();

//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["transaction"],
//     queryFn: () => GetTransactionsApi(),
//   });

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Loading...
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-red-500">
//         Error fetching transaction
//       </div>
//     );
//   }

//   const transaction = data?.transaction;

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

//       <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">

//         <h1 className="text-2xl font-bold text-center mb-6">
//           📄 Transaction Details
//         </h1>

//         <div className="space-y-4 text-center">

//           <p>
//             <span className="font-semibold">Title:</span>{" "}
//             {transaction?.title}
//           </p>

//           <p>
//             <span className="font-semibold">Category:</span>{" "}
//             {transaction?.category}
//           </p>

//           <p>
//             <span className="font-semibold">Amount:</span>{" "}
//             <span
//               className={
//                 transaction?.type === "expense"
//                   ? "text-red-500 font-bold"
//                   : "text-green-600 font-bold"
//               }
//             >
//               ₹ {transaction?.amount}
//             </span>
//           </p>

//           <p>
//             <span className="font-semibold">Type:</span>{" "}
//             {transaction?.type}
//           </p>

//           <p className="text-gray-500 text-sm">
//             ID: {transaction?._id}
//           </p>

//         </div>

//       </div>
//     </div>
//   );
// }




export default function History() {

  const { data, isLoading, isError } = useQuery({
    queryKey: ["transaction"],
    queryFn: GetTransactionsApi,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Error fetching transaction
      </div>
    );
  }

  const transactions = data?.transactions || [];

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-2xl font-bold text-center mb-6">
        📜 Transaction History
      </h1>

      <div className="max-w-2xl mx-auto space-y-4">

        {transactions.length === 0 ? (
          <p className="text-center text-gray-500">
            No transactions found
          </p>
        ) : (
          transactions.map((t) => (
            <div
              key={t._id}
              className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{t.title}</p>
                <p className="text-sm text-gray-500">{t.category}</p>
              </div>

              <div>
                <p
                  className={
                    t.type === "expense"
                      ? "text-red-500 font-bold"
                      : "text-green-600 font-bold"
                  }
                >
                  ₹{t.amount}
                </p>
              </div>
            </div>
          ))
        )}

      </div>

    </div>
  );
}