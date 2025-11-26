import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, Clock } from "lucide-react";
import CountdownTimer from "../../components/CountdownTimer";

export default function ContestCard({ contest, index, activeTab }) {
  const start = new Date(contest.startTime);
  const end = new Date(contest.endTime);
  const now = Date.now();
  const isLive = now >= start.getTime() && now < end.getTime();

  // Determine card style based on contest type or index for variety
  // We'll alternate between a "Blue/Purple" theme and a "Green/Teal" theme
  // or use specific themes for Weekly vs Biweekly if we can detect it from the title.
  const isWeekly = contest.title.toLowerCase().includes("weekly");
  
  // Theme Configurations
  const theme = isWeekly 
    ? {
        bgGradient: "bg-gradient-to-br from-[#2E3192] to-[#1BFFFF]",
        overlayGradient: "bg-gradient-to-t from-[#0b0a0a] via-transparent to-transparent",
        accentColor: "text-[#1BFFFF]",
        shadowColor: "shadow-[#2E3192]/20",
        iconBg: "bg-[#1BFFFF]/20",
        borderColor: "border-[#1BFFFF]/30"
      }
    : {
        bgGradient: "bg-gradient-to-br from-[#009245] to-[#FCEE21]",
        overlayGradient: "bg-gradient-to-t from-[#0b0a0a] via-transparent to-transparent",
        accentColor: "text-[#FCEE21]",
        shadowColor: "shadow-[#009245]/20",
        iconBg: "bg-[#FCEE21]/20",
        borderColor: "border-[#FCEE21]/30"
      };

  // Fallback for other types or just alternating
  if (!isWeekly && index % 2 !== 0) {
      // Keep the green theme
  } else if (!isWeekly) {
      // Default to a neutral or third theme if needed, but for now let's stick to 2 main ones
      // or maybe a "Biweekly" specific one.
      // Let's actually make "Biweekly" the Green one and "Weekly" the Blue one.
      // If neither, we can use a Purple/Pink one.
  }
  
  const cardTheme = isWeekly 
    ? {
        // Blue/Cyan - Weekly
        wrapper: "from-blue-600/20 to-cyan-400/20 hover:from-blue-600/30 hover:to-cyan-400/30",
        border: "border-blue-500/30 group-hover:border-blue-400/50",
        icon: "text-cyan-300",
        title: "group-hover:text-cyan-200",
        glow: "group-hover:shadow-[0_0_30px_-5px_rgba(34,211,238,0.3)]",
        graphic: "bg-gradient-to-br from-blue-500 to-cyan-300"
      } 
    : {
        // Emerald/Lime - Biweekly (or others)
        wrapper: "from-emerald-600/20 to-lime-400/20 hover:from-emerald-600/30 hover:to-lime-400/30",
        border: "border-emerald-500/30 group-hover:border-emerald-400/50",
        icon: "text-lime-300",
        title: "group-hover:text-lime-200",
        glow: "group-hover:shadow-[0_0_30px_-5px_rgba(163,230,53,0.3)]",
        graphic: "bg-gradient-to-br from-emerald-500 to-lime-300"
      };

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
        className={`group relative flex flex-col h-full min-h-[220px] rounded-2xl overflow-hidden border backdrop-blur-sm transition-all duration-500 bg-gradient-to-br ${cardTheme.wrapper} ${cardTheme.border} ${cardTheme.glow}`}
      >
        {/* Abstract 3D Graphic Background */}
        <div className="absolute top-0 right-0 w-64 h-64 -mr-16 -mt-16 opacity-20 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3">
           <div className={`w-full h-full rounded-full blur-3xl ${cardTheme.graphic}`} />
        </div>
        
        {/* Geometric Shapes (CSS only) simulating the 3D look */}
        <div className="absolute top-8 right-8 opacity-30 group-hover:opacity-50 transition-opacity duration-500">
            <div className={`w-20 h-20 rounded-2xl rotate-12 border-4 border-white/10 backdrop-blur-md ${cardTheme.graphic} opacity-40`} />
            <div className={`absolute -top-4 -right-4 w-12 h-12 rounded-xl -rotate-12 border-2 border-white/20 backdrop-blur-md bg-white/5`} />
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex flex-col h-full p-6">
          
          {/* Header: Icon & Status */}
          <div className="flex justify-between items-start mb-auto">
            <div className={`p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md ${cardTheme.icon}`}>
              <Calendar className="w-6 h-6" />
            </div>
            
            {/* Timer Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 border border-white/10 backdrop-blur-md text-xs font-mono font-medium text-white/90 shadow-lg">
                <Clock className="w-3.5 h-3.5 opacity-70" />
                {isLive ? (
                   <span className="text-red-400 font-bold flex items-center gap-1.5">
                     Ends in <CountdownTimer target={end.getTime()} compact />
                   </span>
                ) : activeTab === 'upcoming' ? (
                   <span className="text-white font-bold flex items-center gap-1.5">
                     Starts in <CountdownTimer target={start.getTime()} compact />
                   </span>
                ) : (
                   <span className="opacity-60">Ended</span>
                )}
            </div>
          </div>

          {/* Footer: Title & Date */}
          <div className="mt-8">
            <h3 className={`text-2xl font-bold text-white mb-2 transition-colors duration-300 ${cardTheme.title} line-clamp-2 tracking-tight`}>
              {contest.title}
            </h3>
            
            <div className="flex items-center gap-3 text-sm text-white/50 font-medium">
               <span>
                 {start.toLocaleString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
               </span>
               <span className="w-1 h-1 rounded-full bg-white/30" />
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
