import React, { useContext } from "react";
import { 
  LogOut, Settings, Moon, Sun, List, Book, PieChart, Zap, 
  FlaskConical, ClipboardList, Code2, ChevronRight, X,
  Trophy, MessageSquare, ShoppingBag
} from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

export default function ProfileMenu({ user, onSignOut, onClose }) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const menuContent = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 px-2 md:hidden">
        <h2 className="text-lg font-bold">Account</h2>
        <button onClick={onClose} className="p-2 rounded-full bg-[var(--bg-tertiary)] text-[var(--text-secondary)]">
          <X size={20} />
        </button>
      </div>

      <Link 
        to="/dashboard" 
        onClick={onClose}
        className="flex items-center gap-3 mb-6 px-2 hover:bg-[var(--bg-tertiary)] p-2 rounded-lg transition-colors cursor-pointer group"
      >
        <img
          src={user?.avatar || "https://via.placeholder.com/80"}
          alt="avatar"
          className="w-12 h-12 md:w-10 md:h-10 rounded-full object-cover border border-[var(--border-primary)] group-hover:border-[var(--brand-orange)] transition-colors"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-[16px] md:text-[15px] font-bold truncate text-[var(--text-primary)] group-hover:text-[var(--brand-orange)] transition-colors">
            {user?.username || "User"}
          </h3>
          <p className="text-[12px] md:text-[11px] text-[var(--brand-orange)] font-medium">
            Premium Member
          </p>
        </div>
      </Link>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-2 mb-6 md:mb-4">
        <MenuCard icon={<List size={22} className="text-[#2cbb5d]" />} label="My Lists" to="/list" onClick={onClose} />
        <MenuCard icon={<Book size={22} className="text-[#3e90ff]" />} label="Notebook" to="/notebook" onClick={onClose} />
        <MenuCard icon={<PieChart size={22} className="text-[#00af9b]" />} label="Progress" to="/progress" onClick={onClose} />
        <MenuCard icon={<Zap size={22} className="text-[var(--brand-orange)]" />} label="Points" to="/points" onClick={onClose} />
      </div>

      {/* Menu List */}
      <div className="space-y-1 md:space-y-0.5 flex-1">
        <MenuItem icon={<FlaskConical size={20} />} label="Try New Features" to="/features" onClick={onClose} />
        <MenuItem icon={<ClipboardList size={20} />} label="Orders" to="/orders" onClick={onClose} />
        <MenuItem icon={<Settings size={20} />} label="Settings" to="/settings" onClick={onClose} />
        
        {/* Mobile-only Nav Links */}
        <div className="md:hidden pt-2 mt-2 border-t border-[var(--border-primary)] space-y-1">
          <MenuItem icon={<Trophy size={20} />} label="Contest" to="/contests" onClick={onClose} />
          <MenuItem icon={<MessageSquare size={20} />} label="Discuss" to="/discuss" onClick={onClose} />
          <MenuItem icon={<ShoppingBag size={20} />} label="Store" to="/store" onClick={onClose} />
        </div>
        
        <button
          onClick={toggleTheme}
          className="flex items-center justify-between w-full px-4 py-3 md:px-3 md:py-2.5 rounded-xl md:rounded-lg hover:bg-[var(--bg-tertiary)] transition text-left group"
        >
          <div className="flex items-center gap-4 md:gap-3 text-[var(--text-tertiary)] group-hover:text-[var(--text-primary)]">
            <span className="w-6 h-6 md:w-5 md:h-5 flex items-center justify-center">
              {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
            </span>
            <span className="text-[15px] md:text-[14px] font-medium">Appearance</span>
          </div>
          <ChevronRight size={16} className="text-[var(--text-tertiary)] opacity-50" />
        </button>
      </div>

      <div className="pt-4 mt-auto border-t border-[var(--border-primary)]">
        <button
          onClick={() => {
            onSignOut();
            onClose();
          }}
          className="flex items-center gap-4 md:gap-3 w-full px-4 py-3 md:px-3 md:py-2.5 rounded-xl md:rounded-lg hover:bg-[var(--bg-tertiary)] transition text-left text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
        >
          <span className="w-6 h-6 md:w-5 md:h-5 flex items-center justify-center"><LogOut size={20} /></span>
          <span className="text-[15px] md:text-[14px] font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Dropdown */}
      <div className="hidden md:block absolute right-0 top-12 w-[320px] bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-xl shadow-2xl p-4 text-[var(--text-primary)] z-50 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
        {menuContent}
      </div>

      {/* Mobile Drawer */}
      <div className="md:hidden fixed inset-0 z-[100]">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
        <div className="absolute right-0 top-0 bottom-0 w-[85%] max-w-[320px] bg-[var(--bg-secondary)] p-6 shadow-2xl animate-slide-in-right">
          {menuContent}
        </div>
      </div>
    </>
  );
}

function MenuCard({ icon, label, to, onClick }) {
  return (
    <Link 
      to={to} 
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-2 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-secondary)] border border-transparent hover:border-[var(--border-primary)] rounded-xl p-4 md:p-3 transition-all group"
    >
      <div className="w-12 h-12 md:w-10 md:h-10 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
        {icon}
      </div>
      <span className="text-[12px] md:text-[11px] font-medium text-[var(--text-tertiary)] group-hover:text-[var(--text-primary)] text-center">
        {label}
      </span>
    </Link>
  );
}

function MenuItem({ icon, label, to, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center gap-4 md:gap-3 w-full px-4 py-3 md:px-3 md:py-2.5 rounded-xl md:rounded-lg hover:bg-[var(--bg-tertiary)] transition text-left group"
    >
      <span className="w-6 h-6 md:w-5 md:h-5 flex items-center justify-center text-[var(--text-tertiary)] group-hover:text-[var(--text-primary)]">
        {icon}
      </span>
      <span className="text-[15px] md:text-[14px] font-medium text-[var(--text-tertiary)] group-hover:text-[var(--text-primary)]">
        {label}
      </span>
    </Link>
  );
}
