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
          bg-[var(--dark-slate-gray)]/80 backdrop-blur-md
          border border-[var(--spanish-orange)]/20
          rounded-2xl shadow-[0_0_25px_rgba(233,111,30,0.08)]
          p-8 sm:p-10
          transition-all duration-300
        "
      >
        {/* Header */}
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-[var(--white)]">
          Create Account
        </h2>
        <p className="text-sm text-center text-[var(--white)]/60 mb-6">
          Start your JEE Physics problem-solving journey 🚀
        </p>

        {/* Error */}
        {err && (
          <div
            className="
              p-3 mb-5 text-sm font-medium rounded-lg
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
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
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
          <input
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

          <button
            type="submit"
            disabled={loading}
            className="
              w-full py-2.5 rounded-lg font-semibold
              bg-[var(--spanish-orange)]
              text-white
              hover:bg-[var(--orange-peel)]
              hover:shadow-[0_0_10px_rgba(255,162,24,0.3)]
              transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-[var(--white)]/60">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-[var(--orange-peel)] hover:text-[var(--spanish-orange)] font-medium transition"
          >
            Log in
          </a>
        </div>
      </div>
    </div>
  );
}
