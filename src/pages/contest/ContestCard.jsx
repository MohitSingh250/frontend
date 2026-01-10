import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, Clock, Trophy, ArrowRight } from "lucide-react";
import CountdownTimer from "../../components/CountdownTimer";

export default function ContestCard({ contest, index, variant = "default" }) {
  const start = new Date(contest.startTime);
  const end = new Date(contest.endTime);
  const now = Date.now();
  const isLive = now >= start.getTime() && now < end.getTime();
  const isUpcoming = now < start.getTime();

  if (variant === "featured") {
    return (
      <Link 
        to={`/contest/${contest._id}`}
        className="group relative block w-full h-full min-h-[220px] rounded-2xl overflow-hidden bg-[#282828] border border-[#3E3E3E] hover:border-[#FFA217] transition-all duration-300"
      >
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFA217]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative p-6 flex flex-col h-full">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 rounded-xl bg-[#3E3E3E]/50 border border-[#3E3E3E] text-[#FFA217]">
              <Trophy size={20} />
            </div>
            {isLive ? (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF375F]/10 text-[#FF375F] text-xs font-bold border border-[#FF375F]/20 animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF375F]" /> LIVE
              </span>
            ) : (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3E3E3E] text-[#8A8A8A] text-xs font-bold border border-[#3E3E3E]">
                <Calendar size={12} /> UPCOMING
              </span>
            )}
          </div>

          <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-[#FFA217] transition-colors">
            {contest.title}
          </h3>
          
          <div className="mt-auto pt-4 border-t border-[#3E3E3E]/50">
            <div className="flex items-center justify-between text-sm">
              <div className="flex flex-col gap-1">
                <span className="text-[#8A8A8A] text-xs font-medium uppercase tracking-wider">Starts In</span>
                <span className="text-[#DAE0DE] font-mono font-medium">
                  <CountdownTimer target={start.getTime()} compact />
                </span>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#3E3E3E] flex items-center justify-center text-white group-hover:bg-[#FFA217] group-hover:text-black transition-colors">
                <ArrowRight size={16} />
              </div>
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
        className="group relative flex flex-col h-full min-h-[200px] rounded-xl overflow-hidden border border-[#3E3E3E] bg-[#282828] hover:border-[#FFA217] transition-all duration-300 hover:shadow-lg"
      >
        {/* Card Header with Gradient */}
        <div className={`h-24 w-full relative overflow-hidden ${
           isLive ? "bg-gradient-to-r from-[#FF375F]/10 to-[#FFA217]/10" : 
           isUpcoming ? "bg-gradient-to-r from-[#0a84ff]/10 to-[#bf5af2]/10" : 
           "bg-[#323232]"
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
                 <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#323232] text-[#8A8A8A] text-xs font-bold border border-[#3E3E3E]">
                    ENDED
                 </span>
              )}
           </div>
           
           <div className="absolute bottom-4 left-4">
              <div className="p-2 rounded-lg bg-[#1A1A1A] border border-[#3E3E3E] shadow-sm">
                 <Trophy className={`w-5 h-5 ${isLive ? "text-[#FF375F]" : isUpcoming ? "text-[#0a84ff]" : "text-[#8A8A8A]"}`} />
              </div>
           </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-[#FFA217] transition-colors">
            {contest.title}
          </h3>
          
          <div className="mt-auto space-y-3">
             <div className="flex items-center gap-2 text-xs text-[#8A8A8A]">
                <Calendar size={14} />
                <span>{start.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                <span className="w-1 h-1 rounded-full bg-[#3E3E3E]" />
                <span>{start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
             </div>

             {(isLive || isUpcoming) && (
                <div className="flex items-center gap-2 text-xs font-medium text-white bg-[#323232]/50 p-2 rounded-lg">
                   <Clock size={14} className="text-[#FFA217]" />
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
