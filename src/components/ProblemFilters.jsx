import React, { useState } from "react";
import { Filter, X } from "lucide-react";
import RandomProblemButton from "./RandomProblemDice";

export default function ProblemFilters({ filters, setFilters }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full">
      {/* 🔘 Mobile Search + Filter Toggle */}
      <div className="flex sm:hidden items-center justify-between mb-3">
        <input
          value={filters.q}
          onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value }))}
          placeholder="Search problems..."
          className="
            flex-1 mr-2 bg-[var(--raisin-black)]/70 text-[var(--white)] 
            placeholder-[var(--white)]/40 border border-[var(--dark-pastel-green)]/20 
            rounded-md px-3 py-2 
            focus:outline-none focus:border-[var(--dark-pastel-green)] 
            transition duration-200
          "
        />
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="
            p-2 rounded-md border border-[var(--dark-pastel-green)]/20 
            text-[var(--white)] hover:bg-[var(--dark-slate-gray)]/60 
            transition
          "
        >
          {open ? <X size={18} /> : <Filter size={18} />}
        </button>
      </div>

      {/* 🧭 Filters Section */}
      <div
        className={`
          ${open ? "flex" : "hidden"} sm:flex
          flex-col sm:flex-row flex-wrap items-center gap-2 sm:gap-3
          bg-[var(--dark-slate-gray)]/80 border border-[var(--dark-pastel-green)]/15 
          rounded-2xl p-3 sm:p-4 mb-5 
          shadow-md backdrop-blur-md transition-all duration-300
        `}
      >
        {/* 🔍 Search input (Desktop Only) */}
        <div className="hidden sm:block">
          <input
            value={filters.q}
            onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value }))}
            placeholder="Search (title / statement)"
            className="
              bg-[var(--raisin-black)]/60 text-[var(--white)] placeholder-[var(--white)]/40 
              border border-[var(--dark-pastel-green)]/20 rounded-md px-3 py-2 w-64
              focus:outline-none focus:border-[var(--dark-pastel-green)] focus:ring-1 focus:ring-[var(--dark-pastel-green)]
              transition duration-200
            "
          />
        </div>

        {/* 📘 Topic input */}
        <input
          value={filters.topic}
          onChange={(e) => setFilters((f) => ({ ...f, topic: e.target.value }))}
          placeholder="Topic (e.g., Mechanics)"
          className="
            bg-[var(--raisin-black)]/60 text-[var(--white)] placeholder-[var(--white)]/40
            border border-[var(--dark-pastel-green)]/20 rounded-md px-3 py-2
            focus:outline-none focus:border-[var(--dark-pastel-green)] focus:ring-1 focus:ring-[var(--dark-pastel-green)]
            transition duration-200
            w-full sm:w-auto
          "
        />

        {/* ⚙️ Difficulty selector */}
        <select
          value={filters.difficulty}
          onChange={(e) =>
            setFilters((f) => ({ ...f, difficulty: e.target.value }))
          }
          className="
            bg-[var(--raisin-black)]/60 text-[var(--white)] border border-[var(--dark-pastel-green)]/20 
            rounded-md px-3 py-2
            focus:outline-none focus:border-[var(--orange-peel)] focus:ring-1 focus:ring-[var(--orange-peel)]
            transition duration-200
            w-full sm:w-auto
          "
        >
          <option value="">Any difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        {/* ❌ Reset button */}
        <RandomProblemButton />
        <button
          onClick={() =>
            setFilters({ q: "", topic: "", difficulty: "" })
          }
          className="
            w-full sm:w-auto sm:ml-auto text-center text-sm 
            text-[var(--alert-red)] hover:text-[var(--spanish-orange)] 
            transition font-medium tracking-wide
          "
        >
          Reset
        </button>
      </div>
    </div>
  );
}
