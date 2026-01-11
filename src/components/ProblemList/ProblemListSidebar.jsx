import React, { useContext } from "react";
import { Layout, Zap, BookOpen, Plus, Star, Lock, Globe } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { CollectionContext } from "../../context/CollectionContext";

export default function ProblemListSidebar({ onListClick, activeListId }) {
  const location = useLocation();
  const { collections, openCreateModal } = useContext(CollectionContext);
  
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
          <span className="text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider">My Lists</span>
          <button 
            onClick={() => openCreateModal()}
            className="p-1 hover:bg-[var(--bg-tertiary)] rounded transition-colors text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
          >
            <Plus size={14} />
          </button>
        </div>
        <div className="space-y-1">
          <Link
            to="/list/favorites"
            className={`flex items-center gap-3 px-2 py-2 rounded-lg font-medium text-[15px] transition-all cursor-pointer ${
              (activeListId === 'favorites' || !activeListId) && location.pathname.startsWith('/list')
                ? "bg-[var(--bg-tertiary)] text-[var(--text-primary)]"
                : "text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Star size={16} className={activeListId === 'favorites' ? "text-[var(--brand-orange)]" : "text-[var(--text-tertiary)]"} />
            <span>Favorite</span>
            <Lock size={12} className="ml-auto text-[var(--text-tertiary)] opacity-50" />
          </Link>

          {collections.map((list) => (
            <Link
              key={list._id}
              to={`/list/${list._id}`}
              className={`flex items-center gap-3 px-2 py-2 rounded-lg font-medium text-[15px] transition-all cursor-pointer ${
                activeListId === list._id && location.pathname.startsWith('/list')
                  ? "bg-[var(--bg-tertiary)] text-[var(--text-primary)]"
                  : "text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]"
              }`}
            >
              <div className="w-4 h-4 rounded bg-[var(--bg-tertiary)] border border-[var(--border-primary)] flex items-center justify-center text-[8px] font-bold">
                {list.name.charAt(0).toUpperCase()}
              </div>
              <span className="truncate flex-1">{list.name}</span>
              {list.isPrivate ? (
                <Lock size={12} className="ml-auto text-[var(--text-tertiary)] opacity-50" />
              ) : (
                <Globe size={12} className="ml-auto text-[var(--text-tertiary)] opacity-50" />
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
