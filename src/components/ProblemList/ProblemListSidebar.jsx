import { Layout, BookOpen, Star, Trophy, Lock } from "lucide-react";

export default function ProblemListSidebar() {
  return (
    <div className="w-[200px] shrink-0 hidden lg:block space-y-6 border-r border-[var(--border-secondary)] pr-4">
      {/* Main Links */}
      <div className="space-y-1">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-primary)] font-medium cursor-pointer">
          <Layout size={18} />
          <span>Question Bank</span>
        </div>
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer">
          <BookOpen size={18} />
          <span>Study Plan</span>
        </div>
      </div>

      {/* Lists Section */}
      <div className="space-y-2">
        <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-tertiary)] px-3">
          My Lists
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer">
            <div className="p-1 bg-[var(--brand-orange)]/10 rounded text-[var(--brand-orange)]">
               <Star size={14} fill="currentColor" />
            </div>
            <span className="flex-1">Favorites</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer">
            <div className="p-1 bg-purple-500/10 rounded text-purple-500">
               <Trophy size={14} />
            </div>
            <span className="flex-1">PYQs</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer">
            <div className="p-1 bg-yellow-500/10 rounded text-yellow-500">
               <Star size={14} fill="currentColor" />
            </div>
            <span className="flex-1">Important Questions</span>
            <Lock size={12} className="text-[var(--text-tertiary)]" />
          </div>
        </div>
      </div>
    </div>
  );
}
