import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function AdminRoute() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#1A1A1A] text-white">Loading...</div>;
  }

  if (!user || !user.roles.includes('admin')) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
