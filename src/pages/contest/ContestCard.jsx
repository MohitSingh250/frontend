import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, Clock } from "lucide-react";
import CountdownTimer from "../../components/CountdownTimer";

export default function ContestCard({ contest, index, activeTab }) {
  const start = new Date(contest.startTime);
  const end = new Date(contest.endTime);
  const now = Date.now();
  const isLive = now >= start.getTime() && now < end.getTime();

  const isWeekly = contest.title.toLowerCase().includes("weekly");
  
  // Dynamic styles based on contest type
  const cardStyle = {
    background: isWeekly ? "var(--card-weekly-bg)" : "var(--card-biweekly-bg)",
    borderColor: isWeekly ? "var(--card-weekly-border)" : "var(--card-biweekly-border)",
    boxShadow: isWeekly ? "0 4px 30px var(--card-weekly-glow)" : "0 4px 30px var(--card-biweekly-glow)",
  };

  const iconColor = isWeekly ? "var(--card-weekly-icon)" : "var(--card-biweekly-icon)";

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
        className="group relative flex flex-col h-full min-h-[220px] rounded-2xl overflow-hidden border backdrop-blur-sm transition-all duration-500 hover:scale-[1.02]"
        style={cardStyle}
      >
        {/* Abstract 3D Graphic Background (Simplified for theme compatibility) */}
        <div className="absolute top-0 right-0 w-64 h-64 -mr-16 -mt-16 opacity-20 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3 pointer-events-none">
           <div className="w-full h-full rounded-full blur-3xl bg-[var(--white)]/10" />
        </div>
        
        {/* Content Container */}
        <div className="relative z-10 flex flex-col h-full p-6">
          
          {/* Header: Icon & Status */}
          <div className="flex justify-between items-start mb-auto">
            <div 
              className="p-3 rounded-xl bg-[var(--white)]/10 border border-[var(--white)]/10 backdrop-blur-md"
              style={{ color: iconColor }}
            >
              <Calendar className="w-6 h-6" />
            </div>
            
            {/* Timer Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--raisin-black)]/40 border border-[var(--white)]/10 backdrop-blur-md text-xs font-mono font-medium text-[var(--white)]/90 shadow-lg">
                <Clock className="w-3.5 h-3.5 opacity-70" />
                {isLive ? (
                   <span className="text-[var(--alert-red)] font-bold flex items-center gap-1.5">
                     Ends in <CountdownTimer target={end.getTime()} compact />
                   </span>
                ) : activeTab === 'upcoming' ? (
                   <span className="text-[var(--white)] font-bold flex items-center gap-1.5">
                     Starts in <CountdownTimer target={start.getTime()} compact />
                   </span>
                ) : (
                   <span className="opacity-60">Ended</span>
                )}
            </div>
          </div>

          {/* Footer: Title & Date */}
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-[var(--white)] mb-2 transition-colors duration-300 line-clamp-2 tracking-tight group-hover:text-[var(--aqua)]">
              {contest.title}
            </h3>
            
            <div className="flex items-center gap-3 text-sm text-[var(--white)]/50 font-medium">
               <span>
                 {start.toLocaleString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
               </span>
               <span className="w-1 h-1 rounded-full bg-[var(--white)]/30" />
               <span>
                 {start.toLocaleString(undefined, { hour: 'numeric', minute: '2-digit' })}
               </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
