import { BookOpen, Star, GraduationCap } from 'lucide-react';

export default function Sidebar() {
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
        <button
          className="
            w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 
            text-[var(--white)]/70 hover:text-[var(--dark-pastel-green)] 
            hover:bg-[var(--raisin-black)]/50 
            transition duration-200
          "
        >
          <BookOpen size={18} className="text-[var(--white)]/60" />
          <span>All Problems</span>
        </button>

        {/* Study Plan */}
        <button
          className="
            w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 
            text-[var(--white)]/70 hover:text-[var(--orange-peel)] 
            hover:bg-[var(--raisin-black)]/50 
            transition duration-200
          "
        >
          <GraduationCap size={18} className="text-[var(--white)]/60" />
          <span>Study Plan</span>
        </button>

        {/* Favorites (Active) */}
        <button
          className="
            w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 
            text-[var(--white)] bg-[var(--dark-pastel-green)]/20
            border border-[var(--dark-pastel-green)]/30
            hover:bg-[var(--dark-pastel-green)]/25
            transition duration-200
          "
        >
          <Star size={18} className="text-[var(--dark-pastel-green)]" />
          <span>Favorites</span>
        </button>
      </nav>

      <div className="mt-auto pt-8 border-t border-[var(--dark-pastel-green)]/15 text-sm text-[var(--white)]/50">
        <p>© 2025 JEE Physics Arena</p>
      </div>
    </aside>
  );
}
