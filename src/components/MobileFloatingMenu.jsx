import React, { useState, useEffect } from 'react';
import { CalendarDays, BookOpen, ArrowUp, List } from 'lucide-react';

export default function MobileFloatingMenu({ setActiveMobileWidget }) {
  const [showBackToTop, setShowBackToTop] = useState(false);

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
    flex items-center justify-center w-14 h-14 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
    backdrop-blur-md transition-all duration-300 active:scale-90
  `;

  return (
    <div className="fixed bottom-8 right-6 z-50 flex flex-col gap-4 items-center xl:hidden">
      
      {/* ⬆️ Back To Top */}
      <button 
        onClick={scrollToTop}
        className={`
          ${fabClass} bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[var(--text-primary)]
          ${showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
        `}
      >
        <ArrowUp size={24} />
      </button>

      {/* 📖 Important Chapters (Blue as requested) */}
      <button 
        onClick={() => setActiveMobileWidget('chapters')}
        className={`${fabClass} bg-[#3e90ff] text-white shadow-[#3e90ff]/20`}
      >
        <BookOpen size={24} strokeWidth={2.5} />
      </button>

      {/* 📅 Calendar (Green as in screenshot) */}
      <button 
        onClick={() => setActiveMobileWidget('calendar')}
        className={`${fabClass} bg-[#2cbb5d] text-white shadow-[#2cbb5d]/20`}
      >
        <CalendarDays size={24} strokeWidth={2.5} />
      </button>

    </div>
  );
}
