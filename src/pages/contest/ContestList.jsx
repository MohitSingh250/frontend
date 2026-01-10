import { useEffect, useState, useContext } from "react";
import api from "../../api";
import ContestCard from "./ContestCard";
import ContestListItem from "./ContestListItem";
import GlobalRankingWidget from "./GlobalRankingWidget";
import { Trophy, Calendar, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { AuthContext } from "../../context/AuthContext";

export default function ContestList() {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("past");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    api.get("/contests")
      .then((res) => setContests(res.data?.contests ?? []))
      .finally(() => setLoading(false));
  }, []);

  // Separate upcoming contests
  const upcomingContests = contests
    .filter(c => new Date(c.startTime) > new Date())
    .sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

  // Filter for list (Past & My Contests)
  const filteredContests = contests.filter(c => {
    const end = new Date(c.endTime).getTime();
    
    if (activeTab === "past") return Date.now() >= end;
    
    if (activeTab === "my") {
      return c.participants?.some(p => {
        const pId = typeof p.userId === 'object' ? p.userId._id : p.userId;
        return pId === user?._id;
      });
    }
    
    return true;
  }).sort((a, b) => new Date(b.startTime) - new Date(a.startTime));

  return (
    <div className="min-h-screen pb-20 font-sans bg-[#1A1A1A] text-[#DAE0DE]">
      
      {/* 1. HERO SECTION */}
      <div className="relative w-full bg-[#282828] border-b border-[#3E3E3E] py-16 mb-12 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#FFA217] opacity-5 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 text-center z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFA217]/10 text-[#FFA217] text-xs font-bold uppercase tracking-wider mb-6 border border-[#FFA217]/20">
              <Sparkles size={14} />
              <span>Orbit Arena</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
              Compete. Solve. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFA217] to-[#FF375F]">Conquer.</span>
            </h1>
            <p className="text-[#8A8A8A] text-lg max-w-2xl mx-auto leading-relaxed">
              Join weekly contests to test your skills against the best. Climb the global leaderboard and earn badges.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* 2. ORBIT STREAM (Upcoming Contests) */}
        {upcomingContests.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Calendar className="text-[#FFA217]" size={24} />
                Upcoming Contests
              </h2>
              <div className="flex gap-2">
                <button className="p-2 rounded-full bg-[#282828] text-[#8A8A8A] hover:text-white hover:bg-[#3E3E3E] transition-all">
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
            
            {/* Horizontal Scroll Container */}
            <div className="flex gap-6 overflow-x-auto pb-8 snap-x custom-scrollbar">
              {upcomingContests.map((contest) => (
                <div key={contest._id} className="min-w-[350px] md:min-w-[400px] snap-start">
                  <ContestCard contest={contest} variant="featured" />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* 3. LEFT COLUMN: CONTEST LIST */}
          <div className="flex-1">
            <div className="flex items-center gap-8 mb-8 border-b border-[#3E3E3E]">
              <button 
                onClick={() => setActiveTab("past")}
                className={`pb-4 text-sm font-bold uppercase tracking-wider transition-colors border-b-2 ${
                  activeTab === "past" 
                    ? "border-[#FFA217] text-[#FFA217]" 
                    : "border-transparent text-[#8A8A8A] hover:text-white"
                }`}
              >
                Past Contests
              </button>
              <button 
                onClick={() => setActiveTab("my")}
                className={`pb-4 text-sm font-bold uppercase tracking-wider transition-colors border-b-2 ${
                  activeTab === "my" 
                    ? "border-[#FFA217] text-[#FFA217]" 
                    : "border-transparent text-[#8A8A8A] hover:text-white"
                }`}
              >
                My Participation
              </button>
            </div>

            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-20 text-[#8A8A8A]">Loading contests...</div>
              ) : filteredContests.length > 0 ? (
                filteredContests.map((contest) => (
                  <ContestListItem key={contest._id} contest={contest} />
                ))
              ) : (
                <div className="text-center py-20 bg-[#282828] rounded-xl border border-[#3E3E3E]">
                  <Trophy className="mx-auto text-[#3E3E3E] mb-4" size={48} />
                  <p className="text-[#8A8A8A]">No contests found in this category.</p>
                </div>
              )}
            </div>
          </div>

          {/* 4. RIGHT COLUMN: SIDEBAR */}
          <div className="w-full lg:w-80 shrink-0 space-y-8">
            <GlobalRankingWidget />
            
            {/* Quick Stats or Info */}
            <div className="p-6 rounded-xl bg-[#282828] border border-[#3E3E3E]">
              <h3 className="font-bold text-white mb-4">Contest Rules</h3>
              <ul className="space-y-3 text-sm text-[#8A8A8A]">
                <li className="flex gap-2">
                  <span className="text-[#FFA217]">•</span>
                  <span>Penalty of 5 minutes for each wrong submission.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#FFA217]">•</span>
                  <span>Ranking is based on score, then finish time.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#FFA217]">•</span>
                  <span>Plagiarism checks are active.</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
