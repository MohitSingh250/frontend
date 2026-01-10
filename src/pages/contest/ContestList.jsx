import { useEffect, useState, useContext } from "react";
import api from "../../api";
import ContestCard from "./ContestCard";
import ContestListItem from "./ContestListItem";
import GlobalRankingWidget from "./GlobalRankingWidget";
import { Trophy, Calendar, ArrowRight, Sparkles, Users, RefreshCw, Shuffle, Handshake } from "lucide-react";
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
    <div className="min-h-screen bg-[#1A1A1A] text-[#DAE0DE] pb-20 font-sans relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`, backgroundSize: '30px 30px' }}></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* 1. HERO SECTION */}
        <div className="relative w-full py-8 mb-4 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
          
          <div className="relative text-center z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className="mb-4 relative group">
                <img 
                  src="/store/lamp.png" 
                  alt="Orbit Contest" 
                  className="w-32 h-32 md:w-44 md:h-44 object-contain relative z-10 drop-shadow-[0_0_15px_rgba(255,162,23,0.4)]" 
                />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
                Orbit Contest
              </h1>
              <p className="text-[#8A8A8A] text-base max-w-2xl mx-auto leading-relaxed">
                Contest every week. Compete and see your ranking!
              </p>
            </motion.div>
          </div>
        </div>

        {/* 2. FEATURED CONTESTS (Side by Side) */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {upcomingContests.slice(0, 2).map((contest) => (
              <ContestCard key={contest._id} contest={contest} variant="featured" />
            ))}
            {upcomingContests.length === 0 && (
              <div className="lg:col-span-2 text-center py-12 bg-[#282828] rounded-[2rem] border border-[#3E3E3E] border-dashed">
                <p className="text-[#8A8A8A]">No upcoming contests scheduled yet.</p>
              </div>
            )}
          </div>
        </div>

        <div className="text-center mb-8">
          <button className="text-[#8A8A8A] hover:text-white transition-colors flex items-center gap-2 mx-auto text-xs font-medium">
            <Handshake size={16} className="text-[#FFA217]" />
            Sponsor a Contest
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* 3. LEFT COLUMN: LEADERBOARD PREVIEW (Bottom Left in image) */}
          <div className="w-full lg:w-[400px] shrink-0 order-2 lg:order-1">
             <div className="relative">
                <div className="flex items-center gap-1 mb-8 bg-[#282828] p-1 rounded-2xl w-fit border border-[#3E3E3E]">
                   <button className="px-6 py-2 rounded-xl bg-[#FFA217] text-black text-[10px] font-black uppercase transition-all shadow-[0_0_20px_rgba(255,162,23,0.3)]">Global Ranking</button>
                </div>
                <GlobalRankingWidget variant="minimal" />
             </div>
          </div>

          {/* 4. RIGHT COLUMN: TABBED LIST */}
          <div className="flex-1 order-1 lg:order-2 w-full">
            <div className="bg-[#282828] border border-[#3E3E3E] rounded-[2rem] overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-[#3E3E3E]">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setActiveTab("past")}
                    className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                      activeTab === "past" 
                        ? "bg-[#3E3E3E] text-white" 
                        : "text-[#8A8A8A] hover:text-white"
                    }`}
                  >
                    Past Contests
                  </button>
                  <button 
                    onClick={() => setActiveTab("my")}
                    className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                      activeTab === "my" 
                        ? "bg-[#3E3E3E] text-white" 
                        : "text-[#8A8A8A] hover:text-white"
                    }`}
                  >
                    My Contests
                  </button>
                </div>
                
                <button className="p-3 rounded-2xl bg-[#A855F7] text-white shadow-lg shadow-purple-500/20">
                   <Shuffle size={20} />
                </button>
              </div>

              <div className="p-6 space-y-4">
                {loading ? (
                  <div className="text-center py-20 text-[#8A8A8A]">Loading contests...</div>
                ) : filteredContests.length > 0 ? (
                  filteredContests.map((contest) => (
                    <ContestListItem key={contest._id} contest={contest} />
                  ))
                ) : (
                  <div className="text-center py-20">
                    <Trophy className="mx-auto text-[#3E3E3E] mb-4" size={48} />
                    <p className="text-[#8A8A8A]">No contests found.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
