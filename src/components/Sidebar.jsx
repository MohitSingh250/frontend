import { BookOpen, Star, GraduationCap, Zap } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();
  return (
    <aside
      className="
        w-64 bg-[var(--dark-slate-gray)]/80 
        border-r border-[var(--dark-pastel-green)]/15 
        p-6 flex-col hidden md:flex 
        shadow-md backdrop-blur-md
      "
    >
      <h2 className="text-xl font-semibold text-[var(--white)] mb-8 tracking-tight flex items-center gap-2">
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
              ? "bg-[var(--raisin-black)]/50 text-[var(--dark-pastel-green)]" 
              : "text-[var(--white)]/70 hover:text-[var(--dark-pastel-green)] hover:bg-[var(--raisin-black)]/50"}
          `}
        >
          <BookOpen size={18} className="text-[var(--white)]/60" />
          <span>All Problems</span>
        </Link>

        {/* Study Plan */}
        <Link
          to="/study-plan"
          className={`
            w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 
            transition duration-200
            ${location.pathname === "/study-plan" 
              ? "bg-[var(--raisin-black)]/50 text-[var(--orange-peel)]" 
              : "text-[var(--white)]/70 hover:text-[var(--orange-peel)] hover:bg-[var(--raisin-black)]/50"}
          `}
        >
          <GraduationCap size={18} className="text-[var(--white)]/60" />
          <span>Study Plan</span>
        </Link>

        {/* Quest */}
        <Link
          to="/quest"
          className={`
            w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 
            transition duration-200
            ${location.pathname === "/quest" 
              ? "bg-[var(--raisin-black)]/50 text-[#FFA217]" 
              : "text-[var(--white)]/70 hover:text-[#FFA217] hover:bg-[var(--raisin-black)]/50"}
          `}
        >
          <Zap size={18} className="text-[var(--white)]/60" />
          <span>Quest</span>
          <span className="ml-auto px-1.5 py-0.5 text-[10px] font-bold bg-[#00b8a3] text-white rounded">New</span>
        </Link>

        {/* Favorites (Active) */}
        <Link
          to="/favorites"
          className={`
            w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 
            transition duration-200
            ${location.pathname === "/favorites" 
              ? "bg-[var(--dark-pastel-green)]/20 border border-[var(--dark-pastel-green)]/30 text-[var(--white)]" 
              : "text-[var(--white)]/70 hover:text-[var(--white)] hover:bg-[var(--dark-pastel-green)]/20 hover:border-[var(--dark-pastel-green)]/30"}
          `}
        >
          <Star size={18} className={location.pathname === "/favorites" ? "text-[var(--dark-pastel-green)]" : "text-[var(--white)]/60"} />
          <span>Favorites</span>
        </Link>
      </nav>

      <div className="mt-auto pt-8 border-t border-[var(--dark-pastel-green)]/15 text-sm text-[var(--white)]/50">
        <p>© 2025 JEE Physics Arena</p>
      </div>
    </aside>
  );
}
