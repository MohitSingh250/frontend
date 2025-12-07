import { Layout, Zap, BookOpen, Plus, Star, Lock } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function ProblemListSidebar() {
  const location = useLocation();
  
  return (
    <div className="w-[220px] shrink-0 hidden lg:block space-y-4 pr-2 border-r border-[var(--border-primary)] -mt-6 pt-6 min-h-screen">
      {/* Main Navigation */}
      <div className="space-y-1">
        <Link 
          to="/problems"
          className={`flex items-center gap-3 px-2 py-2 rounded-lg font-semibold text-[15px] cursor-pointer transition-all ${
            location.pathname === "/problems" 
              ? "bg-[var(--bg-tertiary)] text-white" 
              : "text-white hover:bg-[var(--bg-tertiary)]"
          }`}
        >
          <Layout size={18} />
          <span>Library</span>
        </Link>
        
        <Link
          to="/quest"
          className="flex items-center gap-3 px-2 py-2 rounded-lg font-semibold text-[15px] text-white hover:bg-[var(--bg-tertiary)] transition-all cursor-pointer"
        >
          <Zap size={18} />
          <span>Quest</span>
          <span className="ml-auto px-1.5 py-0.5 text-[10px] font-bold bg-[#00b8a3] text-white rounded">New</span>
        </Link>
        
        <Link
          to="/study-plan"
          className="flex items-center gap-3 px-2 py-2 rounded-lg font-semibold text-[15px] text-white hover:bg-[var(--bg-tertiary)] transition-all cursor-pointer"
        >
          <BookOpen size={18} />
          <span>Study Plan</span>
        </Link>
      </div>

      {/* Divider */}
      <div className="border-t border-[var(--border-primary)] mx-2"></div>

      {/* My Lists */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-2">
          <span className="text-xs font-semibold text-white/70">My Lists</span>
          <button className="p-1 hover:bg-[var(--bg-tertiary)] rounded transition-colors">
            <Plus size={14} className="text-white/70" />
          </button>
        </div>
        <div className="space-y-1">
          <Link
            to="/favorites"
            className="flex items-center gap-3 px-2 py-2 rounded-lg font-medium text-[15px] text-white hover:bg-[var(--bg-tertiary)] transition-all cursor-pointer"
          >
            <Star size={16} className="text-white/60" />
            <span>Favorite</span>
            <Lock size={12} className="ml-auto text-white/50" />
          </Link>
        </div>
      </div>
    </div>
  );
}
