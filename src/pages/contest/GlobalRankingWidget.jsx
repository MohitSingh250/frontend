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
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#FFA217]"></div>
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
            const crownColor = isRank1 ? "text-[#FFA217]" : isRank2 ? "text-[#C0C0C0]" : "text-[#CD7F32]";
            
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
                    
                    <div className={`relative rounded-full p-1 ${isRank1 ? 'bg-gradient-to-b from-[#FFA217] to-transparent' : 'bg-[#3E3E3E]'}`}>
                      <img 
                        src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
                        alt={user.name} 
                        className={`${avatarSize} rounded-full object-cover border-4 border-[#1A1A1A] shadow-2xl`} 
                      />
                    </div>
                  </div>

                  {/* Podium Cylinder */}
                  <div className={`w-24 md:w-28 ${height} rounded-t-2xl bg-gradient-to-b from-[#282828] to-[#1A1A1A] border-x border-t border-[#3E3E3E] flex flex-col items-center justify-center shadow-2xl relative overflow-hidden transition-transform group-hover:scale-105`}>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
                    <div className="relative z-10 text-center px-2">
                      <div className={`text-sm font-black truncate max-w-full ${isRank1 ? 'text-[#FFA217]' : 'text-white'}`}>
                        {user.name}
                      </div>
                      <div className="text-[10px] font-bold text-[#8A8A8A]">
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
                className="flex items-center gap-4 p-3 rounded-2xl bg-[#282828]/40 border border-[#3E3E3E] hover:border-[#FFA217]/50 transition-all group"
              >
                <div className="w-8 h-8 rounded-full bg-[#1A1A1A] flex items-center justify-center text-xs font-black text-[#8A8A8A] group-hover:text-[#FFA217]">
                  {user.rank}
                </div>
                
                <img 
                  src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
                  alt={user.name} 
                  className="w-10 h-10 rounded-full border-2 border-[#3E3E3E] object-cover" 
                />
                
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-white truncate">{user.name}</div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-[#8A8A8A] font-medium">
                    Rating: <span className="text-white font-bold">{user.rating}</span>
                  </div>
                  <div className="text-[10px] text-[#8A8A8A]">
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
          className="w-full py-4 text-center text-xs font-black text-[#8A8A8A] hover:text-white uppercase tracking-widest transition-colors block"
        >
          Show More
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#282828] border border-[#3E3E3E] rounded-[2rem] overflow-hidden">
      <div className="p-6 border-b border-[#3E3E3E] flex items-center gap-2">
        <Trophy size={18} className="text-[#FFA217]" />
        <h3 className="font-bold text-white">Global Ranking</h3>
      </div>
      <div className="divide-y divide-[#3E3E3E]">
        {users.slice(0, 10).map((user) => (
          <Link 
            key={user.rank} 
            to={`/profile/${user.userId}`}
            className="p-4 flex items-center gap-3 hover:bg-[#3E3E3E]/30 transition-colors"
          >
            <span className={`w-6 text-center font-bold ${
              user.rank === 1 ? "text-yellow-500" : 
              user.rank === 2 ? "text-gray-400" : 
              user.rank === 3 ? "text-orange-500" : "text-[#8A8A8A]"
            }`}>{user.rank}</span>
            
            <img 
              src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
              alt={user.name} 
              className="w-10 h-10 rounded-full bg-[#3E3E3E] object-cover" 
            />
            
            <div className="flex-1 min-w-0">
              <div className="font-bold text-sm text-white truncate">{user.name}</div>
              <div className="flex items-center gap-3 text-xs text-[#8A8A8A]">
                <span>Rating: {user.rating}</span>
                <span>•</span>
                <span>Attended: {user.attended}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="p-4 text-center border-t border-[#3E3E3E]">
        <Link 
          to="/leaderboard"
          className="text-sm font-bold text-[#FFA217] hover:text-[#FFB84D] transition-colors inline-flex items-center gap-1"
        >
          Show More <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  );
}
