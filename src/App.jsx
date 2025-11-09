import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProblemDetail from "./pages/ProblemDetail";
import Dashboard from "./pages/Dashboard";
import DailyProblem from "./pages/DailyProblem";
import Contests from "./pages/Contest";
import AdminCreateProblem from "./pages/AdminCreateProblem";
import { AuthContext } from "./context/AuthContext";

/* 🔒 Private Route */
function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" replace />;
}

/* 🪐 Orbit App Layout (Full Screen, Compact Padding) */
export default function App() {
  return (
    <div
      className="
        min-h-screen flex flex-col
        bg-[var(--raisin-black)]
        text-[var(--white)]
        transition-colors duration-300
        selection:bg-[var(--dark-pastel-green)]/50
        overflow-x-hidden
      "
    >
      {/* Header */}
      <Header />

      {/* Main Content - full width, minimal padding */}
      <main
        className="
          flex-1 w-full
          bg-[var(--gradient-surface)]
          text-[var(--white)]
          px-2 sm:px-3 md:px-4 lg:px-6
          py-4 sm:py-6 md:py-8
          transition-all duration-300
        "
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/daily" element={<DailyProblem />} />
          <Route path="/contests" element={<Contests />} />
          <Route path="/problems/:id" element={<ProblemDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/create-problem"
            element={
              <PrivateRoute>
                <AdminCreateProblem />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
