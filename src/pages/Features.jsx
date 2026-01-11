import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Features() {
  return (
    <div className="min-h-[calc(100vh-50px)] flex flex-col relative overflow-x-hidden" style={{
      backgroundColor: 'var(--features-bg, var(--bg-primary))',
      color: 'var(--text-primary)'
    }}>
      <style>{`
        :root[data-theme="dark"] {
          --features-bg: #000000;
        }
      `}</style>
      
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 lg:p-24 relative">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-24 relative z-10">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              New features are coming...
            </h1>
            <p className="text-sm md:text-base text-[var(--text-secondary)] max-w-lg leading-relaxed">
              Premium users have early access to the latest new & beta features. Share your feedback to help Orbit become the best problem solving platform for developers.
            </p>
            <div className="pt-4">
              <Link 
                to="/premium"
                className="inline-block px-8 py-3 bg-[var(--brand-orange)] text-white rounded-xl font-bold text-lg hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-[var(--brand-orange)]/20"
              >
                Subscribe
              </Link>
            </div>
          </motion.div>

          {/* Right Image (Gift Box) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center">
              <img 
                src="/store/box.png" 
                alt="New Features Gift" 
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer (One-line) */}
      <footer className="w-full py-6 px-6 md:px-12" style={{
        backgroundColor: 'var(--features-bg, var(--bg-primary))'
      }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-[13px] text-[var(--text-tertiary)]">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-2 gap-y-1">
            <span>Copyright © 2026 Orbit</span>
            <span className="hidden md:inline text-gray-600 mx-1">|</span>
            <Link to="/help" className="hover:text-[var(--text-secondary)] transition-colors">Help Center</Link>
            <span className="hidden md:inline text-gray-600 mx-1">|</span>
            <Link to="/jobs" className="hover:text-[var(--text-secondary)] transition-colors">Jobs</Link>
            <span className="hidden md:inline text-gray-600 mx-1">|</span>
            <Link to="/bug-bounty" className="hover:text-[var(--text-secondary)] transition-colors">Bug Bounty</Link>
            <span className="hidden md:inline text-gray-600 mx-1">|</span>
            <Link to="/assessment" className="hover:text-[var(--text-secondary)] transition-colors">Assessment</Link>
            <span className="hidden md:inline text-gray-600 mx-1">|</span>
            <Link to="/students" className="hover:text-[var(--text-secondary)] transition-colors">Students</Link>
            <span className="hidden md:inline text-gray-600 mx-1">|</span>
            <Link to="/terms" className="hover:text-[var(--text-secondary)] transition-colors">Terms</Link>
            <span className="hidden md:inline text-gray-600 mx-1">|</span>
            <Link to="/privacy" className="hover:text-[var(--text-secondary)] transition-colors">Privacy Policy</Link>
          </div>
          
          <div className="flex items-center gap-2 hover:text-[var(--text-secondary)] cursor-pointer transition-colors">
            <img src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg" alt="India" className="w-4 h-3 object-cover rounded-sm" />
            <span>India</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
