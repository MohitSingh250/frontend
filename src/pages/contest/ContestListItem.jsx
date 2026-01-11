import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function ContestListItem({ contest }) {
  const { user } = useContext(AuthContext);
  const start = new Date(contest.startTime);
  const isWeekly = contest.type === "weekly";
  
  const participant = contest.participants?.find(p => {
    const pId = typeof p.userId === 'object' ? p.userId._id : p.userId;
    return String(pId) === String(user?._id);
  });

  const solvedCount = participant?.solved || 0;
  const totalProblems = contest.problems?.length || 0;

  return (
    <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-[var(--bg-tertiary)]/30 transition-all group">
      <div className="flex items-center gap-4">
        {/* Thumbnail Gradient */}
        <div className={`w-16 h-10 rounded-lg bg-gradient-to-br ${
          isWeekly ? "from-[var(--brand-orange)] to-[#FFB84D]" : "from-[#6366F1] to-[#A855F7]"
        } opacity-80 shadow-inner`} />
        
        <div>
          <h4 className="font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-orange)] transition-colors">
            {contest.title}
          </h4>
          <p className="text-xs text-[var(--text-tertiary)]">
            {start.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}, {start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} GMT+05:30
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-xs font-bold text-[var(--text-tertiary)] bg-[var(--bg-tertiary)] px-3 py-1 rounded-full">
          {solvedCount} / {totalProblems || 4}
        </span>
        <Link 
          to={`/contest/${contest._id}`}
          className="px-6 py-2 rounded-xl border border-[#A855F7] text-[#A855F7] text-sm font-bold hover:bg-[#A855F7] hover:text-white transition-all shadow-lg shadow-purple-500/10"
        >
          Virtual
        </Link>
      </div>
    </div>
  );
}
