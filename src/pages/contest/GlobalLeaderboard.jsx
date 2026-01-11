import React, { useEffect, useState, useContext } from "react";
import { ChevronLeft, Trophy, Crown, Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../../api";
import { AuthContext } from "../../context/AuthContext";

export default function GlobalLeaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [totalParticipants, setTotalParticipants] = useState(0);
  const [userRank, setUserRank] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

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
      <div className="flex items-center justify-center">
        {emblemUrl ? (
          <div className="w-10 h-10 rounded-full bg-white p-1 flex items-center justify-center border border-white/20 shadow-lg hover:scale-110 transition-transform cursor-help" title={stateName}>
            <img src={emblemUrl} alt={stateName} className="w-full h-full object-contain" />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center text-[10px] font-black text-[var(--text-tertiary)] border border-[var(--border-primary)]" title={stateName}>
            {stateName.substring(0, 2).toUpperCase()}
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await api.get("/leaderboards/global");
        if (response.data.success) {
          setLeaderboard(response.data.leaderboard);
          setTotalParticipants(response.data.totalParticipants);
          setUserRank(response.data.userRank);
        }
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--brand-orange)]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] relative overflow-hidden">
      {/* Checkered Background Pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        {/* Header Section */}
        <div className="mb-12">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-[var(--bg-tertiary)] border border-[var(--border-primary)] flex items-center justify-center mb-8 hover:bg-[var(--bg-secondary)] transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          
          <h1 className="text-4xl font-bold mb-2">Global Ranking</h1>
          <p className="text-[var(--text-tertiary)] text-lg flex items-center gap-2">
            Total Participants: <span className="text-[var(--text-primary)] font-bold">{totalParticipants.toLocaleString()}</span>
          </p>
        </div>

        {/* Leaderboard Table */}
        <div className="space-y-4">
          {/* Table Header */}
          <div className="grid grid-cols-12 px-6 py-4 text-sm font-bold text-[var(--text-tertiary)] border-b border-[var(--border-primary)]/30">
            <div className="col-span-1">Rank</div>
            <div className="col-span-5">Name</div>
            <div className="col-span-3 text-center">Emblem</div>
            <div className="col-span-1 text-center">Attended</div>
            <div className="col-span-2 text-right">Score</div>
          </div>

          {/* User's Current Rank (Highlighted) */}
          {userRank && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-12 items-center px-6 py-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-primary)] shadow-xl mb-8"
            >
              <div className="col-span-1 font-black text-lg text-[var(--text-primary)]">
                {userRank.rank}
              </div>
              <div className="col-span-5 flex items-center gap-4">
                <img 
                  src={userRank.avatar} 
                  alt={userRank.name} 
                  className="w-10 h-10 rounded-full border-2 border-[var(--border-primary)] object-cover" 
                />
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[var(--text-primary)]">{userRank.name}</span>
                  <span className="text-[var(--accent-blue)] text-sm font-medium">(You)</span>
                </div>
              </div>
              <div className="col-span-3 flex justify-center">
                {getStateEmblem(userRank.state)}
              </div>
              <div className="col-span-1 text-center font-bold text-[var(--text-primary)]">{userRank.attended}</div>
              <div className="col-span-2 text-right font-black text-lg text-[var(--text-primary)]">{userRank.rating}</div>
            </motion.div>
          )}

          {/* Top 50 List */}
          <div className="space-y-2">
            {leaderboard.map((item, idx) => {
              const isMe = item.userId === user?._id;
              return (
                <motion.div 
                  key={item.userId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.02 }}
                  className={`grid grid-cols-12 items-center px-6 py-4 rounded-2xl border transition-all duration-200 ${
                    isMe 
                      ? "bg-[var(--bg-secondary)] border-[var(--border-primary)] shadow-lg" 
                      : "bg-[var(--bg-secondary)]/40 border-[var(--border-primary)]/50 hover:bg-[var(--bg-secondary)]/60 hover:border-[var(--border-secondary)]"
                  }`}
                >
                  <div className="col-span-1 flex items-center">
                    {item.rank === 1 ? (
                      <div className="w-8 h-8 rounded-full bg-[var(--brand-orange)] flex items-center justify-center text-[var(--bg-primary)] font-black text-sm">
                        1
                      </div>
                    ) : item.rank === 2 ? (
                      <div className="w-8 h-8 rounded-full bg-[var(--text-tertiary)] flex items-center justify-center text-[var(--bg-primary)] font-black text-sm">
                        2
                      </div>
                    ) : item.rank === 3 ? (
                      <div className="w-8 h-8 rounded-full bg-[var(--color-medium)] flex items-center justify-center text-[var(--bg-primary)] font-black text-sm">
                        3
                      </div>
                    ) : (
                      <span className="text-[var(--text-tertiary)] font-bold pl-3">{item.rank}</span>
                    )}
                  </div>
                  
                  <Link 
                    to={`/profile/${item.userId}`}
                    className="col-span-5 flex items-center gap-4 group"
                  >
                    <img 
                      src={item.avatar} 
                      alt={item.name} 
                      className="w-10 h-10 rounded-full border-2 border-[var(--border-primary)] object-cover group-hover:border-[var(--brand-orange)] transition-colors" 
                    />
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-orange)] transition-colors">
                        {item.name}
                      </span>
                      {isMe && <span className="text-[var(--accent-blue)] text-sm font-medium">(You)</span>}
                    </div>
                  </Link>

                  <div className="col-span-3 flex justify-center">
                    {getStateEmblem(item.state)}
                  </div>
                  
                  <div className="col-span-1 text-center font-bold text-[var(--text-primary)]">
                    {item.attended}
                  </div>
                  
                  <div className="col-span-2 text-right font-black text-lg text-[var(--text-primary)]">
                    {item.rating}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
