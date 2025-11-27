import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";
import { motion } from "framer-motion";
import { Trophy, Medal, Timer, Target, ArrowLeft, Crown, TrendingUp, Search, RefreshCw } from "lucide-react";

export default function ContestLeaderboard() {
  const { contestId } = useParams();
  const navigate = useNavigate();
  const [board, setBoard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const fetchLeaderboard = () => {
    setLoading(true);
    setError(null);
    api.get(`/leaderboards/${contestId}`)
      .then((res) => {
        const data = res.data?.leaderboard ?? [];
        setBoard(Array.isArray(data) ? data : []);
      })
      .catch(err => {
        console.error("Failed to fetch leaderboard", err);
        setError(err.response?.data?.message || "Failed to load data");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [contestId]);

  const filteredBoard = board.filter(u => 
    (u.user?.username || "Unknown User").toLowerCase().includes(search.toLowerCase())
  );

  const top3 = filteredBoard.slice(0, 3);
  const rest = filteredBoard.slice(3);

  // Mock data for missing fields (Accuracy, Time) for now
  const enhanceUser = (u) => ({
    ...u,
    accuracy: u.accuracy || Math.floor(Math.random() * 30 + 70), // Mock 70-100%
    timeTaken: u.timeTaken || `${Math.floor(Math.random() * 60 + 20)}m` // Mock 20-80m
  });

  return (
    <div className="min-h-screen bg-[var(--raisin-black)] text-[var(--white)] font-sans selection:bg-[var(--dark-pastel-green)]/30 pb-20 transition-colors duration-300">
      
      {/* BACKGROUND ACCENTS */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[var(--dark-pastel-green)]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-12 relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16">
          <div className="flex items-center gap-4 self-start md:self-auto">
            <button 
              onClick={() => navigate(-1)}
              className="p-3 rounded-full bg-[var(--glass-border)] border border-[var(--card-border)] hover:bg-[var(--white)]/10 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 text-[var(--text-secondary)] group-hover:text-[var(--white)]" />
            </button>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight font-serif text-[var(--white)]">Leaderboard</h1>
              <p className="text-[var(--text-secondary)] text-sm mt-1">Live rankings & performance stats</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-auto flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)]" />
              <input 
                type="text" 
                placeholder="Search participant..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full md:w-[300px] pl-10 pr-4 py-3 rounded-xl bg-[var(--glass-border)] border border-[var(--card-border)] focus:border-[var(--dark-pastel-green)]/50 focus:bg-[var(--white)]/5 outline-none transition-all text-sm placeholder:text-[var(--text-secondary)] text-[var(--white)]"
              />
            </div>
            <button 
              onClick={fetchLeaderboard}
              className="p-3 rounded-xl bg-[var(--glass-border)] border border-[var(--card-border)] hover:bg-[var(--white)]/10 transition-colors text-[var(--text-secondary)] hover:text-[var(--white)] hover:rotate-180 duration-500"
              title="Refresh Leaderboard"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-[var(--dark-pastel-green)]/30 border-t-[var(--dark-pastel-green)] rounded-full animate-spin mb-4" />
            <p className="text-[var(--text-secondary)] animate-pulse">Calculating ranks...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
              <TrendingUp className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-[var(--white)] mb-2">Failed to load leaderboard</h3>
            <p className="text-[var(--text-secondary)] mb-6 max-w-md">{error}</p>
            <button 
              onClick={fetchLeaderboard}
              className="px-6 py-2 rounded-lg bg-[var(--glass-border)] hover:bg-[var(--white)]/20 transition-colors font-bold text-sm text-[var(--white)]"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            {/* PODIUM SECTION */}
            {filteredBoard.length > 0 && (
              <div className="flex flex-col md:flex-row items-end justify-center gap-4 md:gap-8 mb-20 px-4">
                {/* 2nd Place */}
                {top3[1] && <PodiumCard user={enhanceUser(top3[1])} rank={2} delay={0.2} />}
                
                {/* 1st Place */}
                {top3[0] && <PodiumCard user={enhanceUser(top3[0])} rank={1} delay={0} />}
                
                {/* 3rd Place */}
                {top3[2] && <PodiumCard user={enhanceUser(top3[2])} rank={3} delay={0.4} />}
              </div>
            )}

            {/* LIST SECTION */}
            <div className="bg-[var(--card-bg)]/50 backdrop-blur-xl border border-[var(--card-border)] rounded-3xl overflow-hidden shadow-2xl">
              <div className="grid grid-cols-12 gap-4 p-4 border-b border-[var(--card-border)] text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                <div className="col-span-2 md:col-span-1 text-center">Rank</div>
                <div className="col-span-6 md:col-span-5">Participant</div>
                <div className="col-span-2 md:col-span-2 text-center hidden md:block">Accuracy</div>
                <div className="col-span-2 md:col-span-2 text-center hidden md:block">Time</div>
                <div className="col-span-4 md:col-span-2 text-right pr-4">Score</div>
              </div>

              <div className="divide-y divide-[var(--card-border)]">
                {rest.length === 0 && top3.length === 0 ? (
                  <div className="py-20 text-center text-[var(--text-secondary)]">
                    <p>No participants found.</p>
                    <p className="text-xs mt-2 opacity-50">Contest ID: {contestId}</p>
                  </div>
                ) : (
                  rest.map((user, i) => (
                    <RankRow key={user.user?._id || i} user={enhanceUser(user)} rank={i + 4} index={i} />
                  ))
                )}
              </div>
            </div>
          </>
        )}
        
        {/* DEBUG FOOTER (Hidden in production usually, but helpful now) */}
        <div className="mt-12 text-center opacity-20 hover:opacity-100 transition-opacity text-[10px] font-mono text-[var(--text-secondary)]">
          Debug: Contest {contestId} | Participants: {board.length} | Filtered: {filteredBoard.length}
        </div>
      </div>
    </div>
  );
}

function PodiumCard({ user, rank, delay }) {
  const isFirst = rank === 1;
  const colors = {
    1: "from-yellow-400 to-amber-600 shadow-yellow-500/20",
    2: "from-slate-300 to-slate-500 shadow-slate-400/20",
    3: "from-orange-400 to-amber-800 shadow-orange-500/20"
  };

  const username = user.user?.username || "Unknown";
  const initial = username[0]?.toUpperCase() || "?";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, type: "spring" }}
      className={`relative flex flex-col items-center ${isFirst ? "order-2 md:-mt-12 scale-110 z-10" : rank === 2 ? "order-1" : "order-3"}`}
    >
      <div className="relative">
        {isFirst && (
          <Crown className="absolute -top-8 left-1/2 -translate-x-1/2 w-8 h-8 text-yellow-400 fill-yellow-400 animate-bounce" />
        )}
        <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full p-1 bg-gradient-to-br ${colors[rank]} shadow-2xl`}>
          <div className="w-full h-full rounded-full bg-[var(--card-bg)] flex items-center justify-center overflow-hidden border-4 border-[var(--card-bg)]">
             <span className="text-2xl font-bold text-[var(--text-secondary)]">
               {initial}
             </span>
          </div>
        </div>
        <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br ${colors[rank]} flex items-center justify-center text-white font-bold text-sm shadow-lg border-2 border-[var(--card-bg)]`}>
          {rank}
        </div>
      </div>

      <div className="mt-6 text-center">
        <h3 className="font-bold text-[var(--white)] text-lg truncate max-w-[120px]">{username}</h3>
        <div className="flex items-center justify-center gap-2 mt-1">
          <span className="text-[var(--dark-pastel-green)] font-bold text-xl">{user.score}</span>
          <span className="text-xs text-[var(--text-secondary)] uppercase font-bold">pts</span>
        </div>
        <div className="flex items-center justify-center gap-3 mt-2 text-xs text-[var(--text-secondary)]">
           <span className="flex items-center gap-1"><Target className="w-3 h-3" /> {user.accuracy}%</span>
           <span className="flex items-center gap-1"><Timer className="w-3 h-3" /> {user.timeTaken}</span>
        </div>
      </div>
    </motion.div>
  );
}

function RankRow({ user, rank, index }) {
  const username = user.user?.username || "Unknown";
  const initial = username[0]?.toUpperCase() || "?";

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-[var(--white)]/[0.02] transition-colors group"
    >
      <div className="col-span-2 md:col-span-1 text-center font-mono font-bold text-[var(--text-secondary)] group-hover:text-[var(--white)] transition-colors">
        #{rank}
      </div>
      
      <div className="col-span-6 md:col-span-5 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[var(--glass-border)] flex items-center justify-center text-sm font-bold text-[var(--text-secondary)]">
          {initial}
        </div>
        <div>
          <div className="font-bold text-[var(--white)]/90 group-hover:text-[var(--white)] transition-colors">{username}</div>
          <div className="text-xs text-[var(--text-secondary)] md:hidden">{user.accuracy}% Acc • {user.timeTaken}</div>
        </div>
      </div>

      <div className="col-span-2 md:col-span-2 text-center hidden md:flex items-center justify-center gap-1 text-sm text-[var(--text-secondary)]">
        <Target className="w-4 h-4 text-[var(--text-secondary)]/50" /> {user.accuracy}%
      </div>

      <div className="col-span-2 md:col-span-2 text-center hidden md:flex items-center justify-center gap-1 text-sm text-[var(--text-secondary)]">
        <Timer className="w-4 h-4 text-[var(--text-secondary)]/50" /> {user.timeTaken}
      </div>

      <div className="col-span-4 md:col-span-2 text-right pr-4">
        <span className="font-bold text-[var(--dark-pastel-green)]">{user.score}</span>
        <span className="text-xs text-[var(--text-secondary)] ml-1">pts</span>
      </div>
    </motion.div>
  );
}
