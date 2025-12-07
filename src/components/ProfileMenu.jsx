import React, { useContext } from "react";
import { 
  LogOut, Settings, Moon, Sun, List, Book, PieChart, Zap, 
  FlaskConical, ClipboardList, Code2, ChevronRight 
} from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

export default function ProfileMenu({ user, onSignOut }) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="absolute right-0 top-12 w-[340px] bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-xl shadow-2xl p-4 text-[var(--text-primary)] z-50 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
      
      {/* Header */}
      <Link to="/dashboard" className="flex items-center gap-3 mb-4 px-2 hover:bg-[var(--bg-tertiary)]/50 p-2 rounded-lg transition-colors cursor-pointer group">
        <img
          src={user?.avatar || "https://via.placeholder.com/80"}
          alt="avatar"
          className="w-10 h-10 rounded-full object-cover border border-[var(--border-primary)] group-hover:border-[var(--brand-orange)] transition-colors"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold truncate text-[var(--text-primary)] group-hover:text-[var(--brand-orange)] transition-colors">
            {user?.username || "User"}
          </h3>
          <p className="text-xs text-[var(--brand-orange)] font-medium">
            Access all features with our Premium subscription!
          </p>
        </div>
      </Link>

      {/* Cards Grid */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <MenuCard icon={<List size={20} className="text-green-500" />} label="My Lists" to="/list" />
        <MenuCard icon={<Book size={20} className="text-blue-500" />} label="Notebook" to="/notebook" />
        <MenuCard icon={<PieChart size={20} className="text-green-400" />} label="Progress" to="/progress" />
        <MenuCard icon={<Zap size={20} className="text-yellow-400" />} label="Points" to="/points" />
      </div>

      {/* Menu List */}
      <div className="space-y-1">
        <MenuItem icon={<FlaskConical size={18} />} label="Try New Features" to="/features" />
        <MenuItem icon={<ClipboardList size={18} />} label="Orders" to="/orders" />
        <MenuItem icon={<Code2 size={18} />} label="My Playgrounds" to="/playgrounds" />
        <MenuItem icon={<Settings size={18} />} label="Settings" to="/settings" />
        
        <button
          onClick={toggleTheme}
          className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-[var(--bg-tertiary)] transition text-left group"
        >
          <div className="flex items-center gap-3 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]">
            <span className="w-5 h-5 flex items-center justify-center">
              {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
            </span>
            <span className="text-sm font-medium">Appearance</span>
          </div>
          <ChevronRight size={14} className="text-[var(--text-tertiary)]" />
        </button>

        <div className="pt-1 mt-1 border-t border-[var(--border-secondary)]">
          <button
            onClick={onSignOut}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-[var(--bg-tertiary)] transition text-left text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            <span className="w-5 h-5 flex items-center justify-center"><LogOut size={18} /></span>
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function MenuCard({ icon, label, to }) {
  return (
    <Link to={to} className="flex flex-col items-center justify-center gap-2 bg-[var(--bg-tertiary)]/50 hover:bg-[var(--bg-tertiary)] border border-transparent hover:border-[var(--border-secondary)] rounded-xl p-3 transition group">
      <div className="p-2 rounded-full bg-[var(--bg-secondary)] group-hover:scale-110 transition-transform duration-200 shadow-sm">
        {icon}
      </div>
      <span className="text-xs font-medium text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]">
        {label}
      </span>
    </Link>
  );
}

function MenuItem({ icon, label, to }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-[var(--bg-tertiary)] transition text-left group"
    >
      <span className="w-5 h-5 flex items-center justify-center text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]">
        {icon}
      </span>
      <span className="text-sm font-medium text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]">
        {label}
      </span>
    </Link>
  );
}
