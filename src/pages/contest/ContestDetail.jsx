import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";
import CountdownTimer from "../../components/CountdownTimer";
import { AuthContext } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { Calendar, Clock, Share2, ArrowLeft, Gift, Megaphone } from "lucide-react";

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
      
      {/* Back Button */}
      <div className="max-w-5xl mx-auto px-4 pt-6">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors text-[var(--text-secondary)]"
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--brand-orange)] mb-2">
          {contest.title}
        </h1>
        <div className="flex items-center gap-4 text-[var(--text-secondary)] text-sm mb-6">
          <span>{new Date(contest.startTime).toLocaleString(undefined, { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</span>
          <span className="w-1 h-1 rounded-full bg-[var(--text-secondary)]" />
          <span className="flex items-center gap-2">
            Starts in <CountdownTimer target={targetTime} />
          </span>
        </div>

        <div className="flex flex-wrap gap-3 mb-12">
          {isRegistered ? (
            <>
              {now >= targetTime ? (
                <button 
                  onClick={() => navigate(`/contest/${contestId}/arena`)}
                  className="px-6 py-2 rounded-full bg-[var(--brand-orange)] text-white font-medium hover:opacity-90 transition-opacity shadow-lg shadow-orange-500/20"
                >
                  Enter Arena
                </button>
              ) : (
                <button disabled className="px-6 py-2 rounded-full bg-[var(--bg-secondary)] text-[var(--text-secondary)] font-medium border border-[var(--border-primary)] cursor-default">
                  Registered
                </button>
              )}
            </>
          ) : (
            <button 
              onClick={handleJoin}
              disabled={joining || !isUpcoming}
              className="px-6 py-2 rounded-full bg-[var(--brand-orange)]/10 text-[var(--brand-orange)] font-medium hover:bg-[var(--brand-orange)]/20 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {joining ? "Registering..." : "Register"}
            </button>
          )}
          
          <button 
            onClick={() => navigate(`/contest/${contestId}/leaderboard`)}
            className="px-6 py-2 rounded-full bg-[var(--bg-secondary)] text-[var(--text-primary)] font-medium hover:bg-[var(--bg-tertiary)] transition-colors border border-[var(--border-primary)]"
          >
            Leaderboard
          </button>

          <button className="p-2 rounded-full bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors border border-[var(--border-primary)]">
            <Share2 size={18} />
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Description */}
            <section>
              <h2 className="text-lg font-bold mb-4">Welcome to the {contest.title}</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                This Orbit contest is sponsored by Orbit. Compete to solve problems and climb the leaderboard!
              </p>
            </section>

            {/* Bonus Prizes */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Gift className="text-yellow-500" size={20} />
                <h2 className="text-lg font-bold">Bonus Prizes</h2>
              </div>
              <ul className="list-disc list-inside space-y-2 text-[var(--text-secondary)] text-sm mb-6">
                <li>Contestants ranked <strong>1st – 3rd</strong> will win a Orbit Backpack</li>
                <li>Contestants ranked <strong>4th – 10th</strong> will win a Orbit Water Bottle</li>
                <li>Contestants ranked <strong>79th, 479th, 1024th</strong> will win a Orbit Big O Notebook</li>
              </ul>
              
              <div className="flex justify-center gap-8 py-6">
                <div className="w-24 h-24 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-primary)] flex items-center justify-center">
                   <span className="text-2xl">🎒</span>
                </div>
                <div className="w-24 h-24 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-primary)] flex items-center justify-center">
                   <span className="text-2xl">🧴</span>
                </div>
                <div className="w-24 h-24 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-primary)] flex items-center justify-center">
                   <span className="text-2xl">📓</span>
                </div>
              </div>
            </section>

            {/* Prizes Table */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="text-yellow-500" size={20} />
                <h2 className="text-lg font-bold">Prizes</h2>
              </div>
              <div className="border border-[var(--border-primary)] rounded-xl overflow-hidden">
                <table className="w-full text-sm text-left">
                  <tbody className="divide-y divide-[var(--border-primary)]">
                    <tr className="bg-[var(--bg-secondary)]">
                      <td className="p-4 font-medium">1st Place</td>
                      <td className="p-4 text-right text-[var(--color-medium)] font-bold">5,000 🪙</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">2nd Place</td>
                      <td className="p-4 text-right text-[var(--color-medium)] font-bold">2,500 🪙</td>
                    </tr>
                    <tr className="bg-[var(--bg-secondary)]">
                      <td className="p-4 font-medium">3rd Place</td>
                      <td className="p-4 text-right text-[var(--color-medium)] font-bold">1,000 🪙</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">4th - 50th Place</td>
                      <td className="p-4 text-right text-[var(--color-medium)] font-bold">300 🪙</td>
                    </tr>
                    <tr className="bg-[var(--bg-secondary)]">
                      <td className="p-4 font-medium">Participation</td>
                      <td className="p-4 text-right text-[var(--color-medium)] font-bold">5 🪙</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
              <div className="flex items-center gap-2 mb-4">
                <Megaphone size={18} className="text-[var(--text-secondary)]" />
                <h3 className="font-bold">Announcements</h3>
              </div>
              <p className="text-sm text-[var(--text-secondary)]">
                Users <strong>must register</strong> to participate. We hope you enjoy this contest!
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function Trophy({ className, size }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}

