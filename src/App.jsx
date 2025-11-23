import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import DailyProblem from "./pages/DailyProblem";
import ProblemDetail from "./pages/ProblemDetail";

import { AuthContext } from "./context/AuthContext";
import AdminDashboard from "./admin/AdminDashboard";

import ContestList from "./pages/contest/ContestList";
import ContestDetail from "./pages/contest/ContestDetail";
import ContestProblem from "./pages/contest/ContestProblem";
import ContestLeaderboard from "./pages/contest/ContestLeaderboard";

function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--raisin-black)] text-white">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/daily" element={<DailyProblem />} />
        <Route path="/problems/:id" element={<ProblemDetail />} />

        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="/contests" element={<ContestList />} />
        <Route path="/contest/:contestId" element={<ContestDetail />} />

        <Route
          path="/contest/:contestId/arena"
          element={
            <PrivateRoute>
              <ContestProblem />
            </PrivateRoute>
          }
        />

        <Route
          path="/contest/:contestId/leaderboard"
          element={<ContestLeaderboard />}
        />

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
      </Routes>
    </div>
  );
}
