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
import AdminRoute from "./components/AdminRoute";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";
import ProblemManagement from "./pages/admin/ProblemManagement";
import CreateProblem from "./pages/admin/CreateProblem";
import EditProblem from "./pages/admin/EditProblem";
import ContestManagement from "./pages/admin/ContestManagement";
import CreateContest from "./pages/admin/CreateContest";
import EditContest from "./pages/admin/EditContest";
import ContestProblemManagement from "./pages/admin/ContestProblemManagement";
import CreateContestProblem from "./pages/admin/CreateContestProblem";
import AddContestProblem from "./pages/admin/AddContestProblem";
import EditContestProblem from "./pages/admin/EditContestProblem";
import DiscussionModeration from "./pages/admin/DiscussionModeration";

import ContestList from "./pages/contest/ContestList";
import ContestDetail from "./pages/contest/ContestDetail";
import ContestArena from "./pages/contest/ContestArena";
import ContestLeaderboard from "./pages/contest/ContestLeaderboard";
import GlobalLeaderboard from "./pages/contest/GlobalLeaderboard";
import ComingSoon from "./pages/ComingSoon";
import Notebook from "./pages/Notebook";
import MyLists from "./pages/MyLists";
import Store from "./pages/Store";
import Quest from "./pages/Quest/Quest";
import QuestDetail from "./pages/Quest/QuestDetail";

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

        <Route path="/admin" element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="problems" element={<ProblemManagement />} />
            <Route path="problems/create" element={<CreateProblem />} />
            <Route path="problems/edit/:id" element={<EditProblem />} />
            <Route path="contests" element={<ContestManagement />} />
            <Route path="contests/create" element={<CreateContest />} />
            <Route path="contests/edit/:id" element={<EditContest />} />
            <Route path="contests/:contestId/problems" element={<ContestProblemManagement />} />
            <Route path="contests/problems/add" element={<AddContestProblem />} />
            <Route path="contests/:contestId/problems/create" element={<CreateContestProblem />} />
            <Route path="contests/:contestId/problems/edit/:problemId" element={<EditContestProblem />} />
            <Route path="discussions" element={<DiscussionModeration />} />
          </Route>
        </Route>

        <Route path="/contests" element={<ContestList />} />
        <Route path="/contest/:contestId" element={<ContestDetail />} />
        <Route
          path="/contest/:contestId/leaderboard"
          element={<ContestLeaderboard />}
        />
        <Route path="/leaderboard" element={<GlobalLeaderboard />} />
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
        <Route path="/quest" element={<Quest />} />
        <Route path="/quest/:id" element={<QuestDetail />} />
        <Route path="/study-plan" element={<ComingSoon title="Study Plan" />} />
        <Route path="/favorites" element={<ComingSoon title="Favorites" />} />
        <Route path="/premium" element={<Premium />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>

      {!useLocation().pathname.includes("/arena") && 
       !useLocation().pathname.startsWith("/problems") && 
       !useLocation().pathname.startsWith("/admin") && 
       !useLocation().pathname.startsWith("/login") && 
       !useLocation().pathname.startsWith("/signup") && 
       <Footer />}
    </div>
  );
}
