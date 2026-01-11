import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Star, Plus, Trophy, Users, MessageSquare, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MISSION_CATEGORIES = [
  {
    title: "Check-in Missions",
    missions: [
      { id: 1, title: "Daily Check-in", reward: 1, icon: "coin", link: "/problems" },
      { id: 2, title: "30-day Streak Check-in", reward: 30, icon: "coin", link: "/problems" },
      { id: 3, title: "Complete Daily JEE Problem", reward: 10, icon: "coin", link: "/daily" },
      { id: 4, title: "Completing Weekly Premium Challenges", reward: 35, icon: "coin", link: "/problems" }
    ]
  },
  {
    title: "Contribution Missions",
    missions: [
      { id: 5, title: "Contribute a JEE Question", reward: 1000, icon: "coin", link: "/discuss" },
      { id: 6, title: "Contribute a Solution", reward: 100, icon: "coin", link: "/discuss" },
      { id: 7, title: "File Content Issue to Feedback Repo", reward: 100, icon: "coin", link: "/discuss" },
      { id: 8, title: "Report a Contest Violation", reward: 100, icon: "coin", link: "/contests" }
    ]
  },
  {
    title: "Contest Missions",
    missions: [
      { id: 9, title: "Join a Mock Contest", reward: 5, icon: "coin", link: "/contests" },
      { id: 10, title: "Join Biweekly + Weekly Contests in Same Week", reward: 35, icon: "coin", link: "/contests" },
      { id: 11, title: "1st Place in a Contest", reward: 5000, icon: "coin", link: "/contests" },
      { id: 12, title: "2nd Place in a Contest", reward: 2500, icon: "coin", link: "/contests" },
      { id: 13, title: "3rd Place in a Contest", reward: 1000, icon: "coin", link: "/contests" },
      { id: 14, title: "Top 50 in a Contest", reward: 300, icon: "coin", link: "/contests" }
    ]
  }
];

export default function EarnCoins() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] pb-20">
      {/* Hero Section */}
      <div className="relative pt-24 pb-12 px-6 bg-gradient-to-b from-[#282828] to-[var(--bg-primary)] border-b border-[var(--border-primary)]/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center mb-6"
          >
            <div className="relative w-24 h-24">
               <div className="absolute inset-0 bg-[var(--brand-orange)]/10 blur-2xl rounded-full"></div>
               <img 
                 src="/orbit.png" 
                 alt="Orbit Logo" 
                 className="relative w-full h-full object-contain brightness-110"
               />
            </div>
          </motion.div>
          <p className="text-[var(--text-tertiary)] text-sm mb-8">
            Shop in our store or redeem our products for free by using OrbitCoins.
          </p>
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => navigate('/store')}
              className="px-8 py-2.5 rounded-full bg-[#282828] border border-gray-600 text-white font-bold text-sm hover:bg-[#333] transition-all flex items-center gap-2"
            >
              <Trophy size={16} />
              Redeem
            </button>
            <button className="px-8 py-2.5 rounded-full bg-white text-black font-bold text-sm flex items-center gap-2 shadow-lg">
              <Plus size={16} className="text-orange-500" />
              Earn <span className="text-orange-500">OrbitCoin</span>
            </button>
            <button className="px-8 py-2.5 rounded-full bg-[#282828] border border-gray-600 text-white font-bold text-sm hover:bg-[#333] transition-all flex items-center gap-2">
              <Star size={16} />
              Premium
            </button>
          </div>
        </div>
      </div>

      {/* Missions Content */}
      <div className="max-w-6xl mx-auto px-6 mt-16 space-y-20">
        {MISSION_CATEGORIES.map((category, idx) => (
          <div key={idx}>
            <h2 className="text-xl font-medium text-center text-[var(--text-secondary)] mb-12">
              {category.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.missions.map((mission) => (
                <motion.div
                  key={mission.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-[var(--bg-secondary)] rounded-2xl p-6 border border-[var(--border-primary)] shadow-sm hover:shadow-md transition-all flex items-center gap-6 group"
                >
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-b from-yellow-300 to-yellow-500 border border-yellow-600 flex items-center justify-center shadow-sm">
                      <div className="w-6 h-6 rounded-full bg-yellow-200/50"></div>
                    </div>
                    <span className="text-[#F7D49E] font-bold text-sm">+{mission.reward}</span>
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="text-[var(--text-primary)] font-medium text-sm mb-3">
                      {mission.title}
                    </h3>
                    <button 
                      onClick={() => navigate(mission.link)}
                      className="flex items-center gap-1 text-[var(--brand-orange)] text-[10px] font-bold uppercase tracking-wider border border-dashed border-[var(--brand-orange)]/50 px-4 py-1.5 rounded-lg group-hover:bg-[var(--brand-orange)]/5 transition-all"
                    >
                      Go to mission <ChevronRight size={12} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
            {idx < MISSION_CATEGORIES.length - 1 && (
              <div className="mt-20 border-t border-dashed border-[var(--border-primary)]/30"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
