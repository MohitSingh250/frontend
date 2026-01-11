import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";
import { motion } from "framer-motion";
import { Timer, Target, ArrowLeft, Crown, TrendingUp, Search, RefreshCw, Trophy } from "lucide-react";

export default function ContestLeaderboard() {
  const { contestId } = useParams();
  const navigate = useNavigate();
  const [board, setBoard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const fetchLeaderboard = useCallback(() => {
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
  }, [contestId]);

  useEffect(() => {
    fetchLeaderboard();
    // Poll every 30 seconds for live updates
    const interval = setInterval(fetchLeaderboard, 30000);
    return () => clearInterval(interval);
  }, [fetchLeaderboard]);

  const filteredBoard = board.filter(u => 
    (u.user?.username || "Unknown User").toLowerCase().includes(search.toLowerCase())
  );

  const top3 = filteredBoard.slice(0, 3);
  const rest = filteredBoard.slice(3);

  const getStateEmblem = (stateName) => {
    if (!stateName) return null;
    
    const emblemMap = {
      "Andhra Pradesh": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Emblem_of_Andhra_Pradesh.svg/500px-Emblem_of_Andhra_Pradesh.svg.png",
      "Arunachal Pradesh": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Emblem_of_Arunachal_Pradesh.svg/500px-Emblem_of_Arunachal_Pradesh.svg.png",
      "Assam": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Emblem_of_Assam.svg/500px-Emblem_of_Assam.svg.png",
      "Bihar": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Emblem_of_Bihar.svg/500px-Emblem_of_Bihar.svg.png",
      "Chhattisgarh": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Emblem_of_Chhattisgarh.svg/500px-Emblem_of_Chhattisgarh.svg.png",
      "Goa": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Emblem_of_Goa.svg/500px-Emblem_of_Goa.svg.png",
      "Gujarat": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Emblem_of_Gujarat.svg/500px-Emblem_of_Gujarat.svg.png",
      "Haryana": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Emblem_of_Haryana.svg/500px-Emblem_of_Haryana.svg.png",
      "Himachal Pradesh": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Emblem_of_Himachal_Pradesh.svg/500px-Emblem_of_Himachal_Pradesh.svg.png",
      "Jharkhand": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Emblem_of_Jharkhand.svg/500px-Emblem_of_Jharkhand.svg.png",
      "Karnataka": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Emblem_of_Karnataka.svg/500px-Emblem_of_Karnataka.svg.png",
      "Kerala": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Emblem_of_Kerala.svg/500px-Emblem_of_Kerala.svg.png",
      "Madhya Pradesh": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Emblem_of_Madhya_Pradesh.svg/500px-Emblem_of_Madhya_Pradesh.svg.png",
      "Maharashtra": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Emblem_of_Maharashtra.svg/500px-Emblem_of_Maharashtra.svg.png",
      "Manipur": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Emblem_of_Manipur.svg/500px-Emblem_of_Manipur.svg.png",
      "Meghalaya": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Emblem_of_Meghalaya.svg/500px-Emblem_of_Meghalaya.svg.png",
      "Mizoram": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Emblem_of_Mizoram.svg/500px-Emblem_of_Mizoram.svg.png",
      "Nagaland": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Emblem_of_Nagaland.svg/500px-Emblem_of_Nagaland.svg.png",
      "Odisha": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Emblem_of_Odisha.svg/500px-Emblem_of_Odisha.svg.png",
      "Punjab": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Emblem_of_Punjab.svg/500px-Emblem_of_Punjab.svg.png",
      "Rajasthan": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Emblem_of_Rajasthan.svg/500px-Emblem_of_Rajasthan.svg.png",
      "Sikkim": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Emblem_of_Sikkim.svg/500px-Emblem_of_Sikkim.svg.png",
      "Tamil Nadu": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Emblem_of_Tamil_Nadu.svg/500px-Emblem_of_Tamil_Nadu.svg.png",
      "Telangana": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Emblem_of_Telangana.svg/500px-Emblem_of_Telangana.svg.png",
      "Tripura": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Emblem_of_Tripura.svg/500px-Emblem_of_Tripura.svg.png",
      "Uttar Pradesh": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Emblem_of_Uttar_Pradesh.svg/500px-Emblem_of_Uttar_Pradesh.svg.png",
      "Uttarakhand": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Emblem_of_Uttarakhand.svg/500px-Emblem_of_Uttarakhand.svg.png",
      "West Bengal": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Emblem_of_West_Bengal.svg/500px-Emblem_of_West_Bengal.svg.png",
      "Delhi": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Emblem_of_Delhi.svg/500px-Emblem_of_Delhi.svg.png",
      "Jammu & Kashmir": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Emblem_of_Jammu_and_Kashmir.svg/500px-Emblem_of_Jammu_and_Kashmir.svg.png",
      "Ladakh": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Emblem_of_Ladakh.svg/500px-Emblem_of_Ladakh.svg.png",
      "Chandigarh": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Emblem_of_Chandigarh.svg/500px-Emblem_of_Chandigarh.svg.png",
      "Puducherry": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Emblem_of_Puducherry.svg/500px-Emblem_of_Puducherry.svg.png"
    };

    const emblemUrl = emblemMap[stateName];
    
    return (
      <div className="flex items-center justify-center" title={stateName}>
        {emblemUrl ? (
          <div className="w-8 h-8 rounded-full bg-white p-0.5 flex items-center justify-center border border-white/20 shadow-lg hover:scale-110 transition-transform cursor-help">
            <img src={emblemUrl} alt={stateName} className="w-full h-full object-contain" />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center text-[8px] font-black text-[var(--text-tertiary)] border border-[var(--border-primary)]">
            {stateName.substring(0, 2).toUpperCase()}
          </div>
        )}
      </div>
    );
  };

  // Mock data for missing fields (Accuracy, Time) for now
  const enhanceUser = (u) => ({
    ...u,
    accuracy: u.accuracy || Math.floor(Math.random() * 30 + 70), // Mock 70-100%
    timeTaken: u.timeTaken || `${Math.floor(Math.random() * 60 + 20)}m` // Mock 20-80m
  });

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans pb-20 transition-colors duration-300">
      
      {/* BACKGROUND ACCENTS */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[var(--brand-orange)]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[var(--color-error)]/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-12 relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16">
          <div className="flex items-center gap-4 self-start md:self-auto">
            <button 
              onClick={() => navigate(-1)}
              className="p-3 rounded-full bg-[var(--bg-tertiary)] border border-[var(--border-primary)] hover:bg-[var(--bg-secondary)] transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 text-[var(--text-tertiary)] group-hover:text-[var(--text-primary)]" />
            </button>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] flex items-center gap-3">
                Leaderboard <span className="px-2 py-1 rounded-md bg-[var(--color-error)]/10 text-[var(--color-error)] text-xs font-bold border border-[var(--color-error)]/20 uppercase tracking-wider">Live</span>
              </h1>
              <p className="text-[var(--text-tertiary)] text-sm mt-1">Real-time rankings & performance stats</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-auto flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-tertiary)]" />
              <input 
                type="text" 
                placeholder="Search participant..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full md:w-[300px] pl-10 pr-4 py-3 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-primary)] focus:border-[var(--brand-orange)] focus:bg-[var(--bg-primary)] outline-none transition-all text-sm placeholder:text-[var(--text-tertiary)] text-[var(--text-primary)]"
              />
            </div>
            <button 
              onClick={fetchLeaderboard}
              className="p-3 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-primary)] hover:bg-[var(--bg-secondary)] transition-colors text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:rotate-180 duration-500"
              title="Refresh Leaderboard"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>

        {loading && board.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-[var(--brand-orange)]/30 border-t-[var(--brand-orange)] rounded-full animate-spin mb-4" />
            <p className="text-[var(--text-tertiary)] animate-pulse">Calculating ranks...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
              <TrendingUp className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">Failed to load leaderboard</h3>
            <p className="text-[var(--text-tertiary)] mb-6 max-w-md">{error}</p>
            <button 
              onClick={fetchLeaderboard}
              className="px-6 py-2 rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--bg-secondary)] transition-colors font-bold text-sm text-[var(--text-primary)]"
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
            <div className="bg-[var(--bg-secondary)]/50 backdrop-blur-xl border border-[var(--border-primary)] rounded-3xl overflow-hidden shadow-2xl">
              <div className="grid grid-cols-12 gap-4 p-4 border-b border-[var(--border-primary)] text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)]">
                <div className="col-span-2 md:col-span-1 text-center">Rank</div>
                <div className="col-span-6 md:col-span-5">Participant</div>
                <div className="col-span-2 md:col-span-2 text-center hidden md:block">Accuracy</div>
                <div className="col-span-2 md:col-span-2 text-center hidden md:block">Time</div>
                <div className="col-span-4 md:col-span-2 text-right pr-4">Score</div>
              </div>

              <div className="divide-y divide-[var(--border-primary)]">
                {rest.length === 0 && top3.length === 0 ? (
                  <div className="py-20 text-center text-[var(--text-tertiary)]">
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
      </div>
    </div>
  );
}

function PodiumCard({ user, rank, delay }) {
  const isFirst = rank === 1;
  const colors = {
    1: "from-[var(--brand-orange)] to-amber-600 shadow-[var(--brand-orange)]/20",
    2: "from-[var(--text-tertiary)] to-slate-500 shadow-[var(--text-tertiary)]/20",
    3: "from-[var(--color-medium)] to-amber-800 shadow-[var(--color-medium)]/20"
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
          <Crown className="absolute -top-10 left-1/2 -translate-x-1/2 w-10 h-10 text-[var(--brand-orange)] fill-[var(--brand-orange)] animate-bounce" />
        )}
        <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full p-1 bg-gradient-to-br ${colors[rank]} shadow-2xl`}>
          <div className="w-full h-full rounded-full bg-[var(--bg-primary)] flex items-center justify-center overflow-hidden border-4 border-[var(--bg-primary)]">
             <span className="text-2xl font-bold text-[var(--text-primary)]">
               {initial}
             </span>
          </div>
        </div>
        <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br ${colors[rank]} flex items-center justify-center text-[var(--bg-primary)] font-bold text-sm shadow-lg border-2 border-[var(--bg-primary)]`}>
          {rank}
        </div>
      </div>

      <div className="mt-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-1">
          <h3 className="font-bold text-[var(--text-primary)] text-lg truncate max-w-[120px]">{username}</h3>
          {getStateEmblem(user.user?.location)}
        </div>
        <div className="flex items-center justify-center gap-2 mt-1">
          <span className="text-[var(--brand-orange)] font-bold text-xl">{user.score}</span>
          <span className="text-xs text-[var(--text-tertiary)] uppercase font-bold">pts</span>
        </div>
        <div className="flex items-center justify-center gap-3 mt-2 text-xs text-[var(--text-tertiary)]">
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
      className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-[var(--bg-tertiary)]/20 transition-colors group"
    >
      <div className="col-span-2 md:col-span-1 text-center font-mono font-bold text-[var(--text-tertiary)] group-hover:text-[var(--text-primary)] transition-colors">
        #{rank}
      </div>
      
      <div className="col-span-6 md:col-span-5 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center text-sm font-bold text-[var(--text-primary)]">
          {initial}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <div className="font-bold text-[var(--text-primary)]/90 group-hover:text-[var(--text-primary)] transition-colors">{username}</div>
            {getStateEmblem(user.user?.location)}
          </div>
          <div className="text-xs text-[var(--text-tertiary)] md:hidden">{user.accuracy}% Acc • {user.timeTaken}</div>
        </div>
      </div>

      <div className="col-span-2 md:col-span-2 text-center hidden md:flex items-center justify-center gap-1 text-sm text-[#8A8A8A]">
        <Target className="w-4 h-4 text-[#8A8A8A]/50" /> {user.accuracy}%
      </div>

      <div className="col-span-2 md:col-span-2 text-center hidden md:flex items-center justify-center gap-1 text-sm text-[#8A8A8A]">
        <Timer className="w-4 h-4 text-[#8A8A8A]/50" /> {user.timeTaken}
      </div>

      <div className="col-span-4 md:col-span-2 text-right pr-4">
        <span className="font-bold text-[#FFA217]">{user.score}</span>
        <span className="text-xs text-[#8A8A8A] ml-1">pts</span>
      </div>
    </motion.div>
  );
}
