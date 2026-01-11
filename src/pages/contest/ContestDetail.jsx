import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";
import CountdownTimer from "../../components/CountdownTimer";
import { AuthContext } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { Calendar, Clock, Share2, ArrowLeft, Gift, Megaphone, Trophy, ShieldCheck, AlertCircle } from "lucide-react";

export default function ContestDetail() {
  const { contestId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [contest, setContest] = useState(null);
  const [joining, setJoining] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

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
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[var(--brand-orange)]"></div>
    </div>
  );

  const targetTime = new Date(contest.startTime).getTime();
  const now = Date.now();
  const isUpcoming = now < targetTime;

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

  return (
    <div className="min-h-screen font-sans pb-20 bg-[var(--bg-primary)] text-[var(--text-primary)]">
      
      {/* 1. HERO BANNER */}
      <div className="relative w-full py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-[var(--brand-orange)] opacity-10 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <button 
            onClick={() => navigate(-1)}
            className="mb-8 flex items-center gap-2 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors text-sm font-medium"
          >
            <ArrowLeft size={16} />
            Back to Contests
          </button>

          <div className="flex flex-col lg:flex-row justify-between items-center gap-12 bg-[var(--bg-secondary)]/50 backdrop-blur-xl border border-[var(--border-primary)] p-8 md:p-12 rounded-[3rem] shadow-2xl">
            <div className="flex-1 text-center lg:text-left">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-6">
                <span className="px-4 py-1 rounded-full bg-[var(--brand-orange)] text-black text-[10px] font-black uppercase tracking-widest">
                  Official
                </span>
                <span className="flex items-center gap-1.5 text-[var(--text-tertiary)] text-sm font-bold">
                  <Calendar size={14} />
                  {new Date(contest.startTime).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black text-[var(--text-primary)] mb-8 leading-tight tracking-tight">
                {contest.title}
              </h1>
              
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-[var(--bg-tertiary)]/50 border border-[var(--border-primary)]">
                    <Clock size={24} className="text-[var(--brand-orange)]" />
                  </div>
                  <div>
                    <p className="text-[10px] text-[var(--text-tertiary)] uppercase font-black tracking-widest">Duration</p>
                    <p className="font-bold text-lg text-[var(--text-primary)]">90 Mins</p>
                  </div>
                </div>
                <div className="hidden md:block w-[1px] h-12 bg-[var(--border-primary)]"></div>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-[var(--bg-tertiary)]/50 border border-[var(--border-primary)]">
                    <Trophy size={24} className="text-[#FF375F]" />
                  </div>
                  <div>
                    <p className="text-[10px] text-[var(--text-tertiary)] uppercase font-black tracking-widest">Prizes</p>
                    <p className="font-bold text-lg text-[var(--text-primary)]">Orbit Swag</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Countdown Card */}
            <div className="w-full lg:w-auto p-8 rounded-[2.5rem] bg-[var(--text-primary)]/5 backdrop-blur-md border border-[var(--text-primary)]/10 min-w-[320px] shadow-2xl">
              <p className="text-center text-[var(--text-tertiary)] text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                {isUpcoming ? "Starts In" : "Ends In"}
              </p>
              <div className="text-5xl font-mono font-black text-center text-[var(--text-primary)] mb-8 tracking-tighter">
                <CountdownTimer target={targetTime} />
              </div>
              
              {isRegistered ? (
                <>
                  {now >= targetTime ? (
                    <button 
                      onClick={() => navigate(`/contest/${contestId}/arena${now > new Date(contest.endTime).getTime() ? '?mode=virtual' : ''}`)}
                      className="w-full py-4 rounded-2xl bg-[var(--brand-orange)] text-black font-black uppercase tracking-widest hover:bg-[var(--brand-orange)]/90 transition-all shadow-[0_0_30px_rgba(255,162,23,0.3)]"
                    >
                      {now > new Date(contest.endTime).getTime() ? "Start Virtual Contest" : "Enter Arena"}
                    </button>
                  ) : (
                    <button disabled className="w-full py-4 rounded-2xl bg-[var(--bg-tertiary)] text-[var(--text-tertiary)] font-black uppercase tracking-widest border border-[var(--border-primary)] cursor-not-allowed flex items-center justify-center gap-2">
                      <ShieldCheck size={20} />
                      Registered
                    </button>
                  )}
                </>
              ) : (
                <button 
                  onClick={handleJoin}
                  disabled={joining}
                  className="w-full py-4 rounded-2xl bg-[var(--brand-orange)] text-black font-black uppercase tracking-widest hover:bg-[var(--brand-orange)]/90 transition-all shadow-[0_0_30px_rgba(255,162,23,0.3)] disabled:opacity-50"
                >
                  {joining ? "Registering..." : now > new Date(contest.endTime).getTime() ? "Register for Virtual" : "Register Now"}
                </button>
              )}
              
              <div className="mt-6 flex justify-center">
                <button 
                  onClick={() => navigate(`/contest/${contestId}/leaderboard`)}
                  className="text-xs font-bold text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-2"
                >
                  <Trophy size={14} />
                  View Leaderboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Description */}
            <section>
              <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                <Megaphone size={20} className="text-[var(--brand-orange)]" />
                About Contest
              </h2>
              <div className="prose prose-invert max-w-none text-[var(--text-secondary)]">
                <p>
                  Welcome to the <strong>{contest.title}</strong>! This is a weekly competition designed to test your problem-solving skills in Physics, Chemistry, and Mathematics.
                </p>
                <p>
                  Compete with thousands of other aspirants and climb the global leaderboard. Top performers will be awarded exclusive badges and Orbit merchandise.
                </p>
              </div>
            </section>

            {/* Prizes */}
            <section>
              <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2">
                <Gift size={20} className="text-[#FF375F]" />
                Rewards
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="p-6 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)] flex flex-col items-center text-center hover:border-[var(--brand-orange)] transition-colors group">
                  <div className="w-16 h-16 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                    🎒
                  </div>
                  <h3 className="font-bold text-[var(--text-primary)] mb-1">Orbit Backpack</h3>
                  <p className="text-xs text-[var(--text-tertiary)]">Rank 1 - 3</p>
                </div>
                <div className="p-6 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)] flex flex-col items-center text-center hover:border-[var(--brand-orange)] transition-colors group">
                  <div className="w-16 h-16 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                    🧴
                  </div>
                  <h3 className="font-bold text-[var(--text-primary)] mb-1">Water Bottle</h3>
                  <p className="text-xs text-[var(--text-tertiary)]">Rank 4 - 10</p>
                </div>
                <div className="p-6 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)] flex flex-col items-center text-center hover:border-[var(--brand-orange)] transition-colors group">
                  <div className="w-16 h-16 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                    📓
                  </div>
                  <h3 className="font-bold text-[var(--text-primary)] mb-1">Big O Notebook</h3>
                  <p className="text-xs text-[var(--text-tertiary)]">Lucky Draw</p>
                </div>
              </div>

              <div className="rounded-xl border border-[var(--border-primary)] overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="bg-[var(--bg-secondary)] text-[var(--text-tertiary)] uppercase text-xs">
                    <tr>
                      <th className="px-6 py-3 font-bold">Rank</th>
                      <th className="px-6 py-3 font-bold text-right">Orbit Coins</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-primary)]">
                    <tr className="hover:bg-[var(--bg-tertiary)] transition-colors">
                      <td className="px-6 py-4 font-medium text-[var(--text-primary)]">1st Place</td>
                      <td className="px-6 py-4 text-right text-[var(--brand-orange)] font-bold">5,000 🪙</td>
                    </tr>
                    <tr className="hover:bg-[var(--bg-tertiary)] transition-colors">
                      <td className="px-6 py-4 font-medium text-[var(--text-primary)]">2nd Place</td>
                      <td className="px-6 py-4 text-right text-[var(--brand-orange)] font-bold">2,500 🪙</td>
                    </tr>
                    <tr className="hover:bg-[var(--bg-tertiary)] transition-colors">
                      <td className="px-6 py-4 font-medium text-[var(--text-primary)]">3rd Place</td>
                      <td className="px-6 py-4 text-right text-[var(--brand-orange)] font-bold">1,000 🪙</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
              <div className="flex items-center gap-2 mb-4 text-[var(--text-primary)]">
                <AlertCircle size={18} className="text-[var(--brand-orange)]" />
                <h3 className="font-bold">Rules & Regulations</h3>
              </div>
              <ul className="space-y-4 text-sm text-[var(--text-secondary)]">
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-tertiary)] mt-1.5 shrink-0" />
                  <span>You must register 15 minutes before the contest starts.</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-tertiary)] mt-1.5 shrink-0" />
                  <span>Submissions are evaluated based on test cases passed.</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-tertiary)] mt-1.5 shrink-0" />
                  <span>Plagiarism will lead to immediate disqualification.</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}


