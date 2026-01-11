import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, Clock, Trophy, ArrowRight, AlarmClock } from "lucide-react";
import CountdownTimer from "../../components/CountdownTimer";

export default function ContestCard({ contest, index, variant = "default" }) {
  const start = new Date(contest.startTime);
  const end = new Date(contest.endTime);
  const now = Date.now();
  const isLive = now >= start.getTime() && now < end.getTime();
  const isUpcoming = now < start.getTime();

  if (variant === "featured") {
    const isWeekly = contest.type === "weekly";
    const bgGradient = isWeekly 
      ? "from-[#FFA217] to-[#FFB84D]" 
      : "from-[#6366F1] to-[#A855F7]";
    
    return (
      <Link 
        to={`/contest/${contest._id}`}
        className="group relative block w-full aspect-[16/9] rounded-[1.5rem] overflow-hidden border border-white/10 transition-all duration-500 hover:scale-[1.01]"
      >
        {/* Background Image/Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient}`}>
          <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </div>

        {/* Content Overlay */}
        <div className="relative h-full p-6 flex flex-col justify-between text-white">
          {/* Top Row: Countdown */}
          <div className="flex justify-end">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-xs font-bold">
              <Clock size={14} />
              <CountdownTimer target={start.getTime()} />
            </div>
          </div>

          {/* Bottom Row: Info & Alarm */}
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-1 drop-shadow-lg">
                {contest.title}
              </h3>
              <p className="text-white/80 font-medium text-xs md:text-sm">
                {start.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}, {start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            
            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 group-hover:bg-white/20 transition-all">
              <AlarmClock size={20} className="text-white" />
            </div>
          </div>
        </div>
      </Link>
    );
  }

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
           isLive ? "bg-gradient-to-r from-[#FF375F]/10 to-[var(--brand-orange)]/10" : 
           isUpcoming ? "bg-gradient-to-r from-[#0a84ff]/10 to-[#bf5af2]/10" : 
           "bg-[var(--bg-tertiary)]"
        }`}>
           <div className="absolute top-4 right-4">
              {isLive ? (
                 <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FF375F]/10 text-[#FF375F] text-xs font-bold border border-[#FF375F]/20 animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF375F]" /> LIVE
                 </span>
              ) : isUpcoming ? (
                 <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0a84ff]/10 text-[#0a84ff] text-xs font-bold border border-[#0a84ff]/20">
                    <Calendar size={12} /> UPCOMING
                 </span>
              ) : (
                 <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--bg-tertiary)] text-[var(--text-tertiary)] text-xs font-bold border border-[var(--border-primary)]">
                    ENDED
                 </span>
              )}
           </div>
           
           <div className="absolute bottom-4 left-4">
              <div className="p-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)] shadow-sm">
                 <Trophy className={`w-5 h-5 ${isLive ? "text-[#FF375F]" : isUpcoming ? "text-[#0a84ff]" : "text-[var(--text-tertiary)]"}`} />
              </div>
           </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 line-clamp-2 group-hover:text-[var(--brand-orange)] transition-colors">
            {contest.title}
          </h3>
          
          <div className="mt-auto space-y-3">
             <div className="flex items-center gap-2 text-xs text-[var(--text-tertiary)]">
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
