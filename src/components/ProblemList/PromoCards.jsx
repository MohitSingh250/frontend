import { ChevronRight } from "lucide-react";

export default function PromoCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Card 1: JEE Advanced Quest */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#2c3e50] to-[#000000] p-5 flex flex-col justify-between h-[140px] shadow-sm group cursor-pointer hover:shadow-md transition-all border border-[var(--border-primary)]">
        <div className="absolute top-0 right-0 p-3 opacity-20">
           <div className="w-24 h-24 bg-white rounded-full blur-3xl"></div>
        </div>
        <div>
          <h3 className="text-lg font-bold text-white leading-tight">JEE Advanced<br/>Quest</h3>
          <p className="text-xs text-white/80 mt-1 font-medium">Master 75 Key Concepts</p>
        </div>
        <button className="self-start px-4 py-1.5 rounded-full bg-white text-black text-xs font-bold shadow-sm group-hover:scale-105 transition-transform">
           Start Now
        </button>
      </div>

      {/* Card 2: Daily Challenge */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[var(--brand-orange)] to-[#e67e22] p-5 flex flex-col justify-between h-[140px] shadow-sm group cursor-pointer hover:shadow-md transition-all border border-[var(--brand-orange)]/30">
         <div className="absolute -right-4 -bottom-4 opacity-10">
            <div className="w-32 h-32 rounded-full border-8 border-white"></div>
         </div>
         <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded bg-white/20 border border-white/30 text-[10px] font-bold uppercase tracking-wider text-white">
                 Daily
              </span>
            </div>
            <h3 className="text-lg font-bold text-white leading-tight">Daily<br/>Challenge</h3>
         </div>
         <button className="self-start px-4 py-1.5 rounded-full bg-white text-[var(--brand-orange)] text-xs font-bold shadow-sm group-hover:scale-105 transition-transform">
            Solve Today
         </button>
      </div>

      {/* Card 3: Top PYQs */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#1a237e] to-[#0d47a1] p-5 flex flex-col justify-between h-[140px] shadow-sm group cursor-pointer hover:shadow-md transition-all border border-blue-500/20">
         <div className="absolute right-4 top-4 opacity-30">
            <div className="w-16 h-16 border-4 border-white rounded-lg rotate-12"></div>
         </div>
         <div>
            <h3 className="text-lg font-bold text-white leading-tight">Top 100<br/>PYQs</h3>
            <p className="text-xs text-white/80 mt-1 font-medium">Most Repeated</p>
         </div>
         <button className="self-start px-4 py-1.5 rounded-full bg-white text-blue-600 text-xs font-bold shadow-sm group-hover:scale-105 transition-transform">
            Practice Now
         </button>
      </div>
    </div>
  );
}
