import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";

export default function Login() {
  const { login, googleLogin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setErr(null);
    try {
      await login(email, password);
    } catch (e) {
      setErr(e?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[var(--bg-primary)]">
      
      <div className="w-full max-w-[400px] mx-4">
        <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-xl shadow-sm p-8">
          
          <div className="text-center mb-8">
             <div className="flex justify-center mb-4">
                <img src="/orbit.png" alt="Orbit" className="h-10 w-10 opacity-100" /> 
             </div>
             <h1 className="text-2xl font-semibold text-[var(--text-primary)] mb-2">
                Sign in
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
              className="w-full py-2.5 rounded bg-[var(--brand-orange)] text-white font-medium text-sm hover:bg-[var(--brand-orange-hover)] transition-colors shadow-lg shadow-[var(--brand-orange)]/20"
            >
              Sign In
            </button>
            
            <div className="flex justify-between items-center text-xs">
               <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Forgot Password?</a>
               <a href="/signup" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Sign Up</a>
            </div>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--border-secondary)]"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-[var(--bg-secondary)] px-2 text-[var(--text-tertiary)]">or</span>
            </div>
          </div>

          <div className="flex justify-center">
             <GoogleLogin
               onSuccess={(cred) => googleLogin(cred.credential)}
               onError={() => setErr("Google Login Failed")}
               theme={document.documentElement.getAttribute("data-theme") === "dark" ? "filled_black" : "outline"}
               shape="circle"
             />
          </div>
        </div>
      </div>
    </div>
  );
}
