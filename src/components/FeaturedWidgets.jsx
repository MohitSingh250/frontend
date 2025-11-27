import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CalendarDays, Trophy, BookOpen, ArrowRight, Target, GraduationCap } from 'lucide-react';

export default function FeaturedWidgets({ dailyProblem }) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      
      {/* 1. Daily Practice Card */}
      <div 
        onClick={() => dailyProblem && navigate(`/problems/${dailyProblem._id}`)}
        className="
          group relative overflow-hidden rounded-xl cursor-pointer
          bg-[var(--card-bg)] border border-[var(--card-border)]
          hover:border-[var(--dark-pastel-green)]/50
          transition-all duration-300 shadow-sm hover:shadow-md
        "
      >
        <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
           <Target size={80} className="text-[var(--dark-pastel-green)]" />
        </div>
        
        <div className="p-5 relative z-10 h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
               <div className="p-1.5 rounded-lg bg-[var(--dark-pastel-green)]/10 text-[var(--dark-pastel-green)]">
                  <Target size={18} />
               </div>
               <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">Daily Practice</span>
            </div>
            <h3 className="text-lg font-bold text-[var(--white)] line-clamp-2 group-hover:text-[var(--dark-pastel-green)] transition-colors">
              {dailyProblem ? dailyProblem.title : "Loading..."}
            </h3>
          </div>
          
          <div className="flex items-center justify-between mt-4">
             <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                dailyProblem?.difficulty === 'Hard' ? 'bg-red-500/10 text-red-500' :
                dailyProblem?.difficulty === 'Medium' ? 'bg-orange-500/10 text-orange-500' :
                'bg-green-500/10 text-green-500'
             }`}>
                {dailyProblem?.difficulty || 'Easy'}
             </span>
             <span className="text-xs font-medium text-[var(--text-secondary)] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Solve Now <ArrowRight size={12} />
             </span>
          </div>
        </div>
      </div>

      {/* 2. Mock Test Card */}
      <div 
        onClick={() => navigate('/contest')}
        className="
          group relative overflow-hidden rounded-xl cursor-pointer
          bg-[var(--card-bg)] border border-[var(--card-border)]
          hover:border-[var(--orange-peel)]/50
          transition-all duration-300 shadow-sm hover:shadow-md
        "
      >
        <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
           <Trophy size={80} className="text-[var(--orange-peel)]" />
        </div>
        
        <div className="p-5 relative z-10 h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
               <div className="p-1.5 rounded-lg bg-[var(--orange-peel)]/10 text-[var(--orange-peel)]">
                  <Trophy size={18} />
               </div>
               <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">Mock Tests</span>
            </div>
            <h3 className="text-lg font-bold text-[var(--white)] group-hover:text-[var(--orange-peel)] transition-colors">
              Weekly JEE Mock
            </h3>
            <p className="text-xs text-[var(--text-secondary)] mt-1 line-clamp-2">
              Full syllabus test to check your preparation level.
            </p>
          </div>
          
          <div className="mt-4">
             <span className="text-xs font-medium text-[var(--text-secondary)] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                View Tests <ArrowRight size={12} />
             </span>
          </div>
        </div>
      </div>

      {/* 3. Revision Plan Card */}
      <div 
        className="
          group relative overflow-hidden rounded-xl cursor-pointer
          bg-[var(--card-bg)] border border-[var(--card-border)]
          hover:border-blue-500/50
          transition-all duration-300 shadow-sm hover:shadow-md
        "
      >
        <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
           <GraduationCap size={80} className="text-blue-500" />
        </div>
        
        <div className="p-5 relative z-10 h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
               <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-500">
                  <BookOpen size={18} />
               </div>
               <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">Revision Plan</span>
            </div>
            <h3 className="text-lg font-bold text-[var(--white)] group-hover:text-blue-500 transition-colors">
              Mechanics Mastery
            </h3>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              30-day plan to master Rotational Motion & Fluids.
            </p>
          </div>
          
          <div className="w-full bg-[var(--raisin-black)] h-1.5 rounded-full mt-4 overflow-hidden border border-[var(--card-border)]">
             <div className="bg-blue-500 h-full w-[35%] rounded-full" />
          </div>
        </div>
      </div>

    </div>
  );
}
