import React from 'react';
import { Link } from 'react-router-dom';

export default function ProblemCard({ problem }) {
  // Difficulty color mapping based on your palette
  const getDifficultyStyle = (level) => {
    switch (level?.toLowerCase()) {
      case 'hard':
        return 'bg-[var(--spanish-orange)]/10 text-[var(--spanish-orange)] border border-[var(--spanish-orange)]/30';
      case 'medium':
        return 'bg-[var(--orange-peel)]/10 text-[var(--orange-peel)] border border-[var(--orange-peel)]/30';
      case 'easy':
      default:
        return 'bg-[var(--dark-pastel-green)]/10 text-[var(--dark-pastel-green)] border border-[var(--dark-pastel-green)]/30';
    }
  };

  return (
    <div className="
      bg-[var(--dark-slate-gray)]/80 
      border border-[var(--dark-pastel-green)]/10 
      rounded-2xl p-4 
      hover:border-[var(--dark-pastel-green)]/40 
      hover:bg-[var(--dark-slate-gray)]/90 
      hover:shadow-lg 
      hover:shadow-[var(--dark-pastel-green)]/10 
      transition duration-300
      backdrop-blur-md
    ">
      <div className="flex justify-between items-center">
        <h3 className="text-[15px] font-semibold text-[var(--white)]">
          <Link
            to={`/problems/${problem._id}`}
            className="hover:text-[var(--dark-pastel-green)] transition"
          >
            {problem.title}
          </Link>
        </h3>

        <span
          className={`px-2 py-[2px] rounded-md text-[11px] font-medium capitalize ${getDifficultyStyle(problem.difficulty)}`}
        >
          {problem.difficulty}
        </span>
      </div>

      {problem.topics?.length > 0 && (
        <div className="mt-3 text-sm text-[var(--white)]/70 flex flex-wrap gap-2">
          {problem.topics.map((t) => (
            <span
              key={t}
              className="
                text-[11px] 
                bg-[var(--raisin-black)]/60 
                text-[var(--white)]/70 
                border border-[var(--dark-pastel-green)]/10 
                px-2 py-[2px] rounded-md
              "
            >
              {t}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 text-right">
        <Link
          to={`/problems/${problem._id}`}
          className="text-[var(--dark-pastel-green)] text-[13px] hover:text-[var(--aqua)] transition"
        >
          Open →
        </Link>
      </div>
    </div>
  );
}
