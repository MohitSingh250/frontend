import React from "react";
import { Zap, Play, ChevronRight, BookOpen, Atom, FlaskConical, Calculator, Database, PenTool, MousePointer2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../../api";


const getIcon = (category) => {
  switch (category) {
    case 'physics': 
      return (
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-blue-500">
          <circle cx="20" cy="20" r="4" fill="currentColor" className="opacity-80" />
          <ellipse cx="20" cy="20" rx="16" ry="6" stroke="currentColor" strokeWidth="2" className="opacity-60 rotate-0" />
          <ellipse cx="20" cy="20" rx="16" ry="6" stroke="currentColor" strokeWidth="2" className="opacity-60 rotate-60" />
          <ellipse cx="20" cy="20" rx="16" ry="6" stroke="currentColor" strokeWidth="2" className="opacity-60 -rotate-60" />
        </svg>
      );
    case 'chemistry': 
      return (
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-emerald-500">
          <path d="M12 34H28L23 14H17L12 34Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80" />
          <path d="M17 14V8H23V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80" />
          <circle cx="24" cy="24" r="2" fill="currentColor" className="opacity-60" />
          <circle cx="16" cy="28" r="2" fill="currentColor" className="opacity-60" />
          <circle cx="20" cy="30" r="2" fill="currentColor" className="opacity-60" />
        </svg>
      );
    case 'maths': 
      return (
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-orange-500">
          <rect x="14" y="14" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2" className="opacity-80" />
          <circle cx="8" cy="8" r="3" fill="currentColor" className="opacity-60" />
          <circle cx="32" cy="8" r="3" fill="currentColor" className="opacity-60" />
          <circle cx="8" cy="32" r="3" fill="currentColor" className="opacity-60" />
          <circle cx="32" cy="32" r="3" fill="currentColor" className="opacity-60" />
          <path d="M10 10L14 14M30 10L26 14M10 30L14 26M30 30L26 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="opacity-60" />
        </svg>
      );
    default: return <div className="relative"><div className="absolute inset-0 blur-lg bg-purple-500/30"></div><Zap className="text-purple-400 relative z-10" size={40} /></div>;
  }
};

const getColor = (category) => {
  switch (category) {
    case 'physics': return "from-blue-500/20 to-transparent";
    case 'chemistry': return "from-emerald-500/20 to-transparent";
    case 'maths': return "from-amber-500/20 to-transparent";
    default: return "from-purple-500/20 to-transparent";
  }
};

export default function Quest() {
  const [quests, setQuests] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    api.get('/quests')
      .then(res => {
        const allowedCategories = ['physics', 'chemistry', 'maths'];
        const filteredQuests = res.data.filter(q => allowedCategories.includes(q.category));
        setQuests(filteredQuests);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[var(--brand-orange)]"></div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans selection:bg-[var(--brand-orange)]/30">
          {/* 2. MAIN CONTENT */}
          <div className="flex-1 min-w-0 bg-[var(--bg-secondary)] min-h-screen p-5 md:p-12">
            {/* Hero Section */}
            <div className="relative h-[300px] w-full pt-10 flex flex-col items-center justify-center mb-0">
              {/* Background Layers */}
              <div className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 z-0">
                {/* Base Background (title-bg-dark) */}
                <img 
                  src="/store/title-bg-dark-f41f2488eebcf58959fa3c0ad59469f1.svg" 
                  alt="Background" 
                  className="h-[300px] w-[1184px] max-w-none object-cover opacity-100 dark:opacity-100 opacity-20"
                />
                {/* Silhouette Layer (big.svg) */}
                <div className="absolute inset-0 flex  justify-center">
                  <img 
                    src="/big.svg" 
                    alt="Mountain Silhouette" 
                    className="w-[80%] h-[80%] object-contain opacity-10 dark:opacity-10 opacity-5"
                  />
                </div>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative flex flex-col items-center z-10 -mt-45"
              >
                <img 
                  src="/store/mountain.jpeg" 
                  alt="Quest Logo" 
                  className="h-[118px] w-[118px] object-contain rounded-2xl shadow-xl"
                />
                <div className="flex flex-col items-center gap-3">
                  <h1 className="text-[28px] font-medium leading-normal text-[var(--text-primary)]">Orbit Quest</h1>
                  <p className="text-[var(--text-secondary)] text-xs font-medium">Turn practice into progress</p>
                </div>
              </motion.div>
            </div>

            {/* Categories Grid */}
            <div className="relative mx-auto my-0 -mt-20 w-full max-w-[1024px] px-4 md:px-6 pb-24">
              <div className="w-full">
                <div className="relative flex flex-wrap justify-center gap-6 w-full">
                  {quests.map((quest, idx) => (
                    <motion.div
                      key={quest._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      onClick={() => navigate(`/quest/${quest._id}`)}
                      className="group relative bg-[var(--bg-tertiary)] rounded-3xl p-6 transition-all cursor-pointer overflow-hidden flex items-center justify-between gap-6 shadow-md border border-[var(--border-primary)] hover:border-[var(--brand-orange)]/50 w-full md:w-[calc(50%-12px)]"
                    >
                      {/* Background Glow */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${getColor(quest.category)} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                      
                      <div className="relative z-10 flex-1">
                        <h3 className="text-xl font-bold mb-1 text-[var(--text-primary)]">{quest.title}</h3>
                        <p className="text-[var(--text-secondary)] text-sm font-medium mb-4">
                          {quest.category === 'maths' ? "0/5 Levels" : `${quest.totalLevels} Levels`}
                        </p>
                        
                        {quest.category === 'maths' ? (
                          <div className="relative w-full max-w-[200px] mt-2">
                             <div className="absolute top-1/2 left-0 w-full h-1.5 bg-[var(--bg-secondary)] -translate-y-1/2 rounded-full"></div>
                             <div className="relative flex justify-between w-full">
                               {[1, 2, 3, 4, 5].map((_, i) => (
                                 <div key={i} className="w-3.5 h-3.5 bg-[var(--text-tertiary)]/30 rounded-full"></div>
                               ))}
                             </div>
                          </div>
                        ) : (
                          <div 
                            className="inline-flex items-center gap-2 px-5 py-2 bg-[var(--bg-secondary)] hover:bg-[var(--bg-primary)] text-[var(--text-primary)] rounded-xl text-xs font-bold transition-all border border-[var(--border-primary)] group-hover:border-[var(--brand-orange)]/50 group-hover:text-[var(--brand-orange)]"
                          >
                            <MousePointer2 size={14} className="rotate-90" />
                            Start
                          </div>
                        )}
                      </div>
                      
                      <div className="w-24 h-24 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        {getIcon(quest.category)}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
    </div>
  );
}
