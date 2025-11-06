import React from 'react';
import { Link } from 'react-router-dom';

export default function ProblemCard({ problem }) {
  return (
    <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl p-4 hover:border-[#3A3A3A] hover:bg-[#242424] transition duration-200 shadow-sm">
      <div className="flex justify-between items-center">
        <h3 className="text-[15px] font-semibold text-gray-100">
          <Link
            to={`/problems/${problem._id}`}
            className="hover:text-[#EAB308] transition"
          >
            {problem.title}
          </Link>
        </h3>

        <span
          className={`px-2 py-[2px] rounded text-[11px] font-medium capitalize ${
            problem.difficulty === 'hard'
              ? 'bg-[#3B0D0C] text-[#F87171]'
              : problem.difficulty === 'medium'
              ? 'bg-[#382D0D] text-[#FACC15]'
              : 'bg-[#0C2910] text-[#4ADE80]'
          }`}
        >
          {problem.difficulty}
        </span>
      </div>

      <div className="mt-3 text-sm text-gray-400">
        {problem.topics?.map((t) => (
          <span
            key={t}
            className="mr-2 inline-block text-[11px] bg-[#2A2A2A] text-gray-300 px-2 py-[2px] rounded-md"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-4 text-right">
        <Link
          to={`/problems/${problem._id}`}
          className="text-[#EAB308] text-[13px] hover:text-[#FACC15] transition"
        >
          Open →
        </Link>
      </div>
    </div>
  );
}