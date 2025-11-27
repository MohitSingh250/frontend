import React from 'react';
import { Search, ChevronRight, ChevronLeft } from 'lucide-react';

export default function TrendingTopics() {
  const companies = [
    { name: 'Google', count: 2169, color: 'bg-blue-500/10 text-blue-400' },
    { name: 'Amazon', count: 1899, color: 'bg-yellow-500/10 text-yellow-400' },
    { name: 'Uber', count: 431, color: 'bg-black/20 text-[var(--white)]' },
    { name: 'Bloomberg', count: 1150, color: 'bg-orange-500/10 text-orange-400' },
    { name: 'Apple', count: 448, color: 'bg-gray-500/10 text-gray-300' },
    { name: 'Oracle', count: 331, color: 'bg-red-500/10 text-red-400' },
    { name: 'Microsoft', count: 1315, color: 'bg-blue-600/10 text-blue-300' },
    { name: 'Meta', count: 1351, color: 'bg-blue-400/10 text-blue-200' },
    { name: 'TikTok', count: 418, color: 'bg-pink-500/10 text-pink-400' },
    { name: 'LinkedIn', count: 181, color: 'bg-blue-700/10 text-blue-300' },
  ];

  return (
    <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl p-4 mt-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-[var(--white)]">Trending Companies</h3>
        <div className="flex gap-1">
           <button className="p-1 rounded hover:bg-[var(--glass-border)] text-[var(--text-secondary)]">
              <ChevronLeft size={14} />
           </button>
           <button className="p-1 rounded hover:bg-[var(--glass-border)] text-[var(--text-secondary)]">
              <ChevronRight size={14} />
           </button>
        </div>
      </div>

      <div className="relative mb-4">
         <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] w-4 h-4" />
         <input 
            placeholder="Search for a company..." 
            className="w-full bg-[var(--glass-border)] text-[var(--white)] text-xs rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-[var(--dark-pastel-green)]/50 placeholder-[var(--text-secondary)]"
         />
      </div>

      <div className="flex flex-wrap gap-2">
        {companies.map((company) => (
          <div 
            key={company.name}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--glass-border)] hover:bg-[var(--white)]/10 cursor-pointer transition-colors"
          >
            <span className="text-xs font-medium text-[var(--white)]">{company.name}</span>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${company.color}`}>
               {company.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
