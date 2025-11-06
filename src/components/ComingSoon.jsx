import React, { useEffect, useRef } from 'react';

export default function ContestComingSoon() {
  const starsRef = useRef(null);

  // Star field
  useEffect(() => {
    if (starsRef.current) {
      for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'absolute w-0.5 h-0.5 bg-white rounded-full animate-twinkle';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 70 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (Math.random() * 2 + 2) + 's';
        starsRef.current.appendChild(star);
      }
    }
  }, []);

  return (
    <div className="relative h-screen w-full bg-[#0a0a0a] text-white overflow-hidden flex flex-col items-center justify-center font-[Poppins] tracking-wide">
      {/* Background Layers */}
      <div className="absolute inset-0 bg-gradient-radial from-[#1a1a1a] via-black to-[#0a0a0a]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-gradient-radial from-orange-500/15 to-transparent blur-3xl animate-pulse-light" />
      <div ref={starsRef} className="absolute inset-0 pointer-events-none" />

      {/* Horizon Grid */}
      <div className="absolute bottom-0 left-0 right-0 h-[400px] animate-grid-move pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 140, 0, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 140, 0, 0.08) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          transform: 'perspective(600px) rotateX(60deg)',
          transformOrigin: 'bottom',
        }}
      />



      {/* Scan Lines */}
      <div className="absolute inset-0 pointer-events-none animate-scan"
        style={{
          background: 'linear-gradient(to bottom, transparent 50%, rgba(255,140,0,0.02) 51%)',
          backgroundSize: '100% 4px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl flex flex-col items-center justify-center px-4">
        <div className="inline-flex items-center gap-2 bg-gray-500/10 border border-gray-400/30 px-4 py-2 rounded-full text-sm mb-8 text-white-300">
          <span>Contest Coming Soon</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight leading-tight text-white">
          Get ready to <span className="text-gray-500 italic">create</span> and <span className="text-gray-500 italic">compete</span>
        </h1>

        <p className="text-base md:text-xl text-gray-400 mb-8">
          The contest launches soon.
        </p>

        <button className="bg-gradient-to-r px-8 py-3 rounded-full text-white font-semibold text-base shadow-lg shadow-white-900/20 transition-all border-r-2 duration-300">
          Notify Me
        </button>
      </div>

      <style jsx>{`
        @keyframes twinkle { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
        .animate-twinkle { animation: twinkle 3s ease-in-out infinite; }
        @keyframes pulse-light {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.8; }
        }
        .animate-pulse-light { animation: pulse-light 8s ease-in-out infinite; }
        @keyframes glow { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
        .animate-glow { animation: glow 5s ease-in-out infinite; }
        @keyframes grid-move { 0% { background-position: 0 0; } 100% { background-position: 0 60px; } }
        .animate-grid-move { animation: grid-move 25s linear infinite; }
        @keyframes scan { 0% { background-position: 0 0; } 100% { background-position: 0 100%; } }
        .animate-scan { animation: scan 10s linear infinite; }
        .bg-gradient-radial { background: radial-gradient(ellipse at bottom, #1a1a1a 0%, #000 70%); }
      `}</style>
    </div>
  );
}
