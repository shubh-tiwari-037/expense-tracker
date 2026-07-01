

// export default function Home() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-xl shadow-md text-center w-full max-w-md">
        
//         <h1 className="text-2xl font-bold mb-2">
//           💰 Expense App
//         </h1>

//         <p className="text-gray-600 mb-4">
//           Welcome to Expense Management System
//         </p>

//         <div className="flex flex-col gap-3">
//           <button className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
//             Add Balance
//           </button>

//           <button className="bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
//             Add Expense
//           </button>

//           <button className="bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-800">
//             View History
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }

import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-md text-center w-full max-w-md">

        <h1 className="text-2xl font-bold mb-2">
          💰 Expense App
        </h1>

        <p className="text-gray-600 mb-4">
          Welcome to Expense Management System
        </p>

        <div className="flex flex-col gap-3">

          {/* Add Balance */}
          <Link to="/add-balance">
            <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
              Add Balance
            </button>
          </Link>

          {/* Add Expense */}
          <Link to="/add-expense">
            <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
              Add Expense
            </button>
          </Link>

          {/* History */}
          <Link to="/history">
            <button className="w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-800">
              View History
            </button>
          </Link>

        </div>

      </div>

    </div>
  );
}