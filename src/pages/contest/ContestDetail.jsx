import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";
import CountdownTimer from "../../components/CountdownTimer";
import { AuthContext } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Calendar, Clock, Users, Shield, ArrowLeft, PlayCircle, CheckCircle, AlertCircle, Share2, Info, Award, Gift, Star, ChevronRight, Timer, Zap } from "lucide-react";

export default function ContestDetail() {
  const { contestId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [contest, setContest] = useState(null);
  const [joining, setJoining] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    api.get(`/contests/${contestId}`).then((res) => {
      setContest(res.data.contest);
      if (user && res.data.contest.participants) {
        const participant = res.data.contest.participants.find(p => p.userId._id === user._id || p.userId === user._id);
        setIsRegistered(participant || false);
      }
    });
  }, [contestId, user]);

  if (!contest) return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--raisin-black)]">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[var(--dark-pastel-green)]"></div>
    </div>
  );

  const targetTime = new Date(contest.startTime).getTime();
  const endTime = new Date(contest.endTime).getTime();
  const now = Date.now();
  
  const isUpcoming = now < targetTime;
  const isLive = now >= targetTime && now < endTime;
  const isCompleted = now >= endTime;

  const handleJoin = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setJoining(true);
    try {
      await api.post(`/contests/${contestId}/register`);
      setIsRegistered(true);
    } catch (err) {
      console.error(err);
    } finally {
      setJoining(false);
    }
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: Info },
    { id: "rules", label: "Rules", icon: Shield },
    { id: "prizes", label: "Prizes", icon: Gift },
  ];

  return (
    <div className="min-h-screen font-sans pb-20 bg-[var(--raisin-black)] text-[var(--white)] selection:bg-[var(--dark-pastel-green)]/30 transition-colors duration-300">
      
      {/* 1. CINEMATIC HERO HEADER */}
      <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden flex flex-col items-center justify-center text-center">
        <div className="absolute inset-0">
          {contest.bannerImage ? (
             <img src={contest.bannerImage} alt="Banner" className="w-full h-full object-cover opacity-40 scale-105" />
          ) : (
             <img 
               src="https://plus.unsplash.com/premium_photo-1690297733119-5ec06bd95ee9?q=80&w=3132&auto=format&fit=crop" 
               alt="Default Banner" 
               className="w-full h-full object-cover opacity-30 scale-105" 
             />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--raisin-black)]/60 via-[var(--raisin-black)]/80 to-[var(--raisin-black)]" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        </div>

        <div className="relative z-10 px-4 max-w-5xl mx-auto mt-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center gap-3 mb-8">
              {isLive && (
                <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  Live Now
                </span>
              )}
              <span className="px-3 py-1 rounded-full bg-[var(--glass-bg)] backdrop-blur-md border border-[var(--glass-border)] text-[var(--text-secondary)] text-xs font-bold uppercase tracking-widest">
                {contest.type}
              </span>
              <span className="px-3 py-1 rounded-full bg-[var(--glass-bg)] backdrop-blur-md border border-[var(--glass-border)] text-[var(--text-secondary)] text-xs font-bold uppercase tracking-widest">
                {contest.difficulty}
              </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-[var(--white)] mb-8 tracking-tighter drop-shadow-2xl leading-none">
              {contest.title}
            </h1>
            
            <div className="flex flex-wrap justify-center items-center gap-6 text-[var(--white)]/80 text-sm font-medium tracking-wide">
              <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] backdrop-blur-md hover:bg-[var(--white)]/10 transition-colors">
                <Calendar className="w-4 h-4 text-[var(--dark-pastel-green)]" /> 
                {new Date(contest.startTime).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
              </div>
              <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] backdrop-blur-md hover:bg-[var(--white)]/10 transition-colors">
                <Clock className="w-4 h-4 text-[var(--dark-pastel-green)]" />
                {new Date(contest.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 2. MAIN CONTENT GRID */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-20 relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN (CONTENT) - SPAN 8 */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* NAVIGATION TABS */}
          <div className="flex p-1.5 bg-[var(--card-bg)]/80 backdrop-blur-xl border border-[var(--card-border)] rounded-2xl w-fit">
             {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                      isActive ? "bg-[var(--white)] text-[var(--raisin-black)] shadow-lg" : "text-[var(--text-secondary)] hover:text-[var(--white)] hover:bg-[var(--white)]/5"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
             })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-[var(--card-bg)]/40 backdrop-blur-md border border-[var(--card-border)] rounded-3xl p-8 min-h-[400px]"
            >
              {activeTab === "overview" && (
                <div className="space-y-10">
                   <div>
                      <h3 className="text-2xl font-bold mb-4 text-[var(--white)]">About the Contest</h3>
                      <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
                        Welcome to <strong>{contest.title}</strong>. This rated competition is designed to challenge your algorithmic thinking and problem-solving skills. 
                        You will face {contest.problems?.length || "a set of"} problems of varying difficulty.
                      </p>
                   </div>

                   {/* TIMELINE VISUAL */}
                   <div>
                      <h4 className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-6">Contest Timeline</h4>
                      <div className="relative pl-8 border-l-2 border-[var(--card-border)] space-y-8">
                         <div className="relative">
                            <div className="absolute -left-[39px] w-5 h-5 rounded-full bg-[var(--dark-pastel-green)] border-4 border-[var(--raisin-black)]" />
                            <h5 className="text-[var(--white)] font-bold">Start Time</h5>
                            <p className="text-[var(--text-secondary)] text-sm">{new Date(contest.startTime).toLocaleString()}</p>
                         </div>
                         <div className="relative">
                            <div className="absolute -left-[39px] w-5 h-5 rounded-full bg-[var(--white)]/20 border-4 border-[var(--raisin-black)]" />
                            <h5 className="text-[var(--white)] font-bold">End Time</h5>
                            <p className="text-[var(--text-secondary)] text-sm">{new Date(contest.endTime).toLocaleString()}</p>
                         </div>
                      </div>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="p-5 rounded-2xl bg-[var(--glass-border)] border border-[var(--card-border)] hover:border-[var(--white)]/10 transition-colors">
                       <div className="w-10 h-10 rounded-full bg-[var(--dark-pastel-green)]/10 flex items-center justify-center mb-3">
                         <CheckCircle className="w-5 h-5 text-[var(--dark-pastel-green)]" />
                       </div>
                       <h4 className="font-bold text-[var(--white)] mb-1">Scoring Policy</h4>
                       <p className="text-sm text-[var(--text-secondary)]">Points are awarded for each correct submission. Speed acts as a tie-breaker.</p>
                     </div>
                     <div className="p-5 rounded-2xl bg-[var(--glass-border)] border border-[var(--card-border)] hover:border-[var(--white)]/10 transition-colors">
                       <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center mb-3">
                         <AlertCircle className="w-5 h-5 text-red-400" />
                       </div>
                       <h4 className="font-bold text-[var(--white)] mb-1">Penalty System</h4>
                       <p className="text-sm text-[var(--text-secondary)]">Incorrect submissions add a 5-minute penalty to your total time.</p>
                     </div>
                   </div>
                </div>
              )}

              {activeTab === "rules" && (
                <div>
                  <h3 className="text-2xl font-bold mb-8 text-[var(--white)]">Rules & Regulations</h3>
                  <div className="space-y-4">
                    {[
                      "This is an individual contest. Collaboration is strictly prohibited.",
                      "Do not discuss problem statements or solutions publicly during the contest.",
                      "Plagiarism detection systems are active. Any violation will result in disqualification.",
                      "Ensure a stable internet connection. We are not liable for connectivity issues.",
                      "Decisions made by the contest judges are final and binding."
                    ].map((rule, i) => (
                      <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-[var(--glass-border)] border border-[var(--card-border)]">
                        <div className="mt-0.5 w-5 h-5 rounded-full bg-[var(--white)]/10 flex items-center justify-center shrink-0 text-[10px] font-bold text-[var(--white)]/70">
                           {i + 1}
                        </div>
                        <p className="text-[var(--white)]/80 leading-relaxed">{rule}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "prizes" && (
                <div className="space-y-6">
                   <h3 className="text-2xl font-bold mb-6 text-[var(--white)]">Rewards</h3>
                   <div className="grid grid-cols-1 gap-4">
                      <div className="flex items-center gap-6 p-6 rounded-2xl bg-gradient-to-r from-yellow-500/10 to-transparent border border-yellow-500/20 relative overflow-hidden group">
                        <div className="absolute right-0 top-0 w-32 h-32 bg-yellow-500/10 blur-3xl rounded-full -mr-10 -mt-10" />
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-black font-black text-2xl shadow-lg shadow-yellow-500/20 rotate-3 group-hover:rotate-6 transition-transform">1</div>
                        <div>
                          <h4 className="text-xl font-bold text-yellow-400 mb-1">1st Place</h4>
                          <p className="text-[var(--text-secondary)]">Exclusive Orbit Badge + 5000 XP + Profile Spotlight</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6 p-6 rounded-2xl bg-gradient-to-r from-gray-400/10 to-transparent border border-gray-400/20 relative overflow-hidden group">
                         <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center text-black font-black text-2xl shadow-lg shadow-gray-500/20 -rotate-2 group-hover:-rotate-4 transition-transform">2</div>
                         <div>
                           <h4 className="text-xl font-bold text-gray-300 mb-1">2nd Place</h4>
                           <p className="text-[var(--text-secondary)]">Silver Badge + 3000 XP</p>
                         </div>
                      </div>

                      <div className="flex items-center gap-6 p-6 rounded-2xl bg-gradient-to-r from-orange-500/10 to-transparent border border-orange-500/20 relative overflow-hidden group">
                         <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-700 flex items-center justify-center text-black font-black text-2xl shadow-lg shadow-orange-500/20 rotate-1 group-hover:rotate-3 transition-transform">3</div>
                         <div>
                           <h4 className="text-xl font-bold text-orange-400 mb-1">3rd Place</h4>
                           <p className="text-[var(--text-secondary)]">Bronze Badge + 1500 XP</p>
                         </div>
                      </div>
                   </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT COLUMN (MISSION CONTROL) - SPAN 4 */}
        <div className="lg:col-span-4 relative">
          <div className="sticky top-8 space-y-6">
            
            {/* CONTROL PANEL CARD */}
            <div className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] overflow-hidden shadow-2xl">
              {/* Header */}
              <div className="p-6 border-b border-[var(--card-border)] bg-[var(--glass-border)]">
                 <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                       <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-red-500 animate-pulse' : 'bg-[var(--white)]/20'}`} />
                       <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)]">Mission Control</span>
                    </div>
                    <Timer className="w-4 h-4 text-[var(--white)]/30" />
                 </div>
                 <div className="text-center py-4">
                    <div className="text-5xl font-mono font-bold text-[var(--white)] tracking-tighter mb-2">
                       {isCompleted ? "ENDED" : <CountdownTimer target={isLive ? endTime : targetTime} />}
                    </div>
                    <p className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-widest">
                       {isLive ? "Time Remaining" : isUpcoming ? "Starts In" : "Contest Finished"}
                    </p>
                 </div>
              </div>

              {/* Actions */}
              <div className="p-6 space-y-4">
                {isLive && isRegistered ? (
                  isRegistered.isSubmitted ? (
                    <div className="w-full p-5 rounded-xl border border-[var(--dark-pastel-green)]/20 bg-[var(--dark-pastel-green)]/5 text-center">
                      <div className="w-12 h-12 rounded-full bg-[var(--dark-pastel-green)]/20 flex items-center justify-center mx-auto mb-3">
                        <CheckCircle className="w-6 h-6 text-[var(--dark-pastel-green)]" />
                      </div>
                      <h4 className="text-[var(--white)] font-bold mb-1">Submission Received</h4>
                      <p className="text-xs text-[var(--text-secondary)] mb-4">Results at {new Date(contest.endTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                      <button 
                        onClick={() => navigate(`/contest/${contestId}/leaderboard`)}
                        className="text-xs font-bold text-[var(--dark-pastel-green)] hover:underline"
                      >
                        VIEW LEADERBOARD
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => navigate(`/contest/${contestId}/arena`)}
                      className="w-full py-4 rounded-xl font-bold text-lg shadow-[0_0_30px_rgba(44,188,93,0.4)] hover:shadow-[0_0_40px_rgba(44,188,93,0.6)] hover:scale-[1.02] transition-all flex items-center justify-center gap-2 text-black bg-[var(--dark-pastel-green)]"
                    >
                      <PlayCircle className="w-5 h-5" /> ENTER ARENA
                    </button>
                  )
                ) : isUpcoming && isRegistered ? (
                  <div className="w-full py-4 rounded-xl border border-[var(--card-border)] bg-[var(--glass-border)] text-center">
                    <div className="flex items-center justify-center gap-2 text-[var(--dark-pastel-green)] font-bold">
                       <CheckCircle className="w-5 h-5" /> 
                       <span>REGISTERED</span>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] mt-1">We'll notify you when it starts</p>
                  </div>
                ) : !isCompleted ? (
                  <button
                    onClick={handleJoin}
                    disabled={joining}
                    className="w-full py-4 rounded-xl font-bold text-lg shadow-xl hover:scale-[1.02] transition-all text-black bg-[var(--white)] hover:bg-gray-200"
                  >
                    {joining ? "REGISTERING..." : "REGISTER NOW"}
                  </button>
                ) : (
                  <button
                    onClick={() => navigate(`/contest/${contestId}/leaderboard`)}
                    className="w-full py-4 rounded-xl border border-[var(--card-border)] hover:bg-[var(--glass-border)] font-bold transition text-[var(--white)]"
                  >
                    <Award className="w-5 h-5 inline mr-2" /> VIEW LEADERBOARD
                  </button>
                )}

                {/* Stats Row */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                   <div className="p-3 rounded-lg bg-[var(--glass-border)] border border-[var(--card-border)] text-center">
                      <div className="text-xl font-bold text-[var(--white)]">{contest.participants?.length || 0}</div>
                      <div className="text-[10px] font-bold text-[var(--text-secondary)] uppercase">Participants</div>
                   </div>
                   <div className="p-3 rounded-lg bg-[var(--glass-border)] border border-[var(--card-border)] text-center">
                      <div className="text-xl font-bold text-[var(--white)]">{contest.problems?.length || 0}</div>
                      <div className="text-[10px] font-bold text-[var(--text-secondary)] uppercase">Problems</div>
                   </div>
                </div>
              </div>
            </div>

            {/* Secondary Actions */}
            <div className="grid grid-cols-2 gap-4">
               <button className="py-3 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] hover:bg-[var(--glass-border)] transition flex items-center justify-center gap-2 text-sm font-bold text-[var(--text-secondary)] hover:text-[var(--white)]">
                 <Share2 className="w-4 h-4" /> Share
               </button>
               <button 
                 onClick={() => navigate(-1)}
                 className="py-3 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] hover:bg-[var(--glass-border)] transition flex items-center justify-center gap-2 text-sm font-bold text-[var(--text-secondary)] hover:text-[var(--white)]"
               >
                 <ArrowLeft className="w-4 h-4" /> Back
               </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

