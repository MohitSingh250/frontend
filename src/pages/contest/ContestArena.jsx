import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";
import { AuthContext } from "../../context/AuthContext";
import CountdownTimer from "../../components/CountdownTimer";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Menu, Clock, CheckCircle, X, RotateCcw, HelpCircle, LayoutGrid, User, LogOut, Trophy, ArrowRight, Save } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

export default function ContestArena() {
  const { contestId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [contest, setContest] = useState(null);
  const [problems, setProblems] = useState([]);
  const [activeProblemIndex, setActiveProblemIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { problemId: answer }
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const fetchArena = async () => {
      try {
        const res = await api.get(`/contests/${contestId}`);
        setContest(res.data.contest);
        setProblems(res.data.contest.problems || []);

        // Check if user has already submitted
        if (user && res.data.contest.participants) {
          const participant = res.data.contest.participants.find(p => p.userId._id === user._id || p.userId === user._id);
          if (participant?.isSubmitted) {
            navigate(`/contest/${contestId}`, { replace: true });
          }
        }
      } catch (err) {
        console.error("Failed to load arena", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArena();
  }, [contestId, user]);

  const handleAnswerChange = (val) => {
    const pid = problems[activeProblemIndex]._id;
    setAnswers(prev => ({ ...prev, [pid]: val }));
  };

  const handleClearResponse = () => {
    const pid = problems[activeProblemIndex]._id;
    const newAnswers = { ...answers };
    delete newAnswers[pid];
    setAnswers(newAnswers);
  };

  const handleSaveAndNext = async () => {
    if (activeProblemIndex < problems.length - 1) {
      setActiveProblemIndex(activeProblemIndex + 1);
    }
  };

  const handleSubmit = async () => {
    if (!window.confirm("Are you sure you want to submit the test?")) return;

    setSubmitting(true);
    try {
      const submissions = Object.entries(answers).map(([problemId, answer]) => ({
        problemId,
        answer
      }));

      await api.post("/submissions/bulk", {
        contestId,
        submissions
      });
      
      setShowSuccessModal(true);
    } catch (err) {
      console.error(err);
      const errMsg = err.response?.data?.message || "Submission failed. Please try again.";
      alert(`Error: ${errMsg}`);
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#1A1A1A]">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#FFA217]"></div>
    </div>
  );
  
  if (!contest) return <div className="min-h-screen flex items-center justify-center bg-[#1A1A1A] text-white">Contest not found</div>;

  const activeProblem = problems[activeProblemIndex];
  const currentAnswer = answers[activeProblem._id];

  return (
    <div className="h-screen w-screen flex flex-col bg-[#1A1A1A] text-[#DAE0DE] overflow-hidden font-sans">
      
      {/* SUCCESS MODAL */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="relative w-full max-w-md p-8 rounded-3xl bg-[#282828] border border-[#3E3E3E] shadow-2xl text-center overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-[#FFA217]" />
              <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center bg-[#FFA217]/10">
                <Trophy className="w-10 h-10 text-[#FFA217]" />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-white">Contest Submitted!</h2>
              <p className="text-sm text-[#8A8A8A] mb-8">
                Your responses have been recorded successfully. Check the leaderboard to see your rank.
              </p>
              <button 
                onClick={() => navigate(`/contest/${contestId}`)}
                className="w-full py-3.5 rounded-xl font-bold text-sm text-black bg-[#FFA217] hover:bg-[#ffb347] transition-all shadow-lg flex items-center justify-center gap-2"
              >
                Return to Contest Page <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 1. HEADER */}
      <header className="h-16 shrink-0 bg-[#282828] border-b border-[#3E3E3E] flex items-center justify-between px-4 md:px-6 z-30 shadow-sm relative">
        <div className="flex items-center gap-4 md:gap-6">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center font-bold text-lg md:text-xl shadow-md bg-[#FFA217] text-black shadow-orange-500/20">O</div>
             <div className="hidden md:block">
               <h1 className="font-bold text-lg tracking-tight leading-none text-white">Orbit Arena</h1>
               <span className="text-[10px] text-[#8A8A8A] font-bold uppercase tracking-widest">Professional Exam Suite</span>
             </div>
             <div className="md:hidden">
               <h1 className="font-bold text-base tracking-tight leading-none text-white">Orbit Arena</h1>
             </div>
          </div>
          <div className="h-6 w-px bg-[#3E3E3E] mx-2 hidden md:block"></div>
          <h2 className="text-xs md:text-sm font-medium text-[#8A8A8A] truncate max-w-[150px] md:max-w-[400px]">{contest.title}</h2>
        </div>

        <div className="flex items-center gap-3 md:gap-6">
          <div className="flex items-center gap-3 md:gap-4 px-3 py-1.5 md:px-5 md:py-2 rounded-lg border bg-[#1A1A1A] border-[#3E3E3E]">
            <Clock className="w-4 h-4 md:w-5 md:h-5 text-[#FFA217]" />
            <div className="flex flex-col items-end">
              <span className="text-[8px] md:text-[9px] text-[#8A8A8A] font-bold uppercase tracking-wider leading-none mb-0.5">Time Left</span>
              <CountdownTimer target={new Date(contest.endTime).getTime()} />
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 rounded-lg transition-colors hover:bg-[#3E3E3E] text-[#8A8A8A] hover:text-white"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Desktop Quit Button */}
          <button 
            onClick={() => {
              if (window.confirm("Are you sure you want to quit? Your progress will be saved locally but not submitted.")) {
                navigate(`/contest/${contestId}`);
              }
            }} 
            className="hidden md:flex group items-center gap-2 text-sm font-bold text-[#8A8A8A] hover:text-[#FF375F] transition-colors px-4 py-2 rounded-lg hover:bg-[#FF375F]/10"
          >
            <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" /> Quit
          </button>
        </div>
      </header>

      {/* 2. DASHBOARD BODY */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* LEFT PANEL: Question & Answer */}
        <main className="flex-1 flex flex-col relative min-w-0 bg-[#1A1A1A] transition-colors duration-300">
          
          {/* SCROLLABLE CONTENT AREA */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-12 scroll-smooth">
            <div className="max-w-4xl mx-auto pb-20">
              
              {/* Question Header */}
              <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 md:mb-8 pb-6 border-b border-[#3E3E3E] gap-4">
                <div className="flex items-start gap-4 md:gap-5">
                  <span className="text-4xl md:text-5xl font-black text-[#3E3E3E]/50 tracking-tighter shrink-0 select-none">Q{activeProblemIndex + 1}</span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2">
                      <span className="px-2 md:px-2.5 py-1 rounded-md text-[9px] md:text-[10px] font-bold uppercase tracking-wide border bg-[#FFA217]/10 text-[#FFA217] border-[#FFA217]/20">
                        {activeProblem.inputType === "mcq_single" ? "Single Correct" : "Numeric Value"}
                      </span>
                      <span className={`px-2 md:px-2.5 py-1 rounded-md text-[9px] md:text-[10px] font-bold uppercase tracking-wide border ${
                        activeProblem.difficulty === 'Hard' ? 'border-[#FF375F]/20 text-[#FF375F] bg-[#FF375F]/5' :
                        activeProblem.difficulty === 'Medium' ? 'border-[#FFA217]/20 text-[#FFA217] bg-[#FFA217]/5' :
                        'border-[#2DB55D]/20 text-[#2DB55D] bg-[#2DB55D]/5'
                      }`}>
                        {activeProblem.difficulty || "Medium"}
                      </span>
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-white leading-snug">{activeProblem.title}</h3>
                  </div>
                </div>
                <button className="hidden md:block p-2.5 rounded-full hover:bg-[#3E3E3E] text-[#8A8A8A] hover:text-white transition-all">
                  <HelpCircle className="w-5 h-5" />
                </button>
              </div>

              {/* Question Content */}
              <div className="prose prose-invert max-w-none prose-base md:prose-lg prose-p:leading-relaxed prose-headings:text-white prose-strong:text-white prose-img:rounded-xl prose-img:border prose-img:border-[#3E3E3E] prose-img:shadow-lg mb-12">
                <ReactMarkdown rehypePlugins={[rehypeKatex]}>
                  {activeProblem.statement}
                </ReactMarkdown>
              </div>

              {/* INLINE ANSWER SHEET SECTION */}
              <div className="bg-[#282828]/50 backdrop-blur-md border border-[#3E3E3E] rounded-2xl p-6 md:p-8 shadow-sm mt-8 transition-colors duration-300">
                <h4 className="text-xs font-bold text-[#8A8A8A] uppercase tracking-wider mb-6 border-b border-[#3E3E3E] pb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FFA217]"></span>
                  Answer Sheet
                </h4>
                
                {activeProblem.inputType === "mcq_single" ? (
                  <div className="flex flex-col gap-3">
                    {activeProblem.options?.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => handleAnswerChange(opt.id)}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left group ${
                          currentAnswer === opt.id
                            ? "bg-[#FFA217]/10 border-[#FFA217] shadow-sm"
                            : "bg-[#1A1A1A] border-[#3E3E3E] hover:border-[#FFA217]/50 hover:bg-[#3E3E3E]/50"
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border transition-all ${
                          currentAnswer === opt.id
                            ? "bg-[#FFA217] border-[#FFA217] text-black"
                            : "border-[#3E3E3E] text-[#8A8A8A] group-hover:border-[#FFA217] group-hover:text-[#FFA217]"
                        }`}>
                          {opt.id}
                        </div>
                        <span className={`text-base md:text-lg ${currentAnswer === opt.id ? "text-white font-semibold" : "text-[#DAE0DE]"}`}>
                          {opt.text}
                        </span>
                        {currentAnswer === opt.id && <CheckCircle className="w-5 h-5 text-[#FFA217] ml-auto" />}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="max-w-md">
                    <label className="block text-xs text-[#8A8A8A] uppercase font-bold mb-2">Enter Numeric Value</label>
                    <input 
                      type="number" 
                      step="any"
                      className="w-full bg-[#1A1A1A] border border-[#3E3E3E] rounded-xl px-4 py-4 text-2xl font-mono focus:border-[#FFA217] focus:ring-1 focus:ring-[#FFA217]/50 outline-none transition-all text-white placeholder:text-[#3E3E3E]"
                      placeholder="Enter answer..."
                      value={currentAnswer || ""}
                      onChange={(e) => handleAnswerChange(e.target.value)}
                    />
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-[#3E3E3E]">
                  <button 
                    onClick={handleSaveAndNext}
                    className="px-8 py-3 rounded-xl font-bold text-black bg-[#FFA217] hover:bg-[#ffb347] transition-all shadow-lg flex items-center gap-2"
                  >
                    Save & Next <ChevronRight className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={handleClearResponse}
                    className="px-6 py-3 rounded-xl font-bold text-[#8A8A8A] hover:text-white hover:bg-[#3E3E3E] transition-colors flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" /> Clear Response
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Navigation Bar */}
          <div className="h-16 border-t border-[#3E3E3E] bg-[#282828] flex items-center justify-between px-8 shrink-0 absolute bottom-0 left-0 right-0 z-10 shadow-[0_-4px_20px_rgba(0,0,0,0.2)]">
             <div className="flex gap-4">
                <button 
                  onClick={() => setActiveProblemIndex(Math.max(0, activeProblemIndex - 1))}
                  disabled={activeProblemIndex === 0}
                  className="px-4 py-2 rounded-lg bg-[#3E3E3E] hover:bg-[#4E4E4E] disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium text-[#DAE0DE] transition-colors flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
                <button 
                  onClick={() => setActiveProblemIndex(Math.min(problems.length - 1, activeProblemIndex + 1))}
                  disabled={activeProblemIndex === problems.length - 1}
                  className="px-4 py-2 rounded-lg bg-[#3E3E3E] hover:bg-[#4E4E4E] disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium text-[#DAE0DE] transition-colors flex items-center gap-2"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
             </div>
          </div>
        </main>

        {/* RIGHT PANEL: Sidebar */}
        <AnimatePresence>
          {(sidebarOpen || window.innerWidth >= 768) && (
            <>
              {/* Mobile Overlay */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSidebarOpen(false)}
                className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              />
              
              {/* Sidebar Content */}
              <motion.aside 
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed md:relative right-0 top-0 bottom-0 w-[280px] md:w-[320px] bg-[#282828] border-l border-[#3E3E3E] flex flex-col shadow-2xl md:shadow-none z-50 md:z-auto h-full"
              >
                
                {/* Mobile Sidebar Header */}
                <div className="md:hidden p-4 border-b border-[#3E3E3E] flex items-center justify-between bg-[#282828]">
                  <span className="font-bold text-white">Menu</span>
                  <button onClick={() => setSidebarOpen(false)} className="p-2 text-[#8A8A8A] hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* User Profile */}
                <div className="p-6 border-b border-[#3E3E3E] bg-[#282828]">
                   <div className="flex items-center gap-4 mb-6">
                     <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FFA217] to-[#FF375F] flex items-center justify-center text-white font-bold text-lg shadow-md">
                       {user?.username?.[0]?.toUpperCase() || <User className="w-6 h-6" />}
                     </div>
                     <div>
                       <div className="text-sm font-bold text-white">{user?.username || "Candidate"}</div>
                       <div className="text-[10px] font-mono text-[#8A8A8A] bg-[#1A1A1A] border border-[#3E3E3E] px-1.5 py-0.5 rounded mt-1 inline-block">ID: {user?._id?.slice(-6) || "N/A"}</div>
                     </div>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-3">
                     <div className="p-3 rounded-xl bg-[#1A1A1A] border border-[#3E3E3E] text-center">
                       <div className="text-[9px] text-[#8A8A8A] uppercase font-bold tracking-wider mb-1">Answered</div>
                       <div className="text-xl font-bold text-[#FFA217]">{Object.keys(answers).length}</div>
                     </div>
                     <div className="p-3 rounded-xl bg-[#1A1A1A] border border-[#3E3E3E] text-center">
                       <div className="text-[9px] text-[#8A8A8A] uppercase font-bold tracking-wider mb-1">Remaining</div>
                       <div className="text-xl font-bold text-[#DAE0DE]">{problems.length - Object.keys(answers).length}</div>
                     </div>
                   </div>
                </div>

                {/* Question Palette */}
                <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
                  <div className="flex items-center justify-between mb-4">
                     <h4 className="text-[10px] font-bold text-[#8A8A8A] uppercase tracking-widest flex items-center gap-2">
                       <LayoutGrid className="w-3 h-3" /> Question Palette
                     </h4>
                     <span className="text-[10px] text-[#8A8A8A]">{problems.length} Total</span>
                  </div>
                  
                  <div className="grid grid-cols-5 gap-2.5">
                    {problems.map((p, i) => (
                      <button
                        key={p._id}
                        onClick={() => {
                          setActiveProblemIndex(i);
                          setSidebarOpen(false); // Close drawer on selection (mobile)
                        }}
                         className={`aspect-square rounded-lg flex items-center justify-center text-xs font-bold transition-all relative group ${
                          activeProblemIndex === i
                            ? "ring-2 ring-[#FFA217] ring-offset-2 ring-offset-[#282828] bg-white text-black z-10"
                            : ""
                        } ${
                          answers[p._id]
                            ? "bg-[#2DB55D] text-white shadow-sm"
                            : "bg-[#1A1A1A] border border-[#3E3E3E] text-[#8A8A8A] hover:bg-[#3E3E3E] hover:text-white"
                        }`}
                      >
                        {i + 1}
                        {answers[p._id] && (
                          <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#2DB55D] border-[#282828] rounded-full border-2" />
                        )}
                      </button>
                    ))}
                  </div>
                  
                  <div className="mt-8 space-y-3 p-4 rounded-xl bg-[#1A1A1A] border border-[#3E3E3E]">
                     <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-wide text-[#8A8A8A]">
                       <div className="w-2.5 h-2.5 rounded-full bg-[#2DB55D]"></div>
                       <span>Answered</span>
                     </div>
                     <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-wide text-[#8A8A8A]">
                       <div className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A] border border-[#3E3E3E]"></div>
                       <span>Not Answered</span>
                     </div>
                     <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-wide text-[#8A8A8A]">
                       <div className="w-2.5 h-2.5 rounded-full bg-white ring-1 ring-[#FFA217]"></div>
                       <span>Current</span>
                     </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="p-6 border-t border-[#3E3E3E] bg-[#282828]">
                  <button 
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="w-full py-4 rounded-xl font-bold text-sm text-black bg-[#FFA217] hover:bg-[#ffb347] transition-all shadow-lg shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Submitting..." : "Submit Final Test"}
                  </button>
                  <button 
                    onClick={() => navigate(`/contest/${contestId}`)} 
                    className="md:hidden w-full mt-3 py-3 rounded-xl font-bold text-sm text-[#8A8A8A] hover:text-[#FF375F] transition-colors border border-[#3E3E3E] hover:bg-[#FF375F]/10"
                  >
                    Quit Exam
                  </button>
                </div>

              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

