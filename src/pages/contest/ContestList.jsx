import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api";
import ContestCard from "./ContestCard";
import { Zap, Calendar, History, Filter, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContestList() {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("upcoming");

  useEffect(() => {
    api.get("/contests")
      .then((res) => setContests(res.data?.contests ?? []))
      .finally(() => setLoading(false));
  }, []);

  const now = Date.now();
  
  const filteredContests = contests.filter(c => {
    const start = new Date(c.startTime).getTime();
    const end = new Date(c.endTime).getTime();
    if (activeTab === "live") return now >= start && now < end;
    if (activeTab === "upcoming") return now < start;
    if (activeTab === "past") return now >= end;
    return true;
  });

  filteredContests.sort((a, b) => {
    if (activeTab === "past") return new Date(b.endTime) - new Date(a.endTime);
    return new Date(a.startTime) - new Date(b.startTime);
  });

  const tabs = [
    { id: "live", label: "Live Now", icon: Zap },
    { id: "upcoming", label: "Upcoming", icon: Calendar },
    { id: "past", label: "Past Contests", icon: History },
  ];

  return (
    <div className="min-h-screen pb-20 font-sans bg-[var(--raisin-black)] text-[var(--white)] selection:bg-[var(--dark-pastel-green)]/30 relative transition-colors duration-300">
      
      {/* 1. HERO SECTION WITH BACKGROUND IMAGE */}
      <div className="relative w-full h-[500px] flex flex-col items-center justify-center text-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://plus.unsplash.com/premium_photo-1690297733119-5ec06bd95ee9?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Contest Background" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--raisin-black)]/30 via-[var(--raisin-black)]/80 to-[var(--raisin-black)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--raisin-black)] via-transparent to-transparent" />
        </div>

        {/* Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 px-4 max-w-4xl mx-auto mt-10"
        >
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-[var(--white)] mb-6 drop-shadow-2xl" style={{ fontFamily: "'Playfair Display', serif" }}>
            Contests
          </h1>
          
          <p className="text-xl md:text-2xl text-[var(--white)]/80 max-w-2xl mx-auto leading-relaxed font-light">
            Compete in weekly challenges to prove your skills and climb the global leaderboard.
          </p>
        </motion.div>
      </div>

      {/* Tab Navigation (Centered & Floating) */}
      <div className="relative z-20 -mt-12 mb-16 flex justify-center px-4">
        <div className="p-1.5 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] backdrop-blur-xl shadow-2xl flex items-center gap-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-8 py-3 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 flex items-center gap-2.5 ${
                  isActive ? "text-[var(--raisin-black)]" : "text-[var(--text-secondary)] hover:text-[var(--white)]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[var(--white)] rounded-full shadow-lg"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? "text-[var(--raisin-black)]" : "opacity-70"}`} />
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. CONTEST GRID */}
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {loading && [1, 2, 3, 4, 5, 6].map(i => <SkeletonContestCard key={i} />)}

            {!loading && filteredContests.length === 0 && (
              <EmptyState tab={activeTab} />
            )}

            {!loading && filteredContests.map((c, i) => (
              <ContestCard key={c._id} contest={c} index={i} activeTab={activeTab} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function SkeletonContestCard() {
  return (
    <div className="h-[320px] rounded-3xl bg-[var(--card-bg)] border border-[var(--card-border)] overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--white)]/5 to-transparent animate-shimmer" />
      <div className="h-40 bg-[var(--white)]/5" />
      <div className="p-6 space-y-4">
        <div className="h-6 w-3/4 bg-[var(--white)]/10 rounded-lg" />
        <div className="flex gap-2">
          <div className="h-4 w-20 bg-[var(--white)]/5 rounded-full" />
          <div className="h-4 w-20 bg-[var(--white)]/5 rounded-full" />
        </div>
        <div className="h-10 w-full bg-[var(--white)]/5 rounded-xl mt-4" />
      </div>
    </div>
  );
}

function EmptyState({ tab }) {
  return (
    <div className="col-span-full py-32 text-center rounded-3xl border border-dashed border-[var(--card-border)] bg-[var(--card-bg)]/50">
      <div className="w-20 h-20 rounded-full bg-[var(--white)]/5 flex items-center justify-center mx-auto mb-6">
        <Filter className="w-10 h-10 text-[var(--text-secondary)]" />
      </div>
      <h3 className="text-xl font-bold text-[var(--white)]/80 mb-2">No {tab} contests found</h3>
      <p className="text-[var(--text-secondary)] max-w-md mx-auto">
        We couldn't find any contests in this category. Check back later or try a different filter.
      </p>
    </div>
  );
}
