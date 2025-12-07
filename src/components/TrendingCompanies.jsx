import React, { useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

export default function TrendingCompanies() {
  const [search, setSearch] = useState("");

  const companies = [
    { name: "Google", count: 2174, color: "bg-blue-500" },
    { name: "Uber", count: 426, color: "bg-black" },
    { name: "Amazon", count: 1902, color: "bg-orange-500" },
    { name: "Apple", count: 433, color: "bg-gray-500" },
    { name: "Bloomberg", count: 1146, color: "bg-indigo-500" },
    { name: "Microsoft", count: 1322, color: "bg-blue-600" },
    { name: "Meta", count: 1351, color: "bg-blue-400" },
    { name: "Oracle", count: 335, color: "bg-red-600" },
    { name: "LinkedIn", count: 181, color: "bg-blue-700" },
    { name: "Adobe", count: 327, color: "bg-red-500" },
    { name: "TikTok", count: 414, color: "bg-black" },
    { name: "Visa", count: 111, color: "bg-blue-800" },
    { name: "Citadel", count: 99, color: "bg-blue-900" },
  ];

  const filtered = companies.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-primary)] overflow-hidden shadow-sm">
      <div className="p-4 border-b border-[var(--border-secondary)] flex justify-between items-center bg-[var(--bg-tertiary)]/30">
        <h3 className="font-bold text-[var(--text-primary)] text-sm">Trending Companies</h3>
        <div className="flex gap-1">
           <button className="p-1 rounded hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)]">
              <ChevronLeft size={14} />
           </button>
           <button className="p-1 rounded hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)]">
              <ChevronRight size={14} />
           </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="relative mb-4">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" size={14} />
           <input 
              type="text" 
              placeholder="Search for a company..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-secondary)] rounded-lg pl-9 pr-3 py-2 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-orange)] transition-colors placeholder-[var(--text-tertiary)]"
           />
        </div>

        <div className="flex flex-wrap gap-2">
           {filtered.map(c => (
              <span 
                 key={c.name}
                 className="px-3 py-1.5 rounded-full bg-[var(--bg-tertiary)] hover:bg-[var(--bg-primary)] border border-[var(--border-secondary)] text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer transition-colors flex items-center gap-2"
              >
                 {c.name}
                 <span className="px-1.5 py-0.5 rounded-md bg-[var(--brand-orange)] text-white text-[10px] font-bold">
                    {c.count}
                 </span>
              </span>
           ))}
        </div>
      </div>
    </div>
  );
}
