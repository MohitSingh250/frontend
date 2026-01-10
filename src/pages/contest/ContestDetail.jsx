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
    <div className="min-h-screen flex items-center justify-center bg-[#1A1A1A]">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#FFA217]"></div>
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
    <div className="min-h-screen font-sans pb-20 bg-[#1A1A1A] text-[#DAE0DE]">
      
      {/* 1. HERO BANNER */}
      <div className="relative w-full bg-[#282828] border-b border-[#3E3E3E] overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        <div className="absolute -right-20 -top-20 w-[600px] h-[600px] bg-[#FFA217] opacity-5 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto px-6 py-12 relative z-10">
          <button 
            onClick={() => navigate(-1)}
            className="mb-8 flex items-center gap-2 text-[#8A8A8A] hover:text-white transition-colors text-sm font-medium"
          >
            <ArrowLeft size={16} />
            Back to Contests
          </button>

          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-[#FFA217]/10 text-[#FFA217] text-xs font-bold border border-[#FFA217]/20 uppercase tracking-wider">
                  Official Contest
                </span>
                <span className="flex items-center gap-1.5 text-[#8A8A8A] text-sm">
                  <Calendar size={14} />
                  {new Date(contest.startTime).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                {contest.title}
              </h1>
              
              <div className="flex items-center gap-6 text-[#DAE0DE]">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-[#3E3E3E]">
                    <Clock size={20} className="text-[#FFA217]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#8A8A8A] uppercase font-bold">Duration</p>
                    <p className="font-medium">90 Minutes</p>
                  </div>
                </div>
                <div className="w-[1px] h-10 bg-[#3E3E3E]"></div>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-[#3E3E3E]">
                    <Trophy size={20} className="text-[#FF375F]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#8A8A8A] uppercase font-bold">Prizes</p>
                    <p className="font-medium">Orbit Swag</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Countdown Card */}
            <div className="w-full md:w-auto p-6 rounded-2xl bg-[#1A1A1A]/50 backdrop-blur-sm border border-[#3E3E3E] min-w-[300px]">
              <p className="text-center text-[#8A8A8A] text-sm font-medium uppercase tracking-wider mb-4">
                {isUpcoming ? "Contest Starts In" : "Contest Ends In"}
              </p>
              <div className="text-4xl font-mono font-bold text-center text-white mb-6 tracking-widest">
                <CountdownTimer target={targetTime} />
              </div>
              
              {isRegistered ? (
                <>
                  {now >= targetTime ? (
                    <button 
                      onClick={() => navigate(`/contest/${contestId}/arena`)}
                      className="w-full py-3 rounded-xl bg-[#FFA217] text-black font-bold hover:bg-[#ffb347] transition-all shadow-lg shadow-orange-500/20"
                    >
                      Enter Arena
                    </button>
                  ) : (
                    <button disabled className="w-full py-3 rounded-xl bg-[#3E3E3E] text-[#8A8A8A] font-bold border border-[#3E3E3E] cursor-not-allowed flex items-center justify-center gap-2">
                      <ShieldCheck size={18} />
                      Registered
                    </button>
                  )}
                </>
              ) : (
                <button 
                  onClick={handleJoin}
                  disabled={joining || !isUpcoming}
                  className="w-full py-3 rounded-xl bg-[#FFA217] text-black font-bold hover:bg-[#ffb347] transition-all shadow-lg shadow-orange-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {joining ? "Registering..." : "Register Now"}
                </button>
              )}
              
              <div className="mt-4 flex justify-center">
                <button 
                  onClick={() => navigate(`/contest/${contestId}/leaderboard`)}
                  className="text-sm text-[#8A8A8A] hover:text-white transition-colors underline decoration-[#3E3E3E] underline-offset-4"
                >
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
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Megaphone size={20} className="text-[#FFA217]" />
                About Contest
              </h2>
              <div className="prose prose-invert max-w-none text-[#DAE0DE]">
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
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Gift size={20} className="text-[#FF375F]" />
                Rewards
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="p-6 rounded-xl bg-[#282828] border border-[#3E3E3E] flex flex-col items-center text-center hover:border-[#FFA217] transition-colors group">
                  <div className="w-16 h-16 rounded-full bg-[#3E3E3E] flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                    🎒
                  </div>
                  <h3 className="font-bold text-white mb-1">Orbit Backpack</h3>
                  <p className="text-xs text-[#8A8A8A]">Rank 1 - 3</p>
                </div>
                <div className="p-6 rounded-xl bg-[#282828] border border-[#3E3E3E] flex flex-col items-center text-center hover:border-[#FFA217] transition-colors group">
                  <div className="w-16 h-16 rounded-full bg-[#3E3E3E] flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                    🧴
                  </div>
                  <h3 className="font-bold text-white mb-1">Water Bottle</h3>
                  <p className="text-xs text-[#8A8A8A]">Rank 4 - 10</p>
                </div>
                <div className="p-6 rounded-xl bg-[#282828] border border-[#3E3E3E] flex flex-col items-center text-center hover:border-[#FFA217] transition-colors group">
                  <div className="w-16 h-16 rounded-full bg-[#3E3E3E] flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                    📓
                  </div>
                  <h3 className="font-bold text-white mb-1">Big O Notebook</h3>
                  <p className="text-xs text-[#8A8A8A]">Lucky Draw</p>
                </div>
              </div>

              <div className="rounded-xl border border-[#3E3E3E] overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="bg-[#282828] text-[#8A8A8A] uppercase text-xs">
                    <tr>
                      <th className="px-6 py-3 font-bold">Rank</th>
                      <th className="px-6 py-3 font-bold text-right">Orbit Coins</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#3E3E3E]">
                    <tr className="hover:bg-[#282828] transition-colors">
                      <td className="px-6 py-4 font-medium text-white">1st Place</td>
                      <td className="px-6 py-4 text-right text-[#FFA217] font-bold">5,000 🪙</td>
                    </tr>
                    <tr className="hover:bg-[#282828] transition-colors">
                      <td className="px-6 py-4 font-medium text-white">2nd Place</td>
                      <td className="px-6 py-4 text-right text-[#FFA217] font-bold">2,500 🪙</td>
                    </tr>
                    <tr className="hover:bg-[#282828] transition-colors">
                      <td className="px-6 py-4 font-medium text-white">3rd Place</td>
                      <td className="px-6 py-4 text-right text-[#FFA217] font-bold">1,000 🪙</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-[#282828] border border-[#3E3E3E]">
              <div className="flex items-center gap-2 mb-4 text-white">
                <AlertCircle size={18} className="text-[#FFA217]" />
                <h3 className="font-bold">Rules & Regulations</h3>
              </div>
              <ul className="space-y-4 text-sm text-[#8A8A8A]">
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3E3E3E] mt-1.5 shrink-0" />
                  <span>You must register 15 minutes before the contest starts.</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3E3E3E] mt-1.5 shrink-0" />
                  <span>Submissions are evaluated based on test cases passed.</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3E3E3E] mt-1.5 shrink-0" />
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


