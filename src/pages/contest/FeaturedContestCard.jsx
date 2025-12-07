import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock } from "lucide-react";
import CountdownTimer from "../../components/CountdownTimer";

export default function FeaturedContestCard({ contest, type }) {
  if (!contest) return null;

  const start = new Date(contest.startTime);
  const isWeekly = type === "weekly";
  
  return (
    <div className="relative overflow-hidden rounded-2xl group">
      {/* Background Gradient */}
      <div className={`absolute inset-0 ${
        isWeekly 
          ? "bg-gradient-to-br from-blue-600/20 via-blue-900/40 to-[var(--bg-secondary)]" 
          : "bg-gradient-to-br from-emerald-600/20 via-emerald-900/40 to-[var(--bg-secondary)]"
      }`} />
      
      {/* Abstract Shapes */}
      <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
      
      <div className="relative p-6 h-full flex flex-col min-h-[200px] border border-[var(--border-primary)] rounded-2xl hover:border-[var(--brand-orange)] transition-colors">
        <div className="flex justify-between items-start mb-4">
          <div className={`p-2 rounded-lg ${isWeekly ? "bg-blue-500/20 text-blue-400" : "bg-emerald-500/20 text-emerald-400"}`}>
            <Calendar size={20} />
          </div>
        </div>

        <div className="mt-auto">
          <div className="flex items-center gap-2 text-xs font-medium text-[var(--text-secondary)] mb-2">
            <Clock size={14} />
            <span>Starts in <CountdownTimer target={start.getTime()} compact /></span>
          </div>
          
          <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1 group-hover:text-[var(--brand-orange)] transition-colors">
            {contest.title}
          </h3>
          <p className="text-sm text-[var(--text-secondary)]">
            {start.toLocaleString(undefined, { weekday: 'long', hour: 'numeric', minute: '2-digit' })}
          </p>
        </div>
      </div>
    </div>
  );
}
