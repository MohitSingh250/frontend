import React, { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

export default function DailyProblem() {
  const [p, setP] = useState(null);

  useEffect(() => {
    api
      .get("/problems/daily-problem")
      .then((r) => setP(r.data))
      .catch(() => {});
  }, []);

  if (!p)
    return (
      <div className="flex justify-center items-center h-64 text-[var(--white)]/50">
        Loading Daily Problem...
      </div>
    );

  const difficultyStyle = {
    easy: "text-[var(--dark-pastel-green)] bg-[var(--dark-pastel-green)]/10 border border-[var(--dark-pastel-green)]/30",
    medium: "text-[var(--orange-peel)] bg-[var(--orange-peel)]/10 border border-[var(--orange-peel)]/30",
    hard: "text-[var(--spanish-orange)] bg-[var(--spanish-orange)]/10 border border-[var(--spanish-orange)]/30",
  }[p.difficulty?.toLowerCase()] || "text-[var(--white)]/70 bg-[var(--dark-slate-gray)]/40 border border-[var(--dark-slate-gray)]/30";

  return (
    <div className="min-h-[60vh] bg-gradient-to-b from-[var(--raisin-black)] to-[var(--dark-slate-gray)] text-[var(--white)] p-8 flex justify-center">
      <div className="max-w-3xl w-full bg-[var(--dark-slate-gray)]/80 backdrop-blur-md rounded-2xl shadow-xl border border-[var(--dark-pastel-green)]/15 p-8 transition-all hover:border-[var(--dark-pastel-green)]/40 hover:shadow-[0_0_20px_rgba(44,188,93,0.15)]">
        {/* 🌟 Header */}
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2 text-[var(--white)]">
          🌟 Daily Problem
        </h1>

        {/* Problem Details */}
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-[var(--white)]">
              {p.title}
            </h2>
            <span
              className={`inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full ${difficultyStyle}`}
            >
              {p.difficulty.toUpperCase()}
            </span>
          </div>

          <p className="text-[var(--white)]/70 leading-relaxed text-sm">
            {p.statement?.slice?.(0, 280)}...
          </p>

          {/* CTA Button */}
          <div className="pt-3">
            <Link
              to={`/problems/${p._id}`}
              className="
                inline-block px-6 py-2.5 
                bg-gradient-to-r from-[var(--dark-pastel-green)] to-[var(--aqua)] 
                text-[var(--white)] font-medium rounded-full
                shadow-[0_0_12px_rgba(44,188,93,0.25)] 
                hover:shadow-[0_0_18px_rgba(27,187,186,0.45)] 
                hover:scale-105 transition-all duration-300
              "
            >
              Solve Now →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
