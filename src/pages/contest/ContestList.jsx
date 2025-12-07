import { useEffect, useState, useContext } from "react";
import api from "../../api";
import ContestCard from "./ContestCard";
import ContestListItem from "./ContestListItem";
import FeaturedContestCard from "./FeaturedContestCard";
import GlobalRankingWidget from "./GlobalRankingWidget";
import { Trophy, History, Layers } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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

  // Separate upcoming contests for featured section
  const upcomingContests = contests.filter(c => new Date(c.startTime) > new Date()).sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
  const weeklyContest = upcomingContests.find(c => c.title.toLowerCase().includes("weekly")) || upcomingContests[0];
  const biweeklyContest = upcomingContests.find(c => c.title.toLowerCase().includes("biweekly")) || upcomingContests[1];

  // Filter for list
  const filteredContests = contests.filter(c => {
    const end = new Date(c.endTime).getTime();
    
    if (activeTab === "past") return Date.now() >= end;
    
    if (activeTab === "my") {
      // Check if user is in participants list
      return c.participants?.some(p => {
        const pId = typeof p.userId === 'object' ? p.userId._id : p.userId;
        return pId === user?._id;
      });
    }
    
    return true;
  }).sort((a, b) => new Date(b.startTime) - new Date(a.startTime));

  return (
    <div className="min-h-screen pb-20 font-sans bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-[var(--brand-orange)]/30">
      
      {/* 1. HERO SECTION */}
      <div className="relative w-full bg-[var(--bg-secondary)] border-b border-[var(--border-primary)] py-12 mb-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src="https://assets.leetcode.com/static_assets/others/cup.png" 
              alt="Trophy" 
              className="w-24 h-24 mx-auto mb-4 drop-shadow-2xl"
            />
            <h1 className="text-4xl font-medium tracking-tight text-[var(--text-primary)] mb-2">
              Orbit Contest
            </h1>
            <p className="text-[var(--text-secondary)]">
              Contest every week. Compete and see your ranking!
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        
        {/* 2. FEATURED CONTESTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <FeaturedContestCard contest={weeklyContest} type="weekly" />
          <FeaturedContestCard contest={biweeklyContest} type="biweekly" />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* 3. LEFT COLUMN: CONTEST LIST */}
          <div className="flex-1">
            <div className="flex items-center gap-6 mb-6 border-b border-[var(--border-primary)]">
              <button 
                onClick={() => setActiveTab("past")}
                className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === "past" 
                    ? "border-[var(--text-primary)] text-[var(--text-primary)]" 
                    : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                Past Contests
              </button>
              <button 
                onClick={() => setActiveTab("my")}
                className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === "my" 
                    ? "border-[var(--text-primary)] text-[var(--text-primary)]" 
                    : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                My Contests
              </button>
            </div>

            <div className="space-y-2">
              {loading && <div className="text-center py-10 text-[var(--text-secondary)]">Loading contests...</div>}
              
              {!loading && filteredContests.map((contest) => (
                <ContestListItem key={contest._id} contest={contest} />
              ))}
            </div>
          </div>

          {/* 4. RIGHT COLUMN: SIDEBAR */}
          <div className="w-full lg:w-80 shrink-0 space-y-6">
            <GlobalRankingWidget />
          </div>

        </div>
      </div>
    </div>
  );
}
