import React from 'react';

export default function ProblemFilters({ filters, setFilters }) {
  return (
    <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl p-4 mb-5 flex flex-wrap items-center gap-3 shadow-sm">
      {/* Search input */}
      <input
        value={filters.q}
        onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value }))}
        placeholder="Search (title / statement)"
        className="bg-[#2A2A2A] text-gray-200 placeholder-gray-500 border border-[#3A3A3A] rounded-md px-3 py-2 w-64 focus:outline-none focus:border-[#EAB308] transition"
      />

      {/* Topic input */}
      <input
        value={filters.topic}
        onChange={(e) => setFilters((f) => ({ ...f, topic: e.target.value }))}
        placeholder="Topic (e.g., Mechanics)"
        className="bg-[#2A2A2A] text-gray-200 placeholder-gray-500 border border-[#3A3A3A] rounded-md px-3 py-2 focus:outline-none focus:border-[#EAB308] transition"
      />

      {/* Difficulty selector */}
      <select
        value={filters.difficulty}
        onChange={(e) =>
          setFilters((f) => ({ ...f, difficulty: e.target.value }))
        }
        className="bg-[#2A2A2A] text-gray-200 border border-[#3A3A3A] rounded-md px-3 py-2 focus:outline-none focus:border-[#EAB308] transition"
      >
        <option value="">Any difficulty</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      {/* Tags input */}
      <input
        value={filters.tags}
        onChange={(e) => setFilters((f) => ({ ...f, tags: e.target.value }))}
        placeholder="Tags (comma separated)"
        className="bg-[#2A2A2A] text-gray-200 placeholder-gray-500 border border-[#3A3A3A] rounded-md px-3 py-2 focus:outline-none focus:border-[#EAB308] transition"
      />

      {/* Reset button */}
      <button
        onClick={() =>
          setFilters({ q: '', topic: '', difficulty: '', tags: '' })
        }
        className="ml-auto text-sm text-[#F87171] hover:text-[#FCA5A5] transition"
      >
        Reset
      </button>
    </div>
  );
}
