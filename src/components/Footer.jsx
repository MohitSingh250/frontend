import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: "Help Center", path: "/help" },
    { label: "Jobs", path: "/jobs" },
    { label: "Bug Bounty", path: "/bug-bounty" },
    { label: "Assessment", path: "/assessment" },
    { label: "Students", path: "/students" },
    { label: "Terms", path: "/terms" },
    { label: "Privacy Policy", path: "/privacy" },
  ];

  return (
    <footer className="bg-[#1A1A1A] border-t border-white/5 py-4 mt-auto">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left Side: Copyright and Links */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2 text-[13px] text-white/40">
          <span className="font-medium">Copyright © {currentYear} Orbit</span>
          
          {footerLinks.map((link, index) => (
            <React.Fragment key={link.label}>
              <span className="text-white/10 hidden md:inline">|</span>
              <Link 
                to={link.path} 
                className="hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            </React.Fragment>
          ))}
        </div>

        {/* Right Side: Region/Flag */}
        <div className="flex items-center gap-2 text-[13px] text-white/40">
          <div className="w-5 h-3.5 rounded-sm overflow-hidden flex flex-col shadow-sm border border-white/10">
            <div className="h-1/3 bg-[#FF9933]"></div>
            <div className="h-1/3 bg-white flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-[#000080]"></div>
            </div>
            <div className="h-1/3 bg-[#138808]"></div>
          </div>
          <span className="font-medium">India</span>
        </div>
      </div>
    </footer>
  );
}

