import { BookOpen, Star, GraduationCap } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#1E1E1E] border-r border-[#2A2A2A] p-6 flex-col hidden md:flex shadow-sm">
      <h2 className="text-xl font-semibold text-gray-100 mb-8 tracking-tight">
        📚 Library
      </h2>

      <nav className="space-y-2">
        {/* All Problems */}
        <button className="w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 text-gray-300 hover:text-[#EAB308] hover:bg-[#2A2A2A] transition">
          <BookOpen size={18} className="text-gray-400" />
          <span>All Problems</span>
        </button>

        {/* Study Plan */}
        <button className="w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 text-gray-300 hover:text-[#EAB308] hover:bg-[#2A2A2A] transition">
          <GraduationCap size={18} className="text-gray-400" />
          <span>Study Plan</span>
        </button>

        {/* Favorites */}
        <button className="w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 text-[#EAB308] bg-[#2A2A2A] hover:bg-[#3A3A3A] transition">
          <Star size={18} className="text-[#EAB308]" />
          <span>Favorites</span>
        </button>
      </nav>

      <div className="mt-auto pt-8 border-t border-[#2A2A2A] text-sm text-gray-500">
        <p>© 2025 AlgoArena</p>
      </div>
    </aside>
  );
}
