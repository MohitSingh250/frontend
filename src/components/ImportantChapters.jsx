import React from 'react';
import { Search, ChevronRight, ChevronLeft, BookOpen, X } from 'lucide-react';

export default function ImportantChapters({ isMobileModal = false, onClose }) {
  const chapters = [
    { name: 'Rotational Motion', subject: 'Physics', count: 120, color: 'bg-blue-500/10 text-blue-500' },
    { name: 'Thermodynamics', subject: 'Physics', count: 95, color: 'bg-blue-500/10 text-blue-500' },
    { name: 'Calculus', subject: 'Maths', count: 210, color: 'bg-red-500/10 text-red-500' },
    { name: 'Organic Chem', subject: 'Chemistry', count: 180, color: 'bg-yellow-500/10 text-yellow-600' },
    { name: 'Electrostatics', subject: 'Physics', count: 85, color: 'bg-blue-500/10 text-blue-500' },
    { name: 'Coordination Comp', subject: 'Chemistry', count: 75, color: 'bg-yellow-500/10 text-yellow-600' },
    { name: 'Probability', subject: 'Maths', count: 110, color: 'bg-red-500/10 text-red-500' },
    { name: 'Optics', subject: 'Physics', count: 130, color: 'bg-blue-500/10 text-blue-500' },
  ];

  const content = (
    <>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-[var(--white)] flex items-center gap-2">
           <BookOpen size={16} className="text-[var(--dark-pastel-green)]" />
           Important Chapters
        </h3>
        {!isMobileModal && (
          <div className="flex gap-1">
             <button className="p-1 rounded hover:bg-[var(--glass-border)] text-[var(--text-secondary)]">
                <ChevronLeft size={14} />
             </button>
             <button className="p-1 rounded hover:bg-[var(--glass-border)] text-[var(--text-secondary)]">
                <ChevronRight size={14} />
             </button>
          </div>
        )}
      </div>

      <div className="relative mb-4">
         <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] w-4 h-4" />
         <input 
            placeholder="Search chapters..." 
            className="w-full bg-[var(--raisin-black)] text-[var(--white)] text-xs rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-[var(--dark-pastel-green)]/50 placeholder-[var(--text-secondary)] border border-[var(--card-border)]"
         />
      </div>

      <div className="flex flex-wrap gap-2">
        {chapters.map((chapter) => (
          <div 
            key={chapter.name}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--raisin-black)] border border-[var(--card-border)] hover:border-[var(--dark-pastel-green)]/30 cursor-pointer transition-all"
          >
            <span className="text-xs font-medium text-[var(--white)]">{chapter.name}</span>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${chapter.color}`}>
               {chapter.count}
            </span>
          </div>
        ))}
      </div>
    </>
  );

  if (isMobileModal) {
    return (
      <>
        <div onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
        <div className="fixed bottom-0 left-0 w-full z-50 bg-[var(--dark-slate-gray)] text-[var(--white)] rounded-t-3xl border-t border-[var(--card-border)] shadow-2xl animate-slide-up p-6">
           <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-[var(--raisin-black)] rounded-full text-[var(--text-secondary)] hover:text-[var(--white)]">
              <X size={20} />
           </button>
           {content}
        </div>
      </>
    );
  }

  return (
    <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl p-4 mt-4 shadow-sm">
      {content}
    </div>
  );
}
