import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CalendarDays, Trophy, BookOpen, ArrowRight, Target, GraduationCap, Code2, Database, Terminal } from 'lucide-react';

export default function FeaturedWidgets({ dailyProblem }) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      
      {/* 1. Daily Challenge Card */}
      <div 
        onClick={() => dailyProblem && navigate(`/problems/${dailyProblem._id}`)}
        className="
          group relative overflow-hidden rounded-xl cursor-pointer
          bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-tertiary)]
          border border-[var(--border-primary)]
          hover:border-[var(--brand-orange)]/50
          transition-all duration-300 shadow-sm hover:shadow-md h-[180px]
        "
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--brand-orange)]/5 rounded-full blur-3xl -mr-10 -mt-10" />
        
        <div className="p-5 relative z-10 h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
               <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[var(--brand-orange)]/10 flex items-center justify-center text-[var(--brand-orange)]">
                     <CalendarDays size={18} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">Daily Challenge</span>
               </div>
               <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[var(--brand-orange)] text-white">NEW</span>
            </div>
            <h3 className="text-lg font-bold text-[var(--text-primary)] line-clamp-2 group-hover:text-[var(--brand-orange)] transition-colors">
              {dailyProblem ? dailyProblem.title : "Loading..."}
            </h3>
          </div>
          
          <div className="flex items-center justify-between mt-2">
             <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                   dailyProblem?.difficulty === 'Hard' ? 'bg-red-500/10 text-red-500' :
                   dailyProblem?.difficulty === 'Medium' ? 'bg-orange-500/10 text-orange-500' :
                   'bg-green-500/10 text-green-500'
                }`}>
                   {dailyProblem?.difficulty || 'Easy'}
                </span>
             </div>
             <button className="px-4 py-1.5 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs font-bold hover:opacity-90 transition-opacity">
                Solve Now
             </button>
          </div>
        </div>
      </div>

      {/* 2. Top Interview Questions (Blue Gradient) */}
      <div 
        className="
          group relative overflow-hidden rounded-xl cursor-pointer
          bg-gradient-to-br from-blue-600 to-blue-800
          border border-blue-500/30
          transition-all duration-300 shadow-lg shadow-blue-900/20 h-[180px]
        "
      >
        <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-4 translate-y-4">
           <Code2 size={120} className="text-white" />
        </div>
        
        <div className="p-5 relative z-10 h-full flex flex-col justify-between text-white">
          <div>
            <h3 className="text-xl font-black mb-1">Top Interview Questions</h3>
            <p className="text-blue-100 text-xs font-medium max-w-[80%]">
               Curated list of 150 most asked questions.
            </p>
          </div>
          
          <button className="w-fit px-4 py-2 rounded-lg bg-white text-blue-700 text-xs font-bold hover:bg-blue-50 transition-colors shadow-sm">
             Start Learning
          </button>
        </div>
      </div>

      {/* 3. SQL 50 (Purple Gradient) */}
      <div 
        className="
          group relative overflow-hidden rounded-xl cursor-pointer
          bg-gradient-to-br from-purple-600 to-purple-800
          border border-purple-500/30
          transition-all duration-300 shadow-lg shadow-purple-900/20 h-[180px]
        "
      >
        <div className="absolute right-0 top-0 opacity-20 transform translate-x-4 -translate-y-4">
           <Database size={120} className="text-white" />
        </div>
        
        <div className="p-5 relative z-10 h-full flex flex-col justify-between text-white">
          <div>
             <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded bg-purple-500/30 border border-purple-400/30 text-[10px] font-bold uppercase tracking-wider">
                   Study Plan
                </span>
             </div>
            <h3 className="text-xl font-black mb-1">SQL 50</h3>
            <p className="text-purple-100 text-xs font-medium max-w-[80%]">
               Crack SQL interviews in 50 questions.
            </p>
          </div>
          
          <div className="flex items-center justify-between">
             <button className="px-4 py-2 rounded-lg bg-white text-purple-700 text-xs font-bold hover:bg-purple-50 transition-colors shadow-sm">
                Get Started
             </button>
             <div className="text-right">
                <span className="text-2xl font-black opacity-30">0/50</span>
             </div>
          </div>
        </div>
      </div>

    </div>
  );
}
