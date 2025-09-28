import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className='h-3em w-100%'>
          <Link to="/" className="w-12 h-12"><img src="." alt="logo" /></Link>
        </div>

        <nav className="flex items-center space-x-4">
          <Link to="/contests" className="text-sm">Contests</Link>
          <Link to="/daily" className="text-sm">Daily</Link>
          <Link to="/" className="text-sm">Problems</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="text-sm">{user.username}</Link>
              <button onClick={logout} className="text-sm text-red-600">Logout</button>
              {user.roles && user.roles.includes('admin') && (
                <Link to="/admin/create-problem" className="text-sm text-indigo-600">Admin</Link>
              )}
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm">Login</Link>
              <Link to="/signup" className="text-sm">Signup</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
