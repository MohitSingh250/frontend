import { BookOpen, Star, GraduationCap, Zap } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();
  return (
    <aside
      className="
        w-64 bg-[var(--bg-secondary)]
        border-r border-[var(--border-primary)]
        p-6 flex-col hidden md:flex 
        shadow-md backdrop-blur-md
      "
    >
      <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-8 tracking-tight flex items-center gap-2">
        📚 <span>Library</span>
      </h2>

      <nav className="space-y-2">
        {/* All Problems */}
        <Link
          to="/problems"
          className={`
            w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 
            transition duration-200
            ${location.pathname === "/problems" 
              ? "bg-[var(--bg-tertiary)] text-[var(--brand-orange)]" 
              : "text-[var(--text-secondary)] hover:text-[var(--brand-orange)] hover:bg-[var(--bg-tertiary)]"}
          `}
        >
          <BookOpen size={18} className="text-[var(--text-tertiary)]" />
          <span>All Problems</span>
        </Link>

        {/* Study Plan */}
        <Link
          to="/study-plan"
          className={`
            w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 
            transition duration-200
            ${location.pathname === "/study-plan" 
              ? "bg-[var(--bg-tertiary)] text-[var(--brand-orange)]" 
              : "text-[var(--text-secondary)] hover:text-[var(--brand-orange)] hover:bg-[var(--bg-tertiary)]"}
          `}
        >
          <GraduationCap size={18} className="text-[var(--text-tertiary)]" />
          <span>Study Plan</span>
        </Link>

        {/* Quest */}
        <Link
          to="/quest"
          className={`
            w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 
            transition duration-200
            ${location.pathname === "/quest" 
              ? "bg-[var(--bg-tertiary)] text-[var(--brand-orange)]" 
              : "text-[var(--text-secondary)] hover:text-[var(--brand-orange)] hover:bg-[var(--bg-tertiary)]"}
          `}
        >
          <Zap size={18} className="text-[var(--text-tertiary)]" />
          <span>Quest</span>
          <span className="ml-auto px-1.5 py-0.5 text-[10px] font-bold bg-[var(--color-easy)] text-white rounded">New</span>
        </Link>

        {/* Favorites (Active) */}
        <Link
          to="/favorites"
          className={`
            w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 
            transition duration-200
            ${location.pathname === "/favorites" 
              ? "bg-[var(--bg-tertiary)] border border-[var(--border-primary)] text-[var(--text-primary)]" 
              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] hover:border-[var(--border-primary)]"}
          `}
        >
          <Star size={18} className={location.pathname === "/favorites" ? "text-[var(--brand-orange)]" : "text-[var(--text-tertiary)]"} />
          <span>Favorites</span>
        </Link>
      </nav>

      <div className="mt-auto pt-8 border-t border-[var(--border-primary)] text-sm text-[var(--text-tertiary)]">
        <p>© 2025 JEE Physics Arena</p>
      </div>
    </aside>
  );
}
