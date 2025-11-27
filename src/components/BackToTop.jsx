import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled upto given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top cordinate to 0
  // make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <div 
          onClick={scrollToTop}
          className="
            fixed bottom-24 right-6 z-50 
            p-3 rounded-full shadow-lg cursor-pointer transition-all duration-300
            bg-[var(--dark-pastel-green)] text-white hover:bg-[var(--aqua)] hover:-translate-y-1
            border border-[var(--white)]/10 backdrop-blur-sm
          "
        >
          <ArrowUp size={24} strokeWidth={2.5} />
        </div>
      )}
    </>
  );
}
