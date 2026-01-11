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
      <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#FFA217]"></div>
      </div>
    );
  }

  const totalProblems = plan.totalProblems || plan.modules.reduce((acc, m) => acc + m.problemIds.length, 0);
  const solvedCount = progress.solvedProblems.length;
  const progressPercent = totalProblems > 0 ? Math.round((solvedCount / totalProblems) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white font-sans flex">
      <ProblemListSidebar />
      
      <div className="flex-1 overflow-y-auto h-screen">
        <div className="max-w-6xl mx-auto p-8">
            {/* Header / Banner */}
            <div className="relative rounded-2xl p-8 mb-8 overflow-hidden bg-[#282828] border border-[#333]">
                {/* Menu Button */}
                {progress.started && (
                    <div className="absolute top-4 right-4 z-20">
                        <button 
                            onClick={() => setShowMenu(!showMenu)}
                            className="p-2 rounded-lg bg-[#333] hover:bg-[#444] text-[#ccc] transition-colors"
                        >
                            <MoreHorizontal size={20} />
                        </button>
                        {showMenu && (
                            <div className="absolute right-0 mt-2 w-48 bg-[#222] border border-[#333] rounded-xl shadow-xl overflow-hidden z-30">
                                <button 
                                    onClick={handleQuitPlan}
                                    className="w-full text-left px-4 py-3 text-red-500 hover:bg-[#282828] flex items-center gap-2 text-sm font-medium"
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
                        <div className="flex items-center gap-2 text-sm text-[#888] mb-1">
                            <Zap size={14} />
                            <span>{plan.modules.length} Modules, {totalProblems} Problems</span>
                        </div>
                        <h1 className="text-3xl font-bold mb-4">{plan.title}</h1>
                        
                        {!progress.started ? (
                            <button 
                                onClick={() => setShowModal(true)}
                                className="px-6 py-2 bg-white text-black rounded-full font-bold text-sm hover:bg-gray-200 transition-colors flex items-center gap-2"
                            >
                                <Play size={16} fill="currentColor" /> Start
                            </button>
                        ) : (
                            <div className="flex items-center gap-4">
                                <div className="w-48 h-2 bg-[#333] rounded-full overflow-hidden">
                                    <div className="h-full bg-[#2DB55D]" style={{ width: `${progressPercent}%` }}></div>
                                </div>
                                <span className="text-sm font-mono text-[#2DB55D]">{progressPercent}%</span>
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
                        <div key={mIdx} className="border border-[#333] rounded-xl overflow-hidden bg-[#1A1A1A]">
                           <button 
                              onClick={() => toggleModule(mIdx)}
                              className="w-full flex items-center justify-between p-4 bg-[#222] hover:bg-[#282828] transition-colors border-b border-[#333]"
                           >
                              <div className="flex items-center gap-3">
                                    {expandedModules[mIdx] ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                                    <h3 className="font-bold text-[15px] text-gray-200">{module.title}</h3>
                              </div>
                              <span className="text-xs text-[#666] font-mono">
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
                                       <div className="divide-y divide-[#282828]">
                                          {module.problemIds.map((problem) => {
                                                const isSolved = progress.solvedProblems.includes(problem._id);
                                                
                                                return (
                                                   <div key={problem._id} className="flex items-center justify-between p-3 pl-10 hover:bg-[#222] transition-colors group">
                                                      <div className="flex items-center gap-3">
                                                            <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${isSolved ? 'bg-[#2DB55D]/20 border-[#2DB55D] text-[#2DB55D]' : 'bg-[#333] border-[#444] text-[#666]'}`}>
                                                               {isSolved ? <CheckCircle size={12} /> : <Circle size={12} />}
                                                            </div>
                                                            <h4 className={`font-medium text-sm ${isSolved ? 'text-[#888]' : 'text-gray-300'}`}>{problem.title}</h4>
                                                      </div>
                                                      <div className="flex items-center gap-4">
                                                         {/* Difficulty Tag */}
                                                         <span className={`
                                                            px-2.5 py-0.5 rounded-full text-xs font-medium capitalize border
                                                            ${problem.difficulty?.toLowerCase() === 'easy' ? 'bg-[#00C896]/15 text-[#00C896] border-[#00C896]/20' : 
                                                              problem.difficulty?.toLowerCase() === 'medium' ? 'bg-[#FFB800]/15 text-[#FFB800] border-[#FFB800]/20' : 
                                                              'bg-[#FF2D55]/15 text-[#FF2D55] border-[#FF2D55]/20'}
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
                    <div className="bg-[#1A1A1A] rounded-xl p-0">
                        <h3 className="font-bold text-lg mb-4">Summary</h3>
                        <ul className="space-y-3">
                            {plan.summary && plan.summary.length > 0 ? plan.summary.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-[#888]">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#666] mt-1.5 shrink-0"></div>
                                    <span>{item}</span>
                                </li>
                            )) : (
                                <li className="text-sm text-[#666]">No summary available.</li>
                            )}
                        </ul>
                    </div>

                    {/* Award Widget */}
                    <div className="bg-[#1A1A1A] rounded-xl p-0 pt-4">
                        <h3 className="font-bold text-lg mb-4">Award</h3>
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-[#282828] border border-[#333] flex items-center justify-center">
                                <Award size={32} className="text-purple-500" />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">{plan.title} Badge</h4>
                                <p className="text-xs text-[#666] mt-1">Complete the study plan to win the badge!</p>
                            </div>
                        </div>
                    </div>

                    {/* Related Widget */}
                    {plan.relatedPlans && plan.relatedPlans.length > 0 && (
                        <div className="bg-[#1A1A1A] rounded-xl p-0 pt-4">
                            <h3 className="font-bold text-lg mb-4">Related</h3>
                            <div className="space-y-4">
                                {plan.relatedPlans.map((rp) => (
                                    <Link key={rp._id} to={`/study-plan/${rp._id}`} className="flex items-center gap-3 group">
                                        <div className="w-10 h-10 rounded-lg bg-[#282828] flex items-center justify-center group-hover:bg-[#333] transition-colors">
                                            <Zap size={18} className="text-blue-500" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm group-hover:text-white transition-colors">{rp.title}</h4>
                                            <p className="text-xs text-[#666]">View Plan</p>
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
