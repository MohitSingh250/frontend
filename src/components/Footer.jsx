import React from "react";
import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin, Mail, Globe } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { label: "Problems", path: "/problems" },
      { label: "Contests", path: "/contests" },
      { label: "Leaderboard", path: "/leaderboard" },
      { label: "Daily Challenge", path: "/problems/daily-problem" },
    ],
    support: [
      { label: "Help Center", path: "/help" },
      { label: "Feedback", path: "/feedback" },
      { label: "Bug Bounty", path: "/bug-bounty" },
      { label: "Contact Us", path: "/contact" },
    ],
    legal: [
      { label: "Terms of Service", path: "/terms" },
      { label: "Privacy Policy", path: "/privacy" },
      { label: "Cookie Policy", path: "/cookies" },
    ]
  };

  return (
    <footer className="bg-[var(--bg-primary)] border-t border-[var(--border-primary)] pt-20 pb-10 mt-auto">
      <div className="max-w-[1300px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="text-2xl font-bold text-white tracking-tighter mb-6 block">
              ORBIT<span className="text-[var(--brand-orange)]">.</span>
            </Link>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-xs mb-8 font-light">
              The elite ecosystem for JEE aspirants. Precision-engineered practice, real-time analytics, and a community of future IITians.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/40 hover:text-[var(--brand-orange)] hover:border-[var(--brand-orange)]/30 transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/40 hover:text-[var(--brand-orange)] hover:border-[var(--brand-orange)]/30 transition-all">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/40 hover:text-[var(--brand-orange)] hover:border-[var(--brand-orange)]/30 transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/20 mb-6">Platform</h4>
            <ul className="space-y-4">
              {footerLinks.platform.map((link, i) => (
                <li key={i}>
                  <Link to={link.path} className="text-sm text-[var(--text-secondary)] hover:text-white transition-colors font-light">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/20 mb-6">Support</h4>
            <ul className="space-y-4">
              {footerLinks.support.map((link, i) => (
                <li key={i}>
                  <Link to={link.path} className="text-sm text-[var(--text-secondary)] hover:text-white transition-colors font-light">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/20 mb-6">Legal</h4>
            <ul className="space-y-4">
              {footerLinks.legal.map((link, i) => (
                <li key={i}>
                  <Link to={link.path} className="text-sm text-[var(--text-secondary)] hover:text-white transition-colors font-light">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">
            © {currentYear} Orbit Technologies • All Rights Reserved
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-[10px] font-bold text-white/20 uppercase tracking-widest">
              <Globe className="w-3 h-3" />
              <span>English (US)</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-white/20 uppercase tracking-widest">
              <div className="w-4 h-2.5 bg-orange-500/20 rounded-sm overflow-hidden flex flex-col">
                <div className="h-1/3 bg-[#FF9933]"></div>
                <div className="h-1/3 bg-white flex items-center justify-center"><div className="w-1 h-1 rounded-full bg-blue-900"></div></div>
                <div className="h-1/3 bg-[#138808]"></div>
              </div>
              <span>India</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
