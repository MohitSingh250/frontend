import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";

import { ChevronLeft, Play, Calendar, Zap, Trophy } from "lucide-react";

export default function MyStudyPlan() {
  const navigate = useNavigate();
  const [ongoing, setOngoing] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/study-plans/my");
        setOngoing(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
      <div className="flex-1 p-8 overflow-y-auto h-screen">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <button onClick={() => navigate(-1)} className="p-2 rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--bg-secondary)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors border border-[var(--border-primary)]">
               <ChevronLeft size={20} />
            </button>
            <h1 className="text-2xl font-bold">My Study Plan</h1>
          </div>

          {/* Ongoing Section */}
          <div className="mb-12">
            <h2 className="text-lg font-bold mb-6">Ongoing</h2>
            
            {loading ? (
               <div className="h-32 bg-[var(--bg-tertiary)] rounded-xl animate-pulse"></div>
            ) : ongoing.length > 0 ? (
               <div className="grid grid-cols-1 gap-6">
                  {ongoing.map(progress => {
                     const plan = progress.planId;
                     if (!plan) return null;

                     const totalProblems = plan.totalProblems || 0;
                     const solvedCount = progress.solvedProblems.length;
                     const percent = totalProblems > 0 ? Math.round((solvedCount / totalProblems) * 100) : 0;
                     const schedule = progress.schedule || { daysOfWeek: [] };

                     return (
                        <div key={plan._id} className="flex flex-col md:flex-row gap-6 p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-primary)] hover:border-[var(--brand-orange)]/50 transition-all">
                           {/* Icon */}
                           <div className="w-20 h-20 rounded-xl bg-[var(--bg-tertiary)] flex items-center justify-center text-[var(--accent-blue)] shrink-0 border border-[var(--border-primary)]">
                              <Zap size={32} fill="currentColor" />
                           </div>
                           
                           {/* Content */}
                           <div className="flex-1">
                              <div className="flex justify-between items-start mb-2">
                                 <h3 className="text-xl font-bold">{plan.title}</h3>
                                 <Link 
                                    to={`/study-plan/${plan._id}`}
                                    className="px-6 py-2 rounded-lg bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold text-sm hover:opacity-90 transition-colors flex items-center gap-2"
                                 >
                                    <Play size={14} fill="currentColor" /> Resume
                                 </Link>
                              </div>
                              
                              <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-1">{plan.description}</p>
                              
                              {/* Progress Bar */}
                              <div className="mb-4">
                                 <div className="flex justify-between text-xs mb-1">
                                    <span className="text-[var(--text-primary)] font-medium">{percent}% Completed</span>
                                    <span className="text-[var(--text-tertiary)]">{solvedCount}/{totalProblems}</span>
                                 </div>
                                 <div className="w-full h-2 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                                    <div className="h-full bg-[var(--color-success)]" style={{ width: `${percent}%` }}></div>
                                 </div>
                              </div>

                              {/* Schedule Info */}
                              {schedule.daysOfWeek.length > 0 && (
                                 <div className="flex items-center gap-4 text-xs text-[var(--text-secondary)] bg-[var(--bg-tertiary)] p-3 rounded-lg inline-flex">
                                    <div className="flex items-center gap-2">
                                       <Calendar size={14} />
                                       <span>Schedule:</span>
                                    </div>
                                    <div className="flex gap-1">
                                       {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                                          <span 
                                             key={day} 
                                             className={`w-5 h-5 flex items-center justify-center rounded ${schedule.daysOfWeek.includes(day) ? 'bg-[var(--color-success)] text-[var(--bg-primary)] font-bold' : 'bg-[var(--bg-secondary)] text-[var(--text-tertiary)]'}`}
                                          >
                                             {day[0]}
                                          </span>
                                       ))}
                                    </div>
                                    <div className="pl-4 border-l border-[var(--border-primary)]">
                                       <span className="text-[var(--text-primary)] font-bold">{schedule.problemsPerDay}</span> problems/day
                                    </div>
                                 </div>
                              )}
                           </div>
                        </div>
                     );
                  })}
               </div>
            ) : (
               <div className="text-[var(--text-tertiary)] text-center py-12 bg-[var(--bg-secondary)]/50 rounded-2xl border border-dashed border-[var(--border-primary)]">
                  <p className="mb-4">You haven't started any study plans yet.</p>
                  <Link to="/study-plan" className="text-[var(--color-success)] hover:underline">Browse Plans</Link>
               </div>
            )}
          </div>

          {/* History Section */}
          <div>
            <h2 className="text-lg font-bold mb-6">History</h2>
            <div className="text-[var(--text-tertiary)] text-center py-12 border-2 border-dashed border-[var(--border-primary)] rounded-2xl">
               No completed plans yet.
            </div>
          </div>

        </div>
      </div>

  );
}
