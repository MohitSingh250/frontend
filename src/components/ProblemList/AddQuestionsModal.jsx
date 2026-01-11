import React, { useState, useEffect, useRef } from "react";
import { X, Search, Check, Loader2 } from "lucide-react";
import api from "../../api";

export default function AddQuestionsModal({ isOpen, onClose, onAdd, existingProblemIds = [] }) {
  const [search, setSearch] = useState("");
  const [problems, setProblems] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [moreData, setMoreData] = useState(true);
  const scrollRef = useRef(null);
  const pageSize = 20;

  useEffect(() => {
    if (isOpen) {
      setSelectedIds([]);
      setSearch("");
      setProblems([]);
      setPage(1);
      setMoreData(true);
      fetchProblems(1, "", true);
    }
  }, [isOpen]);

  const fetchProblems = async (pageNum, query = "", reset = false) => {
    if (loading || (!moreData && !reset)) return;
    
    setLoading(true);
    try {
      const res = await api.get(`/problems?q=${query}&page=${pageNum}&limit=${pageSize}`);
      let newProblems = [];
      
      if (Array.isArray(res.data)) {
        newProblems = res.data;
      } else if (res.data && Array.isArray(res.data.problems)) {
        newProblems = res.data.problems;
      }

      setProblems(prev => reset ? newProblems : [...prev, ...newProblems]);
      setMoreData(newProblems.length === pageSize);
    } catch (err) {
      console.error("Error fetching problems:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    const timeoutId = setTimeout(() => {
      setPage(1);
      setMoreData(true);
      fetchProblems(1, search, true);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [search]);

  const handleScroll = () => {
    if (!scrollRef.current || loading || !moreData) return;
    
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 20) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchProblems(nextPage, search);
    }
  };

  const toggleSelect = (id) => {
    if (existingProblemIds.includes(id)) return;
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#282828] border border-[#3e3e3e] rounded-xl w-full max-w-2xl shadow-2xl animate-in fade-in zoom-in duration-200 flex flex-col max-h-[85vh] text-[#eff1f6]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#3e3e3e]">
          <h2 className="text-lg font-semibold">Add Questions</h2>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-[#3e3e3e] rounded-md transition-colors text-[#8a8a8a] hover:text-[#eff1f6]"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search */}
        <div className="px-6 py-4">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a8a8a] group-focus-within:text-[#eff1f6] transition-colors" size={16} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions"
              className="w-full bg-[#3e3e3e] border border-transparent rounded-lg pl-10 pr-4 py-2 text-sm text-[#eff1f6] placeholder-[#8a8a8a] focus:outline-none focus:ring-1 focus:ring-[#ffa116] transition-all"
            />
          </div>
        </div>

        {/* List Content */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto px-2 pb-4 custom-scrollbar"
        >
          <div className="flex flex-col gap-0.5">
            {problems.map((problem, index) => {
              const isAdded = existingProblemIds.includes(problem._id);
              const isSelected = selectedIds.includes(problem._id);
              
              return (
                <div
                  key={problem._id}
                  onClick={() => toggleSelect(problem._id)}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all cursor-pointer group ${
                    isAdded 
                      ? "opacity-40 cursor-not-allowed" 
                      : isSelected 
                        ? "bg-[#3e3e3e]" 
                        : "hover:bg-[#333333]"
                  }`}
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="flex items-center gap-2 min-w-0">
                      {isAdded && <Check size={14} className="text-[#2cbb5d] shrink-0" />}
                      <span className="text-[14px] font-medium truncate">
                        {index + 1}. {problem.title}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 shrink-0">
                    <span className={`text-[12px] font-medium ${
                      problem.difficulty === 'easy' ? 'text-[#00af9b]' :
                      problem.difficulty === 'medium' ? 'text-[#ffb800]' :
                      'text-[#ff2d55]'
                    }`}>
                      {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                    </span>
                    
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                      isAdded 
                        ? "bg-[#2cbb5d] border-[#2cbb5d] text-white"
                        : isSelected
                          ? "bg-[#ffa116] border-[#ffa116] text-white"
                          : "border-[#5c5c5c] group-hover:border-[#8a8a8a]"
                    }`}>
                      {(isAdded || isSelected) && <Check size={12} strokeWidth={3} />}
                    </div>
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex items-center justify-center py-6 text-[#8a8a8a]">
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                <span className="text-sm">Loading...</span>
              </div>
            )}

            {!loading && problems.length === 0 && (
              <div className="text-center py-20 text-[#8a8a8a] text-sm">
                No questions found.
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#3e3e3e] flex items-center justify-end gap-3 bg-[#282828] rounded-b-xl">
          <button
            onClick={() => onAdd(selectedIds)}
            disabled={selectedIds.length === 0 || loading}
            className="px-4 py-1.5 rounded-lg text-sm font-semibold bg-[#3e3e3e] text-[#eff1f6] hover:bg-[#4a4a4a] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Add to List
          </button>
        </div>
      </div>
    </div>
  );
}
