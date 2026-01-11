import React, { useEffect, useState } from "react";
import api from "../api";
import { Zap, TrendingUp, History, ArrowUpRight, ArrowDownRight, Loader2, Trophy } from "lucide-react";
import { motion } from "framer-motion";

export default function Points() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const res = await api.get("/users/me/points");
        setData(res.data);
      } catch (err) {
        console.error("Error fetching points:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPoints();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[var(--text-secondary)]">
        <Loader2 className="animate-spin mr-2" /> Loading points...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] p-6 pb-20">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-xl bg-yellow-500/10 text-yellow-500">
            <Zap size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">OrbitCoins</h1>
            <p className="text-[var(--text-secondary)] text-sm">
              Earn coins by solving problems and participating in contests
            </p>
          </div>
        </div>

        {/* Balance Card */}
        <div className="bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-primary)] rounded-3xl border border-[var(--border-primary)] p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--brand-orange)]/5 blur-[100px] rounded-full -mr-32 -mt-32"></div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <span className="text-sm font-medium text-[var(--text-tertiary)] uppercase tracking-widest">Available Balance</span>
              <div className="flex items-center gap-4 mt-2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-b from-[var(--brand-orange)] to-[var(--brand-orange-hover)] border border-[var(--brand-orange-hover)] flex items-center justify-center shadow-lg">
                  <div className="w-6 h-6 rounded-full bg-white/20"></div>
                </div>
                <span className="text-5xl font-black tracking-tighter">{data.balance.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="px-8 py-3 bg-[var(--brand-orange)] text-white rounded-2xl font-bold text-sm hover:scale-105 transition-transform shadow-xl shadow-[var(--brand-orange)]/20">
                Redeem Coins
              </button>
              <button className="px-8 py-3 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-2xl font-bold text-sm border border-[var(--border-primary)] hover:bg-[var(--bg-secondary)] transition-colors">
                Earn More
              </button>
            </div>
          </div>
        </div>

        {/* History Section */}
        <div className="bg-[var(--bg-secondary)] rounded-3xl border border-[var(--border-primary)] overflow-hidden">
          <div className="p-6 border-b border-[var(--border-primary)] flex items-center justify-between">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <History size={18} className="text-[var(--text-tertiary)]" />
              Transaction History
            </h3>
          </div>
          
          <div className="divide-y divide-[var(--border-primary)]">
            {data.history && data.history.length > 0 ? (
              data.history.map((tx, idx) => (
                <div key={idx} className="p-6 flex items-center justify-between hover:bg-[var(--bg-tertiary)]/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl ${tx.type === 'earn' ? 'bg-[var(--color-success)]/10 text-[var(--color-success)]' : 'bg-[var(--color-hard)]/10 text-[var(--color-hard)]'}`}>
                      {tx.type === 'earn' ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                    </div>
                    <div>
                      <div className="font-bold text-sm">{tx.description}</div>
                      <div className="text-xs text-[var(--text-tertiary)] mt-1">
                        {tx.category} • {new Date(tx.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className={`font-black text-lg ${tx.type === 'earn' ? 'text-[var(--color-success)]' : 'text-[var(--text-primary)]'}`}>
                    {tx.type === 'earn' ? '+' : '-'}{tx.amount}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-20 text-center">
                <Trophy size={48} className="mx-auto text-[var(--text-tertiary)] mb-4 opacity-20" />
                <p className="text-[var(--text-secondary)] text-sm">No transactions yet. Start earning OrbitCoins!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
