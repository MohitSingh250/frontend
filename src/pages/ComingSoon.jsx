import React from "react";
import { Link } from "react-router-dom";
import { Construction } from "lucide-react";

export default function ComingSoon({ title = "Coming Soon" }) {
  return (
    <div className="min-h-[calc(100vh-60px)] flex flex-col items-center justify-center p-4 text-center">
      <div className="w-20 h-20 bg-[var(--bg-secondary)] rounded-full flex items-center justify-center mb-6 border border-[var(--border-primary)] shadow-sm">
        <Construction size={40} className="text-[var(--brand-orange)]" />
      </div>
      <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">{title}</h1>
      <p className="text-[var(--text-secondary)] max-w-md mb-8">
        We are working hard to bring you this feature. Stay tuned for updates!
      </p>
      <Link 
        to="/problems" 
        className="px-6 py-2.5 rounded-lg bg-[var(--brand-orange)] text-white font-medium hover:opacity-90 transition-opacity"
      >
        Back to Problems
      </Link>
    </div>
  );
}
