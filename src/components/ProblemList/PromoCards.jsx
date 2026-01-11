import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { Target, FlaskConical, Settings, Sigma, ArrowUpRight, Triangle, Zap, Sparkles, Map, ChevronLeft, ChevronRight } from "lucide-react";

export default function PromoCards() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await api.get("/study-plans");
        // Get featured plans (first 4)
        const featured = res.data.filter(p => p.isFeatured).slice(0, 4);
        setPlans(featured);
      } catch (err) {
        console.error("Failed to fetch promo plans", err);
      }
    };
    fetchPlans();
  }, []);

  const getIcon = (title) => {
    if (title.includes("Sprint")) return Target;
    if (title.includes("Organic") || title.includes("Mole")) return FlaskConical;
    if (title.includes("Mechanics") || title.includes("Physics")) return Settings;
    if (title.includes("Calculus")) return Sigma;
    if (title.includes("Trigonometry")) return Triangle;
    if (title.includes("Vector")) return ArrowUpRight;
    if (title.includes("Electro")) return Zap;
    return Sparkles;
  };

  const getGradient = (index) => {
    const gradients = [
      "from-[#FF7F50] to-[#FF4500]", // Orange
      "from-[#00C853] to-[#00E676]", // Green
      "from-[#007AFF] to-[#0055B3]", // Blue
      "from-[#E91E63] to-[#F06292]", // Pink
    ];
    return gradients[index % gradients.length];
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative mb-8 group">
      {/* Scroll Buttons */}
      <button 
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-[var(--bg-secondary)]/50 text-[var(--text-primary)] rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 hover:bg-[var(--bg-secondary)]/70"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-[var(--bg-secondary)]/50 text-[var(--text-primary)] rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 hover:bg-[var(--bg-secondary)]/70"
      >
        <ChevronRight size={24} />
      </button>

      <div 
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* 1. Quest Card (Fixed) */}
        <div 
          onClick={() => navigate('/quest')}
          className="relative w-[270px] h-[135px] overflow-hidden rounded-xl shrink-0 cursor-pointer hover:scale-[1.02] transition-transform shadow-lg"
          style={{
            backgroundImage: 'url(/store/quest_card.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Empty - image has all content */}
        </div>

        {/* 2. Dynamic Study Plan Cards */}
        {plans.map((plan, i) => {
          const Icon = getIcon(plan.title);
          return (
            <div 
              key={plan._id}
              onClick={() => navigate(`/study-plan/${plan._id}`)}
              className={`relative w-[270px] h-[135px] overflow-hidden rounded-xl bg-gradient-to-br ${getGradient(i)} p-5 flex flex-col justify-between shrink-0 cursor-pointer hover:scale-[1.02] transition-transform shadow-lg`}
            >
              <div className="absolute -bottom-4 -right-4 opacity-20 rotate-12">
                <Icon size={100} className="text-white" />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-1">
                   <span className="px-2 py-0.5 bg-white/20 backdrop-blur rounded text-[10px] font-bold tracking-wider uppercase text-white">PLAN</span>
                </div>
                <h3 className="text-lg font-bold text-white leading-tight line-clamp-1">{plan.title}</h3>
                <p className="text-xs text-white/90 font-medium mt-1 line-clamp-1">{plan.description}</p>
              </div>
              
              <button className="self-start px-4 py-1.5 rounded-full bg-[var(--bg-primary)]/90 text-[var(--text-primary)] text-xs font-bold shadow-sm">
                Start Learning
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
