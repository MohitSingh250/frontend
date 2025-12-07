import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[var(--bg-primary)] border-t border-[var(--border-primary)] py-8 mt-auto">
      <div className="max-w-[1200px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[var(--text-secondary)]">
        
        <div className="flex items-center gap-6">
          <span>Copyright © 2025 Orbit</span>
          <Link to="/help" className="hover:text-[var(--text-primary)]">Help Center</Link>
          <Link to="/jobs" className="hover:text-[var(--text-primary)]">Jobs</Link>
          <Link to="/bug-bounty" className="hover:text-[var(--text-primary)]">Bug Bounty</Link>
          <Link to="/students" className="hover:text-[var(--text-primary)]">Students</Link>
          <Link to="/terms" className="hover:text-[var(--text-primary)]">Terms</Link>
          <Link to="/privacy" className="hover:text-[var(--text-primary)]">Privacy Policy</Link>
        </div>

        <div className="flex items-center gap-2">
          <img src="/india-flag.png" alt="India" className="w-5 h-auto opacity-80" />
          <span>India</span>
        </div>
      </div>
    </footer>
  );
}
