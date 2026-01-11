import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../../api";
import { AuthContext } from "../../context/AuthContext";
import ProblemListSidebar from "../../components/ProblemList/ProblemListSidebar";
import StudyPlanModal from "../../components/StudyPlan/StudyPlanModal";
import { ChevronDown, ChevronRight, CheckCircle, Circle, Play, Lock, Zap, FileText, Award, MoreHorizontal, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

export default function StudyPlanDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [plan, setPlan] = useState(null);
  const [progress, setProgress] = useState({ solvedProblems: [], isCompleted: false, started: false });
  const [loading, setLoading] = useState(true);
  const [expandedModules, setExpandedModules] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pRes = await api.get(`/study-plans/${id}`);
        setPlan(pRes.data);
        
        const initialExpanded = {};
        pRes.data.modules.forEach((m, i) => initialExpanded[i] = true);
        setExpandedModules(initialExpanded);

        if (user) {
          const progRes = await api.get(`/study-plans/${id}/progress`);
          setProgress(progRes.data);
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchData();
  }, [id, user]);

  const toggleModule = (index) => {
    setExpandedModules(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const handleStartProblem = async (problemId) => {
    navigate(`/problems/${problemId}?studyPlanId=${id}`);
  };

  const handleJoinPlan = async (schedule) => {
    try {
      await api.post('/study-plans/join', { planId: id, schedule });
      setProgress(prev => ({ ...prev, started: true }));
      setShowModal(false);
      toast.success("Study plan started!");
    } catch (err) {
      toast.error("Failed to join plan");
    }
  };

  const handleQuitPlan = async () => {
    if (!window.confirm("Are you sure you want to quit this plan? Your progress will be lost.")) return;
    try {
      await api.post('/study-plans/quit', { planId: id });
      setProgress(prev => ({ ...prev, started: false, solvedProblems: [] }));
      setShowMenu(false);
      toast.success("Plan quit successfully");
    } catch (err) {
      toast.error("Failed to quit plan");
    }
  };

  if (loading || !plan) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[var(--brand-orange)]"></div>
      </div>
    );
  }

  const totalProblems = plan.totalProblems || plan.modules.reduce((acc, m) => acc + m.problemIds.length, 0);
  const solvedCount = progress.solvedProblems.length;
  const progressPercent = totalProblems > 0 ? Math.round((solvedCount / totalProblems) * 100) : 0;

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans flex">
      <ProblemListSidebar />
      
      <div className="flex-1 overflow-y-auto h-screen">
        <div className="max-w-6xl mx-auto p-8">
            {/* Header / Banner */}
            <div className="relative rounded-2xl p-8 mb-8 overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
                {/* Menu Button */}
                {progress.started && (
                    <div className="absolute top-4 right-4 z-20">
                        <button 
                            onClick={() => setShowMenu(!showMenu)}
                            className="p-2 rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--bg-primary)] text-[var(--text-secondary)] transition-colors border border-[var(--border-primary)]"
                        >
                            <MoreHorizontal size={20} />
                        </button>
                        {showMenu && (
                            <div className="absolute right-0 mt-2 w-48 bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-xl shadow-xl overflow-hidden z-30">
                                <button 
                                    onClick={handleQuitPlan}
                                    className="w-full text-left px-4 py-3 text-red-500 hover:bg-[var(--bg-tertiary)] flex items-center gap-2 text-sm font-medium"
                                >
                                    <LogOut size={16} /> Quit Plan
                                </button>
                            </div>
                        )}
                    </div>
                )}

                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                    {/* Icon */}
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-900/50">
                        <Zap size={48} className="text-white" />
                    </div>
                    
                    {/* Text */}
                    <div className="flex-1">
                        <div className="flex items-center gap-2 text-sm text-[var(--text-tertiary)] mb-1">
                            <Zap size={14} />
                            <span>{plan.modules.length} Modules, {totalProblems} Problems</span>
                        </div>
                        <h1 className="text-3xl font-bold mb-4 text-[var(--text-primary)]">{plan.title}</h1>
                        
                        {!progress.started ? (
                            <button 
                                onClick={() => setShowModal(true)}
                                className="px-6 py-2 bg-[var(--text-primary)] text-[var(--bg-primary)] rounded-full font-bold text-sm hover:opacity-90 transition-all flex items-center gap-2"
                            >
                                <Play size={16} fill="currentColor" /> Start
                            </button>
                        ) : (
                            <div className="flex items-center gap-4">
                                <div className="w-48 h-2 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                                    <div className="h-full bg-[var(--color-success)]" style={{ width: `${progressPercent}%` }}></div>
                                </div>
                                <span className="text-sm font-mono text-[var(--color-success)]">{progressPercent}%</span>
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-pink-500/10 blur-3xl rounded-full pointer-events-none -translate-y-1/2 translate-x-1/4"></div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
               {/* MAIN CONTENT - MODULES */}
               <div className="flex-1 space-y-4">
                  {plan.modules.map((module, mIdx) => {
                        const moduleSolved = module.problemIds.filter(p => progress.solvedProblems.includes(p._id)).length;
                        return (
                        <div key={mIdx} className="border border-[var(--border-primary)] rounded-xl overflow-hidden bg-[var(--bg-secondary)]">
                           <button 
                              onClick={() => toggleModule(mIdx)}
                              className="w-full flex items-center justify-between p-4 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-secondary)] transition-colors border-b border-[var(--border-primary)]"
                           >
                              <div className="flex items-center gap-3">
                                    {expandedModules[mIdx] ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                                    <h3 className="font-bold text-[15px] text-[var(--text-primary)]">{module.title}</h3>
                              </div>
                              <span className="text-xs text-[var(--text-tertiary)] font-mono">
                                    {moduleSolved} / {module.problemIds.length}
                              </span>
                           </button>

                           <AnimatePresence>
                              {expandedModules[mIdx] && (
                                    <motion.div 
                                       initial={{ height: 0 }} 
                                       animate={{ height: "auto" }} 
                                       exit={{ height: 0 }}
                                       className="overflow-hidden"
                                    >
                                       <div className="divide-y divide-[var(--border-primary)]">
                                          {module.problemIds.map((problem) => {
                                                const isSolved = progress.solvedProblems.includes(problem._id);
                                                
                                                return (
                                                    <div key={problem._id} className="flex items-center justify-between p-3 pl-10 hover:bg-[var(--bg-tertiary)] transition-colors group">
                                                      <div className="flex items-center gap-3">
                                                            <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${isSolved ? 'bg-[var(--color-success)]/20 border-[var(--color-success)] text-[var(--color-success)]' : 'bg-[var(--bg-secondary)] border-[var(--border-primary)] text-[var(--text-tertiary)]'}`}>
                                                               {isSolved ? <CheckCircle size={12} /> : <Circle size={12} />}
                                                            </div>
                                                            <h4 className={`font-medium text-sm ${isSolved ? 'text-[var(--text-secondary)]' : 'text-[var(--text-primary)]'}`}>{problem.title}</h4>
                                                      </div>
                                                      <div className="flex items-center gap-4">
                                                         {/* Difficulty Tag */}
                                                         <span className={`
                                                            px-2.5 py-0.5 rounded-full text-xs font-medium capitalize border
                                                            ${problem.difficulty?.toLowerCase() === 'easy' ? 'bg-[var(--color-easy)]/15 text-[var(--color-easy)] border-[var(--color-easy)]/20' : 
                                                               problem.difficulty?.toLowerCase() === 'medium' ? 'bg-[var(--color-medium)]/15 text-[var(--color-medium)] border-[var(--color-medium)]/20' : 
                                                               'bg-[var(--color-hard)]/15 text-[var(--color-hard)] border-[var(--color-hard)]/20'}
                                                         `}>
                                                            {problem.difficulty}
                                                         </span>
                                                      </div>
                                                   </div>
                                                );
                                          })}
                                       </div>
                                    </motion.div>
                              )}
                           </AnimatePresence>
                        </div>
                     )})}
               </div>

               {/* RIGHT SIDEBAR - WIDGETS */}
               <div className="w-full lg:w-80 space-y-6">
                    {/* Summary Widget */}
                    <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-xl p-6">
                        <h3 className="font-bold text-lg mb-4 text-[var(--text-primary)]">Summary</h3>
                        <ul className="space-y-3">
                            {plan.summary && plan.summary.length > 0 ? plan.summary.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--text-tertiary)] mt-1.5 shrink-0"></div>
                                    <span>{item}</span>
                                </li>
                            )) : (
                                <li className="text-sm text-[var(--text-tertiary)]">No summary available.</li>
                            )}
                        </ul>
                    </div>

                    {/* Award Widget */}
                    <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-xl p-6">
                        <h3 className="font-bold text-lg mb-4 text-[var(--text-primary)]">Award</h3>
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-[var(--bg-tertiary)] border border-[var(--border-primary)] flex items-center justify-center">
                                <Award size={32} className="text-purple-500" />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-[var(--text-primary)]">{plan.title} Badge</h4>
                                <p className="text-xs text-[var(--text-tertiary)] mt-1">Complete the study plan to win the badge!</p>
                            </div>
                        </div>
                    </div>

                    {/* Related Widget */}
                    {plan.relatedPlans && plan.relatedPlans.length > 0 && (
                        <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-xl p-6">
                            <h3 className="font-bold text-lg mb-4 text-[var(--text-primary)]">Related</h3>
                            <div className="space-y-4">
                                {plan.relatedPlans.map((rp) => (
                                    <Link key={rp._id} to={`/study-plan/${rp._id}`} className="flex items-center gap-3 group">
                                        <div className="w-10 h-10 rounded-lg bg-[var(--bg-tertiary)] flex items-center justify-center group-hover:bg-[var(--bg-primary)] transition-colors border border-[var(--border-primary)]">
                                            <Zap size={18} className="text-blue-500" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm text-[var(--text-primary)] group-hover:text-[var(--brand-orange)] transition-colors">{rp.title}</h4>
                                            <p className="text-xs text-[var(--text-tertiary)]">View Plan</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
               </div>
            </div>
        </div>
      </div>

      <StudyPlanModal 
         isOpen={showModal} 
         onClose={() => setShowModal(false)} 
         onConfirm={handleJoinPlan} 
         planTitle={plan.title}
      />
    </div>
  );
}
