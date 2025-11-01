import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Signup() {
  const { signup } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErr(null);

    if (!username || !email || !password) {
      return setErr('All fields are required');
    }

    try {
      setLoading(true);
      await signup(username, email, password);
    } catch (error) {
      setErr(error?.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0f0f0f] text-gray-200">
      <div className="w-full max-w-md bg-[#1a1a1a] p-8 rounded-xl shadow-lg border border-[#2f2f2f]">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Create Account</h2>

        {err && (
          <div className="p-3 mb-4 text-sm font-medium rounded bg-red-900/30 text-red-400 border border-red-700">
            {err}
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full px-4 py-2 bg-[#0f0f0f] border border-[#2f2f2f] rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-2 bg-[#0f0f0f] border border-[#2f2f2f] rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 bg-[#0f0f0f] border border-[#2f2f2f] rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition"
          />

          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Signup'}
          </button>
        </form>
      </div>
    </div>
  );
}
