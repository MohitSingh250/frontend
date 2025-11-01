import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="bg-[#1a1a1a] border-b border-neutral-800 shadow-lg text-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-md flex items-center justify-center text-black font-bold">
              <img src="orbits.png" alt="logo" />
            </div>
            <span className="text-lg font-semibold tracking-wide text-white">Orbit</span>
          </Link>
        </div>

        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link to="/contests" className="hover:text-blue-400 transition">Contests</Link>
          <Link to="/" className="hover:text-blue-400 transition">Problems</Link>

          {user ? (
            <>
              <Link to="/dashboard" className="text-gray-300 hover:text-blue-400 transition">
                {user.username}
              </Link>
              {user.roles?.includes('admin') && (
                <Link
                  to="/admin/create-problem"
                  className="text-amber-400 hover:text-amber-300 transition"
                >
                  Admin
                </Link>
              )}
              <button
                onClick={logout}
                className="text-red-400 hover:text-red-300 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-400 transition">Login</Link>
              <Link
                to="/signup"
                className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-md transition"
              >
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
