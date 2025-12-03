import React, { useState } from "react";
import { Filter, X } from "lucide-react";
import ShuffleRandomButton from "./RandomProblemDice";

export default function ProblemFilters({ filters, setFilters }) {
  const [open, setOpen] = useState(false);

  const topics = [
    { id: 'all', label: 'All Subjects', icon: 'LayoutGrid' },
    { id: 'physics', label: 'Physics', icon: 'Atom' },
    { id: 'chemistry', label: 'Chemistry', icon: 'FlaskConical' },
    { id: 'maths', label: 'Maths', icon: 'Calculator' },
  ];

  return (
    <div className="w-full mb-4 space-y-4">
      
      {/* 1. Topic Pills Row */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
         {topics.map((t) => (
            <button
               key={t.id}
               onClick={() => setFilters(prev => ({ ...prev, subject: t.id === 'all' ? '' : t.label }))}
               className={`
                  flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all border
                  ${(filters.subject === t.label || (t.id === 'all' && !filters.subject))
                     ? 'bg-[var(--white)] text-[var(--raisin-black)] border-[var(--white)] shadow-md' 
                     : 'bg-[var(--card-bg)] text-[var(--text-secondary)] border-[var(--card-border)] hover:bg-[var(--white)]/10 hover:text-[var(--white)]'}
               `}
            >
               {t.label}
            </button>
         ))}
      </div>

      {/* 2. Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 group">
           <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-[var(--text-secondary)] group-focus-within:text-[var(--dark-pastel-green)] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
           </div>
          <input
            value={filters.q}
            onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value }))}
            placeholder="Search questions..."
            className="
              w-full bg-[var(--card-bg)] text-[var(--white)] placeholder-[var(--text-secondary)] 
              border border-[var(--card-border)] rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium
              focus:outline-none focus:border-[var(--dark-pastel-green)] focus:ring-1 focus:ring-[var(--dark-pastel-green)]
              transition-all duration-200
            "
          />
        </div>

        <div className="flex gap-2">
           <select
             value={filters.difficulty}
             onChange={(e) => setFilters((f) => ({ ...f, difficulty: e.target.value }))}
             className="
               bg-[var(--card-bg)] text-[var(--text-secondary)] border border-[var(--card-border)] 
               rounded-xl px-4 py-2.5 text-sm font-medium cursor-pointer hover:text-[var(--white)]
               focus:outline-none focus:border-[var(--dark-pastel-green)] focus:ring-1 focus:ring-[var(--dark-pastel-green)]
               transition-all duration-200 appearance-none
             "
           >
             <option value="">Difficulty</option>
             <option value="easy">Easy</option>
             <option value="medium">Medium</option>
             <option value="hard">Hard</option>
           </select>

           <ShuffleRandomButton />
        </div>
      </div>
    </div>
  );
}
