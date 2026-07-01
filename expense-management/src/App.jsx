import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/user/Navbar";

import Login from "./components/user/login";
import Signup from "./components/user//signup";
import History from "./components/user//History";
import AddBalance from "./components/user//AddBalance";
import AddExpense from "./components/user//AddExpense";
import Home from "./components/user/Home";


export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add-balance" element={<AddBalance />} />
        <Route path="/add-expense" element={<AddExpense />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}