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
    <div
      className="
        flex items-center justify-center min-h-screen
        bg-[var(--raisin-black)] text-[var(--white)]
        px-4
      "
    >
      <div
        className="
          w-full max-w-md
          bg-[var(--dark-slate-gray)]/80 backdrop-blur-sm
          border border-[var(--spanish-orange)]/20
          rounded-2xl shadow-[0_0_25px_rgba(233,111,30,0.08)]
          p-8 sm:p-10
          transition-all duration-300
        "
      >
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-[var(--white)]">
          Welcome Back
        </h2>

        {/* Error Message */}
        {err && (
          <div
            className="
              p-3 mb-5 text-sm rounded-lg
              bg-[var(--spanish-orange)]/10
              text-[var(--spanish-orange)]
              border border-[var(--spanish-orange)]/40
            "
          >
            {err}
          </div>
        )}

        {/* Form */}
        <form onSubmit={submit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="
                w-full px-4 py-2.5 rounded-lg
                bg-[var(--raisin-black)]/60
                border border-[var(--spanish-orange)]/20
                text-[var(--white)]
                placeholder-[var(--white)]/40
                focus:outline-none focus:border-[var(--orange-peel)]
                transition-all duration-200
              "
            />
          </div>

          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="
                w-full px-4 py-2.5 rounded-lg
                bg-[var(--raisin-black)]/60
                border border-[var(--spanish-orange)]/20
                text-[var(--white)]
                placeholder-[var(--white)]/40
                focus:outline-none focus:border-[var(--orange-peel)]
                transition-all duration-200
              "
            />
          </div>

          <button
            type="submit"
            className="
              w-full py-2.5 rounded-lg font-semibold
              bg-[var(--spanish-orange)]
              text-white
              hover:bg-[var(--orange-peel)]
              hover:shadow-[0_0_10px_rgba(255,162,24,0.3)]
              transition-all duration-200
            "
          >
            Log In
          </button>
        </form>

        {/* Divider */}
        <div className="mt-6 flex items-center justify-center">
          <span className="text-[var(--white)]/50 text-sm">
            or continue with
          </span>
        </div>

        {/* Google Login */}
        <div className="mt-4 flex justify-center">
          <GoogleLogin
            onSuccess={(cred) => googleLogin(cred.credential)}
            onError={() => setErr("Google Login Failed")}
          />
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-[var(--white)]/60">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-[var(--orange-peel)] hover:text-[var(--spanish-orange)] font-medium transition"
          >
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}
