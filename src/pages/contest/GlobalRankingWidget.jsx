import React, { useEffect, useState } from "react";
import { Trophy } from "lucide-react";
import api from "../../api";

export default function GlobalRankingWidget() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/leaderboard/global")
      .then(res => setUsers(res.data.leaderboard))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-xl overflow-hidden">
      <div className="p-4 border-b border-[var(--border-primary)] flex items-center gap-2">
        <Trophy size={18} className="text-[var(--text-secondary)]" />
        <h3 className="font-bold text-[var(--text-primary)]">Global Ranking</h3>
      </div>
      <div className="divide-y divide-[var(--border-primary)]">
        {loading ? (
          <div className="p-8 text-center text-[var(--text-secondary)] text-sm">Loading...</div>
        ) : (
          users.map((user) => (
            <div key={user.rank} className="p-3 flex items-center gap-3 hover:bg-[var(--bg-tertiary)]/50 transition-colors">
              <span className={`w-6 text-center font-bold ${
                user.rank === 1 ? "text-yellow-500" : 
                user.rank === 2 ? "text-gray-400" : 
                user.rank === 3 ? "text-orange-500" : "text-[var(--text-secondary)]"
              }`}>{user.rank}</span>
              
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-8 h-8 rounded-full bg-[var(--bg-tertiary)] object-cover" 
              />
              
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm text-[var(--text-primary)] truncate">{user.name}</div>
                <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)]">
                  <span>Rating: {user.rating}</span>
                  <span>Attended: {user.attended}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="p-3 text-center border-t border-[var(--border-primary)]">
        <button className="text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--brand-orange)] transition-colors">
          View More
        </button>
      </div>
    </div>
  );
}
