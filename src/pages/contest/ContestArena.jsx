import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";
import CountdownTimer from "../../components/CountdownTimer";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Menu, Clock, CheckCircle, X, Save, RotateCcw, HelpCircle, LayoutGrid, User, LogOut, Trophy, ArrowRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

export default function ContestArena() {
  const { contestId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { theme: globalTheme } = useContext(ThemeContext);

  const [contest, setContest] = useState(null);
  const [problems, setProblems] = useState([]);
  const [activeProblemIndex, setActiveProblemIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { problemId: answer }
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Default closed on mobile
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const darkMode = globalTheme === "dark";

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
      // Transform answers object to array for backend
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
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? "bg-[#0f0f0f]" : "bg-gray-50"}`}>
      <div className={`animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 ${darkMode ? "border-[var(--dark-pastel-green)]" : "border-blue-600"}`}></div>
    </div>
  );
  
  if (!contest) return <div className={`min-h-screen flex items-center justify-center ${darkMode ? "bg-[#0f0f0f] text-white" : "bg-gray-50 text-gray-900"}`}>Contest not found</div>;

  const activeProblem = problems[activeProblemIndex];
  const currentAnswer = answers[activeProblem._id];

  // Dynamic Theme Classes
  const themeStyles = {
    bg: darkMode ? "bg-[#0f0f0f]" : "bg-gray-50",
    text: darkMode ? "text-[#e0e0e0]" : "text-gray-900",
    headerBg: darkMode ? "bg-[#161819]" : "bg-white",
    headerBorder: darkMode ? "border-white/5" : "border-gray-200",
    panelBg: darkMode ? "bg-[#161819]" : "bg-gray-50",
    panelBorder: darkMode ? "border-white/5" : "border-gray-200",
    cardBg: darkMode ? "bg-[#1e2022]/50 backdrop-blur-md" : "bg-white/80 backdrop-blur-md",
    cardBorder: darkMode ? "border-white/5" : "border-gray-200",
    inputBg: darkMode ? "bg-[#0f0f0f]" : "bg-white",
    inputBorder: darkMode ? "border-white/10" : "border-gray-300",
    accent: darkMode ? "var(--dark-pastel-green)" : "#2563eb", // Blue-600
    accentText: darkMode ? "text-[var(--dark-pastel-green)]" : "text-blue-600",
    accentBg: darkMode ? "bg-[var(--dark-pastel-green)]" : "bg-blue-600",
    accentBorder: darkMode ? "border-[var(--dark-pastel-green)]" : "border-blue-600",
    mutedText: darkMode ? "text-white/40" : "text-gray-400",
    subText: darkMode ? "text-white/60" : "text-gray-600",
    hoverBg: darkMode ? "hover:bg-white/5" : "hover:bg-gray-100",
  };

  return (
    <div className={`h-screen w-screen flex flex-col ${themeStyles.bg} ${themeStyles.text} overflow-hidden font-sans transition-colors duration-300`}>
      
      {/* SUCCESS MODAL */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className={`relative w-full max-w-md p-8 rounded-3xl ${darkMode ? "bg-[#161819] border border-white/10" : "bg-white border border-gray-100"} shadow-2xl text-center overflow-hidden`}
            >
              <div className={`absolute top-0 left-0 w-full h-1.5 ${themeStyles.accentBg}`} />
              <div className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center ${darkMode ? "bg-[var(--dark-pastel-green)]/10" : "bg-blue-50"}`}>
                <Trophy className={`w-10 h-10 ${themeStyles.accentText}`} />
              </div>
              <h2 className={`text-2xl font-bold mb-2 ${themeStyles.text}`}>Contest Submitted!</h2>
              <p className={`text-sm ${themeStyles.subText} mb-8`}>
                Your responses have been recorded successfully. Check the leaderboard to see your rank.
              </p>
              <button 
                onClick={() => navigate(`/contest/${contestId}`)}
                className={`w-full py-3.5 rounded-xl font-bold text-sm ${darkMode ? "text-black" : "text-white"} ${themeStyles.accentBg} hover:opacity-90 transition-all shadow-lg flex items-center justify-center gap-2`}
              >
                Return to Contest Page <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 1. HEADER */}
      <header className={`h-16 shrink-0 ${themeStyles.headerBg} border-b ${themeStyles.headerBorder} flex items-center justify-between px-4 md:px-6 z-30 shadow-sm relative transition-colors duration-300`}>
        <div className="flex items-center gap-4 md:gap-6">
          <div className="flex items-center gap-3">
             <div className={`w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center font-bold text-lg md:text-xl shadow-md ${darkMode ? "bg-[var(--dark-pastel-green)] text-black shadow-[0_0_15px_rgba(34,197,94,0.3)]" : "bg-blue-600 text-white shadow-blue-200"}`}>O</div>
             <div className="hidden md:block">
               <h1 className={`font-bold text-lg tracking-tight leading-none ${themeStyles.text}`}>Orbit Arena</h1>
               <span className={`text-[10px] ${darkMode ? "text-white/40" : "text-gray-500"} font-bold uppercase tracking-widest`}>Professional Exam Suite</span>
             </div>
             <div className="md:hidden">
               <h1 className={`font-bold text-base tracking-tight leading-none ${themeStyles.text}`}>Orbit Arena</h1>
             </div>
          </div>
          <div className={`h-6 w-px ${darkMode ? "bg-white/5" : "bg-gray-200"} mx-2 hidden md:block`}></div>
          <h2 className={`text-xs md:text-sm font-medium ${themeStyles.subText} truncate max-w-[150px] md:max-w-[400px]`}>{contest.title}</h2>
        </div>

        <div className="flex items-center gap-3 md:gap-6">
          <div className={`flex items-center gap-3 md:gap-4 px-3 py-1.5 md:px-5 md:py-2 rounded-lg border ${darkMode ? "bg-[#0a0a0a] border-white/5" : "bg-gray-50 border-gray-200"}`}>
            <Clock className={`w-4 h-4 md:w-5 md:h-5 ${themeStyles.accentText}`} />
            <div className="flex flex-col items-end">
              <span className={`text-[8px] md:text-[9px] ${themeStyles.mutedText} font-bold uppercase tracking-wider leading-none mb-0.5`}>Time Left</span>
              <CountdownTimer target={new Date(contest.endTime).getTime()} />
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${themeStyles.hoverBg} ${themeStyles.subText} hover:${themeStyles.text}`}
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Desktop Quit Button */}
          <button 
            onClick={() => navigate(`/contest/${contestId}`)} 
            className={`hidden md:flex group items-center gap-2 text-sm font-bold ${themeStyles.mutedText} hover:text-red-500 transition-colors px-4 py-2 rounded-lg hover:bg-red-500/10`}
          >
            <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" /> Quit
          </button>
        </div>
      </header>

      {/* 2. DASHBOARD BODY (Flex Grow) */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* LEFT PANEL: Question & Answer (Flexible Width) */}
        <main className={`flex-1 flex flex-col relative min-w-0 ${darkMode ? "bg-[#121212]" : "bg-white"} transition-colors duration-300`}>
          
          {/* SCROLLABLE CONTENT AREA */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-12 scroll-smooth">
            <div className="max-w-4xl mx-auto pb-20">
              
              {/* Question Header */}
              <div className={`flex flex-col md:flex-row md:items-start justify-between mb-6 md:mb-8 pb-6 border-b ${themeStyles.panelBorder} gap-4`}>
                <div className="flex items-start gap-4 md:gap-5">
                  <span className={`text-4xl md:text-5xl font-black ${darkMode ? "text-white/5" : "text-gray-100"} tracking-tighter shrink-0 select-none`}>Q{activeProblemIndex + 1}</span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2">
                      <span className={`px-2 md:px-2.5 py-1 rounded-md text-[9px] md:text-[10px] font-bold uppercase tracking-wide border ${darkMode ? "bg-[var(--dark-pastel-green)]/10 text-[var(--dark-pastel-green)] border-[var(--dark-pastel-green)]/20" : "bg-blue-50 text-blue-600 border-blue-100"}`}>
                        {activeProblem.inputType === "mcq_single" ? "Single Correct" : "Numeric Value"}
                      </span>
                      <span className={`px-2 md:px-2.5 py-1 rounded-md text-[9px] md:text-[10px] font-bold uppercase tracking-wide border ${
                        activeProblem.difficulty === 'Hard' ? (darkMode ? 'border-red-500/20 text-red-400 bg-red-500/5' : 'border-red-100 text-red-500 bg-red-50') :
                        activeProblem.difficulty === 'Medium' ? (darkMode ? 'border-yellow-500/20 text-yellow-400 bg-yellow-500/5' : 'border-yellow-100 text-yellow-600 bg-yellow-50') :
                        (darkMode ? 'border-green-500/20 text-green-400 bg-green-500/5' : 'border-green-100 text-green-600 bg-green-50')
                      }`}>
                        {activeProblem.difficulty || "Medium"}
                      </span>
                    </div>
                    <h3 className={`text-lg md:text-xl font-semibold ${themeStyles.text} leading-snug`}>{activeProblem.title}</h3>
                  </div>
                </div>
                <button className={`hidden md:block p-2.5 rounded-full ${themeStyles.hoverBg} ${themeStyles.mutedText} hover:${themeStyles.text} transition-all`}>
                  <HelpCircle className="w-5 h-5" />
                </button>
              </div>

              {/* Question Content */}
              <div className={`prose ${darkMode ? "prose-invert" : "prose-gray"} max-w-none prose-base md:prose-lg prose-p:leading-relaxed prose-headings:${themeStyles.text} prose-strong:${themeStyles.text} prose-img:rounded-xl prose-img:border prose-img:${themeStyles.panelBorder} prose-img:shadow-lg mb-12`}>
                <ReactMarkdown rehypePlugins={[rehypeKatex]}>
                  {activeProblem.statement}
                </ReactMarkdown>
              </div>

              {/* INLINE ANSWER SHEET SECTION */}
              <div className={`${themeStyles.cardBg} border ${themeStyles.cardBorder} rounded-2xl p-6 md:p-8 shadow-sm mt-8 transition-colors duration-300`}>
                <h4 className={`text-xs font-bold ${themeStyles.mutedText} uppercase tracking-wider mb-6 border-b ${themeStyles.cardBorder} pb-2 flex items-center gap-2`}>
                  <span className={`w-2 h-2 rounded-full ${themeStyles.accentBg}`}></span>
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
                            ? `${darkMode ? "bg-[var(--dark-pastel-green)]/10" : "bg-blue-50"} ${themeStyles.accentBorder} shadow-sm`
                            : `${themeStyles.inputBg} ${themeStyles.cardBorder} ${darkMode ? "hover:border-white/20 hover:bg-white/5" : "hover:border-blue-300 hover:bg-blue-50/30"}`
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border transition-all ${
                          currentAnswer === opt.id
                            ? `${themeStyles.accentBg} ${themeStyles.accentBorder} ${darkMode ? "text-black" : "text-white"}`
                            : `${darkMode ? "border-white/20 text-white/40" : "border-gray-300 text-gray-400"} group-hover:${themeStyles.accentBorder} group-hover:${themeStyles.accentText}`
                        }`}>
                          {opt.id}
                        </div>
                        <span className={`text-base md:text-lg ${currentAnswer === opt.id ? `${themeStyles.text} font-semibold` : themeStyles.subText}`}>
                          {opt.text}
                        </span>
                        {currentAnswer === opt.id && <CheckCircle className={`w-5 h-5 ${themeStyles.accentText} ml-auto`} />}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="max-w-md">
                    <label className={`block text-xs ${themeStyles.subText} uppercase font-bold mb-2`}>Enter Numeric Value</label>
                    <input 
                      type="number" 
                      step="any"
                      className={`w-full ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-xl px-4 py-4 text-2xl font-mono focus:${themeStyles.accentBorder} focus:ring-1 focus:ring-opacity-50 outline-none transition-all ${themeStyles.text} placeholder:${darkMode ? "text-white/10" : "text-gray-300"}`}
                      placeholder="Enter answer..."
                      value={currentAnswer || ""}
                      onChange={(e) => handleAnswerChange(e.target.value)}
                    />
                  </div>
                )}

                {/* Action Buttons */}
                <div className={`flex items-center gap-4 mt-8 pt-6 border-t ${themeStyles.cardBorder}`}>
                  <button 
                    onClick={handleSaveAndNext}
                    className={`px-8 py-3 rounded-xl font-bold ${darkMode ? "text-black" : "text-white"} ${themeStyles.accentBg} hover:opacity-90 transition-all shadow-lg flex items-center gap-2`}
                  >
                    Save & Next <ChevronRight className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={handleClearResponse}
                    className={`px-6 py-3 rounded-xl font-bold ${themeStyles.subText} hover:${themeStyles.text} ${themeStyles.hoverBg} transition-colors flex items-center gap-2`}
                  >
                    <RotateCcw className="w-4 h-4" /> Clear Response
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Navigation Bar (Left Side) - Optional, can be removed if buttons are inline */}
          <div className={`h-16 border-t ${themeStyles.panelBorder} ${themeStyles.headerBg} flex items-center justify-between px-8 shrink-0 absolute bottom-0 left-0 right-0 z-10 shadow-[0_-4px_20px_rgba(0,0,0,0.02)] transition-colors duration-300`}>
             <div className="flex gap-4">
                <button 
                  onClick={() => setActiveProblemIndex(Math.max(0, activeProblemIndex - 1))}
                  disabled={activeProblemIndex === 0}
                  className={`px-4 py-2 rounded-lg ${darkMode ? "bg-white/5 hover:bg-white/10" : "bg-gray-100 hover:bg-gray-200"} disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium ${themeStyles.subText} transition-colors flex items-center gap-2`}
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
                <button 
                  onClick={() => setActiveProblemIndex(Math.min(problems.length - 1, activeProblemIndex + 1))}
                  disabled={activeProblemIndex === problems.length - 1}
                  className={`px-4 py-2 rounded-lg ${darkMode ? "bg-white/5 hover:bg-white/10" : "bg-gray-100 hover:bg-gray-200"} disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium ${themeStyles.subText} transition-colors flex items-center gap-2`}
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
             </div>
          </div>
        </main>

        {/* RIGHT PANEL: Sidebar (Drawer on Mobile, Fixed on Desktop) */}
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
                className={`fixed md:relative right-0 top-0 bottom-0 w-[280px] md:w-[320px] ${themeStyles.headerBg} border-l ${themeStyles.panelBorder} flex flex-col shadow-2xl md:shadow-none z-50 md:z-auto h-full transition-colors duration-300`}
              >
                
                {/* Mobile Sidebar Header */}
                <div className={`md:hidden p-4 border-b ${themeStyles.panelBorder} flex items-center justify-between ${themeStyles.panelBg}`}>
                  <span className={`font-bold ${themeStyles.text}`}>Menu</span>
                  <button onClick={() => setSidebarOpen(false)} className={`p-2 ${themeStyles.subText} hover:${themeStyles.text}`}>
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* User Profile */}
                <div className={`p-6 border-b ${themeStyles.panelBorder} ${themeStyles.panelBg}`}>
                   <div className="flex items-center gap-4 mb-6">
                     <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${darkMode ? "from-indigo-500 to-purple-600" : "from-blue-500 to-indigo-600"} flex items-center justify-center text-white font-bold text-lg shadow-md`}>
                       {user?.username?.[0]?.toUpperCase() || <User className="w-6 h-6" />}
                     </div>
                     <div>
                       <div className={`text-sm font-bold ${themeStyles.text}`}>{user?.username || "Candidate"}</div>
                       <div className={`text-[10px] font-mono ${themeStyles.subText} ${themeStyles.cardBg} border ${themeStyles.cardBorder} px-1.5 py-0.5 rounded mt-1 inline-block`}>ID: {user?._id?.slice(-6) || "N/A"}</div>
                     </div>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-3">
                     <div className={`p-3 rounded-xl ${themeStyles.cardBg} border ${themeStyles.cardBorder} text-center`}>
                       <div className={`text-[9px] ${themeStyles.mutedText} uppercase font-bold tracking-wider mb-1`}>Answered</div>
                       <div className={`text-xl font-bold ${themeStyles.accentText}`}>{Object.keys(answers).length}</div>
                     </div>
                     <div className={`p-3 rounded-xl ${themeStyles.cardBg} border ${themeStyles.cardBorder} text-center`}>
                       <div className={`text-[9px] ${themeStyles.mutedText} uppercase font-bold tracking-wider mb-1`}>Remaining</div>
                       <div className={`text-xl font-bold ${themeStyles.subText}`}>{problems.length - Object.keys(answers).length}</div>
                     </div>
                   </div>
                </div>

                {/* Question Palette */}
                <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
                  <div className="flex items-center justify-between mb-4">
                     <h4 className={`text-[10px] font-bold ${themeStyles.mutedText} uppercase tracking-widest flex items-center gap-2`}>
                       <LayoutGrid className="w-3 h-3" /> Question Palette
                     </h4>
                     <span className={`text-[10px] ${themeStyles.mutedText}`}>{problems.length} Total</span>
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
                            ? `ring-2 ${themeStyles.accentBorder} ring-offset-2 ${darkMode ? "ring-offset-[#161819] bg-[#0f0f0f]" : "ring-offset-white bg-gray-900"} text-white z-10`
                            : ""
                        } ${
                          answers[p._id]
                            ? `${darkMode ? "bg-[var(--dark-pastel-green)] text-black" : "bg-green-500 text-white"} shadow-sm`
                            : `${themeStyles.cardBg} border ${themeStyles.cardBorder} ${themeStyles.mutedText} hover:${themeStyles.hoverBg} hover:${themeStyles.text} hover:${themeStyles.panelBorder}`
                        }`}
                      >
                        {i + 1}
                        {answers[p._id] && (
                          <div className={`absolute -top-1 -right-1 w-2 h-2 ${darkMode ? "bg-emerald-400 border-[#161819]" : "bg-green-500 border-white"} rounded-full border-2`} />
                        )}
                      </button>
                    ))}
                  </div>
                  
                  <div className={`mt-8 space-y-3 p-4 rounded-xl ${themeStyles.cardBg} border ${themeStyles.cardBorder}`}>
                     <div className={`flex items-center gap-3 text-[10px] font-bold uppercase tracking-wide ${themeStyles.subText}`}>
                       <div className={`w-2.5 h-2.5 rounded-full ${darkMode ? "bg-[var(--dark-pastel-green)]" : "bg-green-500"}`}></div>
                       <span>Answered</span>
                     </div>
                     <div className={`flex items-center gap-3 text-[10px] font-bold uppercase tracking-wide ${themeStyles.subText}`}>
                       <div className={`w-2.5 h-2.5 rounded-full ${themeStyles.cardBg} border ${themeStyles.cardBorder}`}></div>
                       <span>Not Answered</span>
                     </div>
                     <div className={`flex items-center gap-3 text-[10px] font-bold uppercase tracking-wide ${themeStyles.subText}`}>
                       <div className={`w-2.5 h-2.5 rounded-full ${darkMode ? "bg-[#0f0f0f] ring-1 ring-[var(--dark-pastel-green)]" : "bg-gray-900"}`}></div>
                       <span>Current</span>
                     </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className={`p-6 border-t ${themeStyles.panelBorder} ${themeStyles.panelBg}`}>
                  <button 
                    onClick={handleSubmit}
                    disabled={submitting}
                    className={`w-full py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {submitting ? "Submitting..." : "Submit Final Test"}
                  </button>
                  <button 
                    onClick={() => navigate(`/contest/${contestId}`)} 
                    className={`md:hidden w-full mt-3 py-3 rounded-xl font-bold text-sm ${themeStyles.subText} hover:text-red-500 transition-colors border ${themeStyles.panelBorder} hover:bg-red-500/10`}
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

