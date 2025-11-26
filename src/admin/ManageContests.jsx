import { useEffect, useState } from "react";
import api from "../api";
import { Trash2, Calendar, Users, Clock, AlertCircle, Search, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ManageContests() {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const fetchContests = async () => {
    setLoading(true);
    try {
      const res = await api.get("/contests");
      setContests(res.data?.contests ?? []);
    } catch (err) {
      console.error("Failed to fetch contests", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContests();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contest? This action cannot be undone.")) return;
    
    setDeletingId(id);
    try {
      await api.delete(`/contests/${id}`);
      setContests(prev => prev.filter(c => c._id !== id));
    } catch (err) {
      alert("Failed to delete contest");
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  const filteredContests = contests.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.contestNumber?.toString().includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Manage Contests</h2>
          <p className="text-white/50 text-sm">View, edit, or delete existing contests.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input 
              type="text" 
              placeholder="Search contests..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-white/20 w-64 transition-colors"
            />
          </div>
          <button 
            onClick={fetchContests}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      <div className="bg-[#1e2022]/40 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="p-4 text-xs font-bold text-white/40 uppercase tracking-wider">Contest</th>
                <th className="p-4 text-xs font-bold text-white/40 uppercase tracking-wider">Schedule</th>
                <th className="p-4 text-xs font-bold text-white/40 uppercase tracking-wider text-center">Participants</th>
                <th className="p-4 text-xs font-bold text-white/40 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence>
                {filteredContests.map((contest) => (
                  <motion.tr 
                    key={contest._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="group hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-xs font-bold text-white/60 border border-white/5">
                          #{contest.contestNumber}
                        </div>
                        <div>
                          <div className="font-bold text-white text-sm group-hover:text-[var(--dark-pastel-green)] transition-colors">
                            {contest.title}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-white/5 text-white/40 border border-white/5">
                              {contest.type}
                            </span>
                            <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded border ${
                              contest.difficulty === 'hard' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                              contest.difficulty === 'medium' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                              'bg-green-500/10 text-green-400 border-green-500/20'
                            }`}>
                              {contest.difficulty}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-white/60">
                          <Calendar className="w-3.5 h-3.5 text-white/30" />
                          {new Date(contest.startTime).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-white/60">
                          <Clock className="w-3.5 h-3.5 text-white/30" />
                          {new Date(contest.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {new Date(contest.endTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/5">
                        <Users className="w-3.5 h-3.5 text-white/40" />
                        <span className="text-xs font-medium text-white/80">{contest.participants?.length || 0}</span>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => handleDelete(contest._id)}
                        disabled={deletingId === contest._id}
                        className="p-2 rounded-lg hover:bg-red-500/10 text-white/40 hover:text-red-400 transition-colors disabled:opacity-50"
                        title="Delete Contest"
                      >
                        {deletingId === contest._id ? (
                          <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
              
              {!loading && filteredContests.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-white/40">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                        <AlertCircle className="w-6 h-6 opacity-50" />
                      </div>
                      <p>No contests found matching your search.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
