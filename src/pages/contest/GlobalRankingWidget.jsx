import React, { useEffect, useState } from "react";
import { Trophy, Crown, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import api from "../../api";

export default function GlobalRankingWidget({ variant = "default" }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/leaderboards/global")
      .then(res => setUsers(res.data.leaderboard || []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[var(--brand-orange)]"></div>
      </div>
    );
  }

  if (variant === "minimal") {
    const top3 = [
      users[1], // Rank 2
      users[0], // Rank 1
      users[2]  // Rank 3
    ].filter(Boolean);

    return (
      <div className="w-full">
        {/* PODIUM SECTION */}
        <div className="flex items-end justify-center gap-2 md:gap-4 mb-12 pt-12">
          {top3.map((user, idx) => {
            const isRank1 = user.rank === 1;
            const isRank2 = user.rank === 2;
            const isRank3 = user.rank === 3;
            
            const height = isRank1 ? "h-32" : isRank2 ? "h-24" : "h-20";
            const avatarSize = isRank1 ? "w-24 h-24" : isRank2 ? "w-20 h-20" : "w-16 h-16";
            const crownSize = isRank1 ? 28 : 22;
            const crownColor = isRank1 ? "text-[var(--brand-orange)]" : isRank2 ? "text-[#C0C0C0]" : "text-[#CD7F32]";
            
            return (
              <motion.div 
                key={user.rank}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center relative group"
              >
                <Link to={`/profile/${user.userId}`} className="flex flex-col items-center">
                  {/* Avatar & Crown */}
                  <div className="relative mb-4 z-10">
                    <motion.div 
                      initial={{ rotate: -10, scale: 0 }}
                      animate={{ rotate: 0, scale: 1 }}
                      transition={{ delay: 0.5 + idx * 0.1, type: "spring" }}
                      className={`absolute -top-8 left-1/2 -translate-x-1/2 ${crownColor} drop-shadow-[0_0_10px_currentColor]`}
                    >
                      <Crown size={crownSize} fill="currentColor" />
                    </motion.div>
                    
                    <div className={`relative rounded-full p-1 ${isRank1 ? 'bg-gradient-to-b from-[var(--brand-orange)] to-transparent' : 'bg-[var(--border-primary)]'}`}>
                      <img 
                        src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
                        alt={user.name} 
                        className={`${avatarSize} rounded-full object-cover border-4 border-[var(--bg-primary)] shadow-2xl`} 
                      />
                    </div>
                  </div>

                  {/* Podium Cylinder */}
                  <div className={`w-24 md:w-28 ${height} rounded-t-2xl bg-gradient-to-b from-[var(--bg-secondary)] to-[var(--bg-primary)] border-x border-t border-[var(--border-primary)] flex flex-col items-center justify-center shadow-2xl relative overflow-hidden transition-transform group-hover:scale-105`}>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
                    <div className="relative z-10 text-center px-2">
                      <div className={`text-sm font-black truncate max-w-full ${isRank1 ? 'text-[var(--brand-orange)]' : 'text-[var(--text-primary)]'}`}>
                        {user.name}
                      </div>
                      <div className="text-[10px] font-bold text-[var(--text-tertiary)]">
                        {user.rating}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* LIST SECTION (4-10) */}
        <div className="space-y-3 mb-8">
          {users.slice(3, 10).map((user, idx) => (
            <motion.div 
              key={user.rank}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + idx * 0.05 }}
            >
              <Link 
                to={`/profile/${user.userId}`}
                className="flex items-center gap-4 p-3 rounded-2xl bg-[var(--bg-secondary)]/40 border border-[var(--border-primary)] hover:border-[var(--brand-orange)]/50 transition-all group"
              >
                <div className="w-8 h-8 rounded-full bg-[var(--bg-primary)] flex items-center justify-center text-xs font-black text-[var(--text-tertiary)] group-hover:text-[var(--brand-orange)]">
                  {user.rank}
                </div>
                
                <img 
                  src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
                  alt={user.name} 
                  className="w-10 h-10 rounded-full border-2 border-[var(--border-primary)] object-cover" 
                />
                
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-[var(--text-primary)] truncate">{user.name}</div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-[var(--text-tertiary)] font-medium">
                    Rating: <span className="text-[var(--text-primary)] font-bold">{user.rating}</span>
                  </div>
                  <div className="text-[10px] text-[var(--text-tertiary)]">
                    Attended: <span className="font-bold">{user.attended}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* SHOW MORE */}
        <Link 
          to="/leaderboard"
          className="w-full py-4 text-center text-xs font-black text-[var(--text-tertiary)] hover:text-[var(--text-primary)] uppercase tracking-widest transition-colors block"
        >
          Show More
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-[2rem] overflow-hidden">
      <div className="p-6 border-b border-[var(--border-primary)] flex items-center gap-2">
        <Trophy size={18} className="text-[var(--brand-orange)]" />
        <h3 className="font-bold text-[var(--text-primary)]">Global Ranking</h3>
      </div>
      <div className="divide-y divide-[var(--border-primary)]">
        {users.slice(0, 10).map((user) => (
          <Link 
            key={user.rank} 
            to={`/profile/${user.userId}`}
            className="p-4 flex items-center gap-3 hover:bg-[var(--bg-tertiary)]/30 transition-colors"
          >
            <span className={`w-6 text-center font-bold ${
              user.rank === 1 ? "text-[var(--brand-orange)]" : 
              user.rank === 2 ? "text-[var(--text-tertiary)]" : 
              user.rank === 3 ? "text-[var(--color-medium)]" : "text-[var(--text-tertiary)]"
            }`}>{user.rank}</span>
            
            <img 
              src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
              alt={user.name} 
              className="w-10 h-10 rounded-full bg-[var(--bg-tertiary)] object-cover" 
            />
            
            <div className="flex-1 min-w-0">
              <div className="font-bold text-sm text-[var(--text-primary)] truncate">{user.name}</div>
              <div className="flex items-center gap-3 text-xs text-[var(--text-tertiary)]">
                <span>Rating: {user.rating}</span>
                <span>•</span>
                <span>Attended: {user.attended}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="p-4 text-center border-t border-[var(--border-primary)]">
        <Link 
          to="/leaderboard"
          className="text-sm font-bold text-[var(--brand-orange)] hover:text-[var(--brand-orange)]/80 transition-colors inline-flex items-center gap-1"
        >
          Show More <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  );
}
