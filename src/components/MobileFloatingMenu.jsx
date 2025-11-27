import React, { useState, useEffect } from 'react';
import { CalendarDays, BookOpen, ArrowUp } from 'lucide-react';

export default function MobileFloatingMenu({ setActiveMobileWidget }) {
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Scroll listener for Back to Top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.pageYOffset > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fabClass = `
    flex items-center justify-center w-12 h-12 rounded-full shadow-lg backdrop-blur-md
    border border-[var(--white)]/10 transition-all duration-300 active:scale-95
  `;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-center xl:hidden">
      
      {/* ⬆️ Back To Top (Conditional) */}
      <div 
        onClick={scrollToTop}
        className={`
          ${fabClass} bg-[var(--dark-pastel-green)] text-white
          ${showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
        `}
      >
        <ArrowUp size={20} strokeWidth={2.5} />
      </div>

      {/* 📖 Important Chapters */}
      <div 
        onClick={() => setActiveMobileWidget('chapters')}
        className={`${fabClass} bg-[var(--dark-slate-gray)]/90 text-[var(--white)] hover:bg-[var(--raisin-black)]`}
      >
        <BookOpen size={20} className="text-blue-400" />
      </div>

      {/* 📅 Calendar */}
      <div 
        onClick={() => setActiveMobileWidget('calendar')}
        className={`${fabClass} bg-[var(--dark-slate-gray)]/90 text-[var(--white)] hover:bg-[var(--raisin-black)]`}
      >
        <CalendarDays size={20} className="text-[var(--orange-peel)]" />
      </div>

    </div>
  );
}
