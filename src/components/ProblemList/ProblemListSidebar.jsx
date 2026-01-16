import React, { useContext } from "react";
import { Layout, Zap, BookOpen, Plus, Star, Lock, Globe, X } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
import { CollectionContext } from "../../context/CollectionContext";

export default function ProblemListSidebar({ onListClick, activeListId: propActiveListId, isOpen, onClose }) {
  const location = useLocation();
  const params = useParams();
  const activeListId = propActiveListId || params.listId;
  const { collections, openCreateModal } = useContext(CollectionContext);
  
  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Mobile Header */}
      <div className="flex items-center justify-between mb-6 lg:hidden">
        <h2 className="text-lg font-bold">Navigation</h2>
        <button onClick={onClose} className="p-2 rounded-full bg-[var(--bg-tertiary)] text-[var(--text-secondary)]">
          <X size={20} />
        </button>
      </div>

      {/* Main Navigation */}
      <div className="space-y-1">
        <Link 
          to="/problems"
          onClick={onClose}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl lg:rounded-lg font-semibold text-[15px] cursor-pointer transition-all ${
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
          onClick={onClose}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl lg:rounded-lg font-semibold text-[15px] transition-all cursor-pointer ${
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
          onClick={onClose}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl lg:rounded-lg font-semibold text-[15px] transition-all cursor-pointer ${
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
      <div className="border-t border-[var(--border-primary)] my-4 mx-2"></div>

      {/* My Lists */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-2 mb-2">
          <span className="text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider">My Lists</span>
          <button 
            onClick={() => {
              openCreateModal();
              onClose();
            }}
            className="p-1 hover:bg-[var(--bg-tertiary)] rounded transition-colors text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
          >
            <Plus size={14} />
          </button>
        </div>
        <div className="space-y-1">
          <Link
            to="/list/favorites"
            onClick={onClose}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl lg:rounded-lg font-medium text-[15px] transition-all cursor-pointer ${
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
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl lg:rounded-lg font-medium text-[15px] transition-all cursor-pointer ${
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

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="w-[240px] shrink-0 hidden lg:block space-y-4 px-4 border-r border-[var(--border-primary)] pt-6 h-screen sticky top-10 overflow-y-auto bg-[var(--bg-primary)]">
        {sidebarContent}
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-[100]">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
          <div className="absolute left-0 top-0 bottom-0 w-[85%] max-w-[300px] bg-[var(--bg-primary)] p-6 shadow-2xl animate-slide-in-left">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
