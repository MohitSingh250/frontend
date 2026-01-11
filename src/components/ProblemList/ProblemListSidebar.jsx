import { Layout, Zap, BookOpen, Plus, Star, Lock } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function ProblemListSidebar() {
  const location = useLocation();
  
  return (
    <div className="w-[240px] shrink-0 hidden lg:block space-y-4 px-4 border-r border-[var(--border-primary)] pt-6 min-h-screen bg-[var(--bg-primary)]">
      {/* Main Navigation */}
      <div className="space-y-1">
        <Link 
          to="/problems"
          className={`flex items-center gap-3 px-2 py-2 rounded-lg font-semibold text-[15px] cursor-pointer transition-all ${
            location.pathname === "/problems" 
              ? "bg-[var(--bg-tertiary)] text-[var(--text-primary)]" 
              : "text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]"
          }`}
        >
          <Layout size={18} />
          <span>Library</span>
        </Link>
        
        <Link
          to="/quest"
          className={`flex items-center gap-3 px-2 py-2 rounded-lg font-semibold text-[15px] transition-all cursor-pointer ${
            location.pathname === "/quest" 
              ? "bg-[var(--bg-tertiary)] text-[var(--text-primary)]" 
              : "text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]"
          }`}
        >
          <Zap size={18} />
          <span>Quest</span>
          <span className="ml-auto px-1.5 py-0.5 text-[10px] font-bold bg-[var(--color-easy)] text-white rounded">New</span>
        </Link>
        
        <Link
          to="/study-plan"
          className={`flex items-center gap-3 px-2 py-2 rounded-lg font-semibold text-[15px] transition-all cursor-pointer ${
            location.pathname === "/study-plan" 
              ? "bg-[var(--bg-tertiary)] text-[var(--text-primary)]" 
              : "text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]"
          }`}
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
          <span className="text-xs font-semibold text-[var(--text-tertiary)]">My Lists</span>
          <button className="p-1 hover:bg-[var(--bg-tertiary)] rounded transition-colors">
            <Plus size={14} className="text-[var(--text-tertiary)]" />
          </button>
        </div>
        <div className="space-y-1">
          <Link
            to="/favorites"
            className="flex items-center gap-3 px-2 py-2 rounded-lg font-medium text-[15px] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
          >
            <Star size={16} className="text-[var(--text-tertiary)]" />
            <span>Favorite</span>
            <Lock size={12} className="ml-auto text-[var(--text-tertiary)] opacity-50" />
          </Link>
          <Link
            to="/rewind-2025"
            className="flex items-center gap-3 px-2 py-2 rounded-lg font-medium text-[15px] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
          >
            <div className="w-4 h-4 rounded bg-[var(--accent-purple)]/20 flex items-center justify-center">
              <span className="text-[8px] font-bold text-[var(--accent-purple)]">25</span>
            </div>
            <span>Rewind 2025</span>
            <div className="ml-auto text-[var(--text-tertiary)] opacity-50">
               <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
