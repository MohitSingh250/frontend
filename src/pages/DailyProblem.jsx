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
      <div className="flex justify-center items-center h-64 text-gray-400">
        Loading Daily Problem...
      </div>
    );

  const difficultyColor = {
    easy: "text-green-400 bg-green-400/10",
    medium: "text-yellow-400 bg-yellow-400/10",
    hard: "text-red-400 bg-red-400/10",
  }[p.difficulty] || "text-gray-400 bg-gray-400/10";

  return (
    <div className="min-h-[60vh] bg-gradient-to-b from-[#0F111A] to-[#12141F] text-gray-100 p-8 flex justify-center">
      <div className="max-w-3xl w-full bg-[#1A1C24]/80 backdrop-blur-xl rounded-2xl shadow-xl border border-[#2C2E3A] p-8 transition-all hover:border-[#3B3D4A]">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          🌟 Daily Problem
        </h1>

        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-white">{p.title}</h2>
            <span
              className={`inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full ${difficultyColor}`}
            >
              {p.difficulty.toUpperCase()}
            </span>
          </div>

          <p className="text-gray-300 leading-relaxed text-sm">
            {p.statement?.slice?.(0, 280)}...
          </p>

          <div className="pt-3">
            <Link
              to={`/problems/${p._id}`}
              className="inline-block px-5 py-2 bg-yellow-400 hover:bg-yellow-300 text-black font-medium rounded-lg transition"
            >
              Solve Now →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
