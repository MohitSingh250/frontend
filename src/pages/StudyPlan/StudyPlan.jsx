import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import ProblemListSidebar from "../../components/ProblemList/ProblemListSidebar";
import { ChevronRight, Zap, Trophy, Layers, Sparkles, Lock, Target, Atom, Settings, Sigma, ArrowUpRight, Triangle, FlaskConical } from "lucide-react";

export default function StudyPlan() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await api.get("/study-plans");
        setPlans(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
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

  const challenges = plans.filter(p => p.category === 'Challenge');
  const deepDives = plans.filter(p => p.category === 'Deep Dive');
  const intros = plans.filter(p => p.category === 'Intro');
  const featured = plans.filter(p => p.isFeatured);

  // Large Vertical Card (Featured) - Matches "LeetCode 75" style
  const FeaturedCard = ({ plan, colorFrom, colorTo, shadowColor }) => {
    const Icon = getIcon(plan.title);
    return (
      <Link 
        to={`/study-plan/${plan._id}`}
        className={`
          relative overflow-hidden rounded-xl p-6 h-[280px] flex flex-col justify-between 
          bg-gradient-to-br ${colorFrom} ${colorTo}
          transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${shadowColor}
          group border border-white/10
        `}
      >
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-2 text-white tracking-tight">{plan.title}</h3>
          <p className="text-sm text-white/90 font-medium line-clamp-2">{plan.description}</p>
        </div>
        
        {/* Icon Asset - Large and positioned at bottom right */}
        <div className="absolute -bottom-6 -right-6 transform group-hover:scale-110 transition-transform duration-500 rotate-12 opacity-40">
            <Icon size={160} className="text-white drop-shadow-lg" />
        </div>
        <div className="absolute bottom-6 right-6 transform group-hover:scale-110 transition-transform duration-500 z-10">
            <Icon size={64} className="text-white drop-shadow-md" />
        </div>
      </Link>
    );
  };

  // Horizontal Card (Intro / In-Depth) - Matches "In-Depth Topics" style
  const CompactCard = ({ plan, iconBgFrom, iconBgTo, isLocked }) => {
    const Icon = getIcon(plan.title);
    return (
      <Link 
        to={!isLocked ? `/study-plan/${plan._id}` : '#'}
        className="flex items-center gap-4 p-4 rounded-xl bg-[#282828] hover:bg-[#323232] border border-[#333] transition-all group relative overflow-hidden h-[100px]"
      >
        {/* Icon Box - Gradient Background */}
        <div className={`w-16 h-16 rounded-lg flex items-center justify-center shrink-0 bg-gradient-to-br ${iconBgFrom} ${iconBgTo} shadow-lg group-hover:scale-105 transition-transform`}>
           <Icon size={32} className="text-white" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
           <h3 className="font-bold text-gray-100 group-hover:text-white truncate text-base">{plan.title}</h3>
           <p className="text-xs text-[#999] line-clamp-2 mt-1 leading-relaxed">{plan.description}</p>
        </div>

        {/* Lock Icon if needed */}
        {isLocked && <Lock size={16} className="text-[#666] absolute top-4 right-4" />}
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white font-sans flex">
      <ProblemListSidebar />
      
      <div className="flex-1 p-8 overflow-y-auto h-screen">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <h1 className="text-3xl font-bold">Study Plan</h1>
            <Link to="/study-plan/my" className="px-5 py-2 bg-[#282828] hover:bg-[#333] rounded-lg text-sm font-medium text-[#ccc] transition-colors flex items-center gap-2 border border-[#333]">
              My Study Plan <ChevronRight size={16} />
            </Link>
          </div>

          {/* Featured Section */}
          <div className="mb-16">
            <h2 className="text-xl font-bold mb-6 text-white">Featured</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {featured.map((plan, i) => (
                  <FeaturedCard 
                     key={plan._id} 
                     plan={plan} 
                     colorFrom={i % 4 === 0 ? "from-[#007AFF]" : i % 4 === 1 ? "from-[#00C7BE]" : i % 4 === 2 ? "from-[#5856D6]" : "from-[#FF9500]"} 
                     colorTo={i % 4 === 0 ? "to-[#0055B3]" : i % 4 === 1 ? "to-[#008F88]" : i % 4 === 2 ? "to-[#3634A3]" : "to-[#B36900]"}
                     shadowColor={i % 4 === 0 ? "hover:shadow-blue-900/20" : i % 4 === 1 ? "hover:shadow-teal-900/20" : i % 4 === 2 ? "hover:shadow-purple-900/20" : "hover:shadow-orange-900/20"}
                  />
               ))}
               {/* Fallback if no featured */}
               {featured.length === 0 && challenges.slice(0, 2).map((plan, i) => (
                  <FeaturedCard 
                     key={plan._id} 
                     plan={plan} 
                     colorFrom={i % 2 === 0 ? "from-[#00C7BE]" : "from-[#FF9500]"} 
                     colorTo={i % 2 === 0 ? "to-[#008F88]" : "to-[#B36900]"}
                     shadowColor={i % 2 === 0 ? "hover:shadow-teal-900/20" : "hover:shadow-orange-900/20"}
                  />
               ))}
            </div>
          </div>

          {/* Introduction To */}
          {intros.length > 0 && (
            <div className="mb-16">
                <h2 className="text-xl font-bold mb-6 text-white">Introduction To</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {intros.map((plan, i) => (
                        <CompactCard 
                            key={plan._id} 
                            plan={plan} 
                            iconBgFrom="from-teal-500"
                            iconBgTo="to-teal-700"
                        />
                    ))}
                </div>
            </div>
          )}

          {/* 30 Days Challenge */}
          {challenges.length > 0 && (
            <div className="mb-16">
                <div className="flex items-center gap-2 mb-6">
                   <h2 className="text-xl font-bold bg-blue-600/20 text-blue-400 px-3 py-1 rounded-lg inline-block border border-blue-500/30">30 Days Challenge</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {challenges.map((plan, i) => (
                        <CompactCard 
                            key={plan._id} 
                            plan={plan} 
                            iconBgFrom={i % 2 === 0 ? "from-blue-500" : "from-indigo-500"}
                            iconBgTo={i % 2 === 0 ? "to-blue-700" : "to-indigo-700"}
                        />
                    ))}
                </div>
            </div>
          )}

          {/* In-Depth Topics */}
          {deepDives.length > 0 && (
            <div className="mb-16">
                <h2 className="text-xl font-bold mb-6 text-white">In-Depth Topics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {deepDives.map((plan, i) => (
                        <CompactCard 
                            key={plan._id} 
                            plan={plan} 
                            iconBgFrom={i % 2 === 0 ? "from-purple-500" : "from-orange-500"}
                            iconBgTo={i % 2 === 0 ? "to-purple-700" : "to-orange-700"}
                        />
                    ))}
                    {/* Dummy Locked Card for Visual Match */}
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-[#282828] border border-[#333] opacity-60 cursor-not-allowed relative overflow-hidden h-[100px]">
                        <div className="w-16 h-16 rounded-lg flex items-center justify-center shrink-0 bg-gradient-to-br from-red-500 to-red-700 shadow-lg">
                           <Layers size={24} className="text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                           <h3 className="font-bold text-gray-200 truncate text-base">Advanced DP</h3>
                           <p className="text-xs text-[#999] line-clamp-2 mt-1 leading-relaxed">Master Dynamic Programming with 8 Advanced Patterns</p>
                        </div>
                        <Lock size={16} className="text-[#666] absolute top-4 right-4" />
                    </div>
                </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
