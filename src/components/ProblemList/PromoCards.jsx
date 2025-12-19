import { useRef } from "react";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";

export default function PromoCards() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 240;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative mb-6 pl-4">
      {/* Carousel Container */}
      <div 
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Card 1: JEE Physics 30 Days Challenge */}
        <div className="relative min-w-[270px] h-[135px] overflow-hidden rounded-lg bg-gradient-to-br from-[#ff9800] to-[#f57c00] p-4 flex flex-col justify-between shrink-0">
          {/* Day Badge */}
          <div className="absolute top-2 right-2 w-14 h-14 bg-white/20 rounded-lg flex flex-col items-center justify-center backdrop-blur-sm border border-white/30">
            <span className="text-[10px] text-white/80 font-medium">DAY</span>
            <span className="text-2xl font-black text-white leading-none">30</span>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-white leading-tight">JEE Physics</h3>
            <p className="text-sm font-semibold text-white/90">30 Days Challenge</p>
            <p className="text-[11px] text-white/70">Beginner Friendly</p>
          </div>
          
          <button className="self-start px-4 py-1.5 rounded-md bg-white text-[#f57c00] text-xs font-bold">
            Start Learning
          </button>
        </div>

        {/* Card 2: JEE Store */}
        <div className="relative min-w-[270px] h-[135px] overflow-hidden rounded-lg bg-gradient-to-br from-[#00bcd4] to-[#00acc1] p-4 flex flex-col justify-between shrink-0">
          <div className="absolute top-3 right-3 opacity-20">
            <BookOpen size={60} className="text-white" />
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-white leading-tight">JEE Premium</h3>
            <p className="text-xl font-bold text-white">Store</p>
          </div>
          
          <button className="self-start px-4 py-1.5 rounded-md bg-white text-[#00acc1] text-xs font-bold">
            Visit Now
          </button>
        </div>

        {/* Card 3: Formula Cheat Sheets */}
        <div className="relative min-w-[270px] h-[135px] overflow-hidden rounded-lg bg-gradient-to-br from-[#7c4dff] to-[#651fff] p-4 flex flex-col justify-between shrink-0">
          <div className="absolute top-0 right-0 w-24 h-24 opacity-20">
            <div className="absolute top-4 right-4 w-12 h-12 border-4 border-white rounded-lg rotate-12" />
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-white leading-tight">Formula Sheets</h3>
            <p className="text-lg font-bold text-white">Quick Revision</p>
            <p className="text-[11px] text-white/80">Physics, Chemistry & Maths</p>
          </div>
          
          <button className="self-start px-4 py-1.5 rounded-md bg-white/20 border border-white/30 text-white text-xs font-bold">
            Download PDF
          </button>
        </div>

        {/* Card 4: Chemistry Organic */}
        <div className="relative min-w-[270px] h-[135px] overflow-hidden rounded-lg bg-gradient-to-br from-[#00c853] to-[#00e676] p-4 flex flex-col justify-between shrink-0">
          {/* Illustration */}
          <div className="absolute top-2 right-2 opacity-30">
            <div className="w-14 h-14 border-4 border-white rounded-full" />
            <div className="w-8 h-8 bg-white/50 rounded-full absolute top-3 right-3" />
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-white leading-tight">Organic</h3>
            <p className="text-lg font-bold text-white">Chemistry</p>
            <p className="text-[11px] text-white/80">100+ Named Reactions</p>
          </div>
          
          <button className="self-start px-4 py-1.5 rounded-md bg-white text-green-600 text-xs font-bold">
            Start
          </button>
        </div>

        {/* Card 5: Maths Calculus */}
        <div className="relative min-w-[270px] h-[135px] overflow-hidden rounded-lg bg-gradient-to-br from-[#e91e63] to-[#f06292] p-4 flex flex-col justify-between shrink-0">
          <div className="absolute top-2 right-2 opacity-20">
            <div className="text-4xl">∫</div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-white leading-tight">Calculus</h3>
            <p className="text-lg font-bold text-white">Masterclass</p>
            <p className="text-[11px] text-white/80">Integration & Differentiation</p>
          </div>
          
          <button className="self-start px-4 py-1.5 rounded-md bg-white text-[#e91e63] text-xs font-bold">
            Explore
          </button>
        </div>
      </div>
    </div>
  );
}
