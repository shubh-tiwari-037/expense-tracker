import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import useTheme from "../hooks/useTheme";

export default function Navbar() {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <nav className="flex justify-between items-center px-6 py-3 bg-gray-900 text-white">
      <Link to="/" className="text-xl font-bold">
        ExpenseApp
      </Link>

      <div className="flex gap-5 items-center">
        <button
          onClick={toggleTheme}
          className="text-sm px-2 py-1 rounded hover:bg-gray-800"
          title="Toggle dark mode"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

        {!isAuthenticated ? (
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
            <Link className="hover:text-gray-300" to="/">
              Dashboard
            </Link>
            <Link className="hover:text-gray-300" to="/history">
              History
            </Link>
            {isAdmin && (
              <Link className="hover:text-gray-300" to="/admin">
                Admin
              </Link>
            )}
            <Link className="hover:text-gray-300" to="/profile">
              {user?.fullName}
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 text-sm"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
