import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import UserProvider from "./context/usercontext";
import Login from "./pages/auth/login";
import Signin from "./pages/auth/signin";
import Home from "./pages/dashboard/home";
import Income from "./pages/dashboard/income";
import Expense from "./pages/dashboard/expense";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Toaster />
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signin />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/dashboard/income" element={<Income />} />
          <Route path="/dashboard/expense" element={<Expense />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
