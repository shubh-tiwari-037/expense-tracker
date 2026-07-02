import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 dark:text-gray-100 transition-colors">
      <Navbar />
      <Outlet />
    </div>
  );
}
