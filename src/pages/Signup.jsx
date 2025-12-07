import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Signup() {
  const { signup } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErr(null);

    if (!username || !email || !password) {
      return setErr("All fields are required");
    }

    try {
      setLoading(true);
      await signup(username, email, password);
    } catch (error) {
      setErr(error?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[var(--bg-primary)]">
      
      <div className="w-full max-w-[400px] mx-4">
        <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-xl shadow-sm p-8">
          
          <div className="text-center mb-8">
             <div className="flex justify-center mb-4">
                <img src="/orbit-logo.png" alt="Orbit" className="h-10 w-10 opacity-80" /> 
             </div>
             <h1 className="text-2xl font-semibold text-[var(--text-primary)] mb-2">
                Create Account
             </h1>
          </div>

          {err && (
            <div className="mb-6 p-3 rounded bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">
              {err}
            </div>
          )}

          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-1">
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2.5 rounded bg-[var(--bg-tertiary)] border border-[var(--border-primary)] text-[var(--text-primary)] placeholder-[var(--text-tertiary)] text-sm focus:outline-none focus:border-[var(--text-secondary)] transition-colors"
                placeholder="Username"
              />
            </div>

            <div className="space-y-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 rounded bg-[var(--bg-tertiary)] border border-[var(--border-primary)] text-[var(--text-primary)] placeholder-[var(--text-tertiary)] text-sm focus:outline-none focus:border-[var(--text-secondary)] transition-colors"
                placeholder="Email address"
              />
            </div>

            <div className="space-y-1">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2.5 rounded bg-[var(--bg-tertiary)] border border-[var(--border-primary)] text-[var(--text-primary)] placeholder-[var(--text-tertiary)] text-sm focus:outline-none focus:border-[var(--text-secondary)] transition-colors"
                placeholder="Password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded bg-white text-black font-medium text-sm hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
            
            <div className="flex justify-center text-xs mt-4">
               <span className="text-[var(--text-secondary)]">Already have an account? </span>
               <a href="/login" className="ml-1 text-[var(--text-primary)] font-medium hover:underline">Sign In</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
