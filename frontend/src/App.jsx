import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./context/AuthContext";
import ThemeProvider from "./context/ThemeContext";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import AddBalance from "./pages/AddBalance";
import AddExpense from "./pages/AddExpense";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminTransactions from "./pages/admin/AdminTransactions";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Toaster position="top-right" />

          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/add-balance" element={<AddBalance />} />
                <Route path="/add-expense" element={<AddExpense />} />
                <Route path="/history" element={<History />} />
                <Route path="/profile" element={<Profile />} />
              </Route>

              <Route element={<AdminRoute />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/transactions" element={<AdminTransactions />} />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
