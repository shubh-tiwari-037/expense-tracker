import { Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function Navbar() {
  const token = Cookies.get("accessToken");

  return (
    <nav className="flex justify-between items-center px-6 py-3 bg-gray-900 text-white">
      
      <h2 className="text-xl font-bold">ExpenseApp</h2>

      <div className="flex gap-5 items-center">
        <Link className="hover:text-gray-300" to="/">
          Home
        </Link>

        {!token ? (
          <>
            <Link className="hover:text-gray-300" to="/login">
              Login
            </Link>
            <Link className="hover:text-gray-300" to="/signup">
              Signup
            </Link>
          </>
        ) : (
          <>
            <Link className="hover:text-gray-300" to="/add-balance">
              Add Balance
            </Link>

            <Link className="hover:text-gray-300" to="/add-expense">
              Add Expense
            </Link>

            <Link className="hover:text-gray-300" to="/history">
              History
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}