import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProblemDetail from './pages/ProblemDetail';
import Dashboard from './pages/Dashboard';
import DailyProblem from './pages/DailyProblem';

import AdminCreateProblem from './pages/AdminCreateProblem';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" />;
  return children;
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />


        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/daily" element={<DailyProblem />} />
          <Route path="/problems/:id" element={<ProblemDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/admin/create-problem" element={<PrivateRoute><AdminCreateProblem /></PrivateRoute>} />
        </Routes>

    </div>
  );
}