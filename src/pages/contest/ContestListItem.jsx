import React from "react";
import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";

export default function ContestListItem({ contest }) {
  const start = new Date(contest.startTime);
  
  return (
    <Link 
      to={`/contest/${contest._id}`}
      className="flex items-center gap-4 p-4 rounded-xl hover:bg-[var(--bg-secondary)] transition-colors group"
    >
      {/* Thumbnail */}
      <div className="w-32 h-20 shrink-0 rounded-lg overflow-hidden relative bg-[var(--bg-tertiary)]">
        {contest.bannerImage ? (
          <img src={contest.bannerImage} alt={contest.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center">
             <Calendar className="text-[var(--text-secondary)] opacity-50" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-medium text-[var(--text-primary)] mb-1 group-hover:text-[var(--brand-orange)] transition-colors truncate">
          {contest.title}
        </h3>
        <p className="text-sm text-[var(--text-secondary)]">
          {start.toLocaleString(undefined, { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
        </p>
      </div>

      {/* Action */}
      <div className="shrink-0">
        <span className="px-4 py-2 rounded-lg bg-[var(--bg-tertiary)] text-xs font-medium text-[var(--text-secondary)] group-hover:bg-[var(--bg-primary)] transition-colors">
          Virtual
        </span>
      </div>
    </Link>
  );
}
