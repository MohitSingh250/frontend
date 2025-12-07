import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, Clock, Trophy } from "lucide-react";
import CountdownTimer from "../../components/CountdownTimer";

export default function ContestCard({ contest, index, activeTab }) {
  const start = new Date(contest.startTime);
  const end = new Date(contest.endTime);
  const now = Date.now();
  const isLive = now >= start.getTime() && now < end.getTime();
  const isUpcoming = now < start.getTime();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="h-full"
    >
      <Link 
        to={`/contest/${contest._id}`}
        className="group relative flex flex-col h-full min-h-[200px] rounded-xl overflow-hidden border border-[var(--border-primary)] bg-[var(--bg-secondary)] hover:border-[var(--brand-orange)] transition-all duration-300 hover:shadow-lg"
      >
        {/* Card Header with Gradient */}
        <div className={`h-24 w-full relative overflow-hidden ${
           isLive ? "bg-gradient-to-r from-red-500/10 to-orange-500/10" : 
           isUpcoming ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10" : 
           "bg-[var(--bg-tertiary)]"
        }`}>
           <div className="absolute top-4 right-4">
              {isLive ? (
                 <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/10 text-red-500 text-xs font-bold border border-red-500/20 animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> LIVE
                 </span>
              ) : isUpcoming ? (
                 <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-bold border border-blue-500/20">
                    <Calendar size={12} /> UPCOMING
                 </span>
              ) : (
                 <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--bg-tertiary)] text-[var(--text-secondary)] text-xs font-bold border border-[var(--border-primary)]">
                    ENDED
                 </span>
              )}
           </div>
           
           <div className="absolute bottom-4 left-4">
              <div className="p-2 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-primary)] shadow-sm">
                 <Trophy className={`w-5 h-5 ${isLive ? "text-red-500" : isUpcoming ? "text-blue-500" : "text-[var(--text-secondary)]"}`} />
              </div>
           </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 line-clamp-2 group-hover:text-[var(--brand-orange)] transition-colors">
            {contest.title}
          </h3>
          
          <div className="mt-auto space-y-3">
             <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                <Calendar size={14} />
                <span>{start.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                <span className="w-1 h-1 rounded-full bg-[var(--border-primary)]" />
                <span>{start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
             </div>

             {(isLive || isUpcoming) && (
                <div className="flex items-center gap-2 text-xs font-medium text-[var(--text-primary)] bg-[var(--bg-tertiary)]/50 p-2 rounded-lg">
                   <Clock size={14} className="text-[var(--brand-orange)]" />
                   <span>
                      {isLive ? "Ends in " : "Starts in "} 
                      <CountdownTimer target={isLive ? end.getTime() : start.getTime()} compact />
                   </span>
                </div>
             )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
