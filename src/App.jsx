import React, { useContext } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

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
import ContestArena from "./pages/contest/ContestArena";
import ContestLeaderboard from "./pages/contest/ContestLeaderboard";
import ComingSoon from "./pages/ComingSoon";
import Notebook from "./pages/Notebook";
import MyLists from "./pages/MyLists";
import Store from "./pages/Store";

import Premium from "./pages/Premium";

function PrivateRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[var(--brand-orange)]"></div>
      </div>
    );
  }
  
  return user ? children : <Navigate to="/login" replace />;
}

import Footer from "./components/Footer";

import { Toaster } from "react-hot-toast";
import ProblemList from "./pages/ProblemList";

import Discuss from "./pages/Discuss";

import Profile from "./pages/Profile";

export default function App() {
  const { user, loading } = useContext(AuthContext);
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <Toaster position="top-center" reverseOrder={false} />
      {!useLocation().pathname.includes("/arena") && <Header />}

      <Routes>
        <Route 
          path="/" 
          element={
            loading ? (
              <div className="flex-1 flex items-center justify-center bg-[var(--bg-primary)]">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[var(--brand-orange)]"></div>
              </div>
            ) : user ? (
              <Navigate to="/problems" replace />
            ) : (
              <Home />
            )
          } 
        />
        <Route path="/problems" element={<ProblemList />} />
        <Route path="/daily" element={<DailyProblem />} />
        <Route path="/problems/:id" element={<ProblemDetail />} />

        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="/contests" element={<ContestList />} />
        <Route path="/contest/:contestId" element={<ContestDetail />} />
        <Route
          path="/contest/:contestId/leaderboard"
          element={<ContestLeaderboard />}
        />
        <Route 
          path="/contest/:contestId/arena"
          element={
            <PrivateRoute>
              <ContestArena />
            </PrivateRoute>
          }
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

        <Route path="/list" element={<MyLists />} />
        <Route path="/notebook" element={<Notebook />} />
        <Route path="/progress" element={<ComingSoon title="Progress" />} />
        <Route path="/points" element={<ComingSoon title="Points" />} />
        <Route path="/features" element={<ComingSoon title="New Features" />} />
        <Route path="/orders" element={<ComingSoon title="Orders" />} />
        <Route path="/playgrounds" element={<ComingSoon title="My Playgrounds" />} />
        <Route path="/settings" element={<ComingSoon title="Settings" />} />
        <Route path="/store" element={<Store />} />
        <Route path="/discuss" element={<Discuss />} />
        <Route path="/quest" element={<ComingSoon title="Quest" />} />
        <Route path="/study-plan" element={<ComingSoon title="Study Plan" />} />
        <Route path="/favorites" element={<ComingSoon title="Favorites" />} />
        <Route path="/premium" element={<Premium />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>

      {!useLocation().pathname.includes("/arena") && !useLocation().pathname.startsWith("/problems") && <Footer />}
    </div>
  );
}
