import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Target, BarChart3, Users, Atom, FlaskConical, Calculator, ShieldCheck, ArrowRight, Zap, Globe, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api";

export default function Home() {
  const [stats, setStats] = useState({
    totalProblems: 5000,
    totalUsers: 10000,
    totalSubmissions: 2400000,
    activeContests: 2
  });
  const [activeUsers, setActiveUsers] = useState(42);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/advanced/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch global stats:", err);
      }
    };
    fetchStats();

    // Simulate live activity
    const interval = setInterval(() => {
      setActiveUsers(prev => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] }
    }
  };

  return (
    <div className="w-full bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-x-hidden font-sans selection:bg-[var(--brand-orange)]/30">
      
      {/* 1. Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 pb-24 overflow-hidden border-b border-[var(--border-primary)] noise-bg bg-[var(--bg-primary)]">
        {/* Dynamic Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-[var(--brand-orange)]/[0.08] via-transparent to-[var(--accent-blue)]/[0.08]"></div>
          
          {/* Animated Orbit Paths */}
          <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50%" cy="50%" r="30%" fill="none" stroke="url(#orbit-grad)" strokeWidth="1" strokeDasharray="4 12" className="animate-[spin_60s_linear_infinite]" />
            <circle cx="50%" cy="50%" r="45%" fill="none" stroke="url(#orbit-grad)" strokeWidth="1" strokeDasharray="2 16" className="animate-[spin_90s_linear_infinite_reverse]" />
            <defs>
              <linearGradient id="orbit-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--brand-orange)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="var(--accent-blue)" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Content */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="z-10"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[var(--bg-tertiary)]/30 border border-[var(--border-primary)] backdrop-blur-xl text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--brand-orange)] mb-12 glow-text">
              <div className="w-2 h-2 rounded-full bg-[var(--brand-orange)] animate-pulse shadow-[0_0_10px_var(--brand-orange)]"></div>
              <span>The Elite JEE Ecosystem</span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl md:text-8xl font-bold mb-8 tracking-tighter leading-[0.9] text-[var(--text-primary)]">
              Precision <br />
              <span className="text-gradient">Engineering</span> <br />
              <span className="text-gradient-orange">for JEE.</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-xl text-[var(--text-secondary)] mb-12 max-w-xl leading-relaxed font-light">
              Master Physics, Chemistry, and Mathematics with the most advanced practice platform. Designed by IITians for the next generation of top rankers.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-6">
              <Link 
                to="/signup"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-12 py-5 rounded-2xl bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-white font-bold text-lg transition-all shadow-[0_20px_40px_-10px_rgba(255,162,23,0.3)] hover:scale-[1.02] active:scale-[0.98]"
              >
                Join the Elite <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/problems"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-12 py-5 rounded-2xl glass-button font-bold text-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Explore Arena
              </Link>
            </motion.div>

            {/* Live Activity Ticker */}
            <motion.div variants={itemVariants} className="mt-20 flex items-center gap-5 py-4 px-6 rounded-[2rem] bg-[var(--bg-secondary)] border border-[var(--border-primary)] w-fit backdrop-blur-sm">
               <div className="flex -space-x-3">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="w-10 h-10 rounded-full border-4 border-[var(--bg-primary)] bg-[var(--bg-tertiary)] flex items-center justify-center text-xs font-bold text-[var(--text-tertiary)]">
                     {String.fromCharCode(64 + i)}
                   </div>
                 ))}
               </div>
               <div className="text-sm text-[var(--text-secondary)]">
                 <AnimatePresence mode="wait">
                   <motion.span 
                    key={activeUsers}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-[var(--text-primary)] font-bold"
                   >
                     {activeUsers}
                   </motion.span>
                 </AnimatePresence>
                 <span className="ml-1">aspirants currently solving problems</span>
               </div>
            </motion.div>
          </motion.div>

          {/* Right: High-Fidelity Preview */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.85, rotateY: 15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.4, ease: [0.23, 1, 0.32, 1] }}
            className="relative hidden lg:block perspective-card"
          >
            <div className="perspective-card-inner relative z-10 w-full aspect-[16/10] bg-[var(--bg-secondary)] rounded-[3rem] border border-[var(--border-primary)] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] overflow-hidden group">
               {/* Mockup Header */}
               <div className="h-14 bg-[var(--bg-tertiary)] border-b border-[var(--border-primary)] flex items-center justify-between px-8">
                  <div className="flex gap-2.5">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56]"></div>
                    <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e]"></div>
                    <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f]"></div>
                  </div>
                  <div className="text-[10px] font-bold text-[var(--text-tertiary)] uppercase tracking-[0.4em]">Orbit Arena Live v2.4</div>
               </div>
               {/* Mockup Body */}
               <div className="p-10 flex flex-col gap-10">
                  <div className="flex items-center justify-between">
                    <div className="space-y-3">
                      <div className="h-6 w-80 bg-[var(--bg-tertiary)] rounded-xl"></div>
                      <div className="h-4 w-40 bg-[var(--bg-tertiary)]/50 rounded-lg"></div>
                    </div>
                    <div className="h-12 w-32 bg-[var(--brand-orange)]/10 rounded-2xl border border-[var(--brand-orange)]/20 flex items-center justify-center text-xs font-bold text-[var(--brand-orange)] tracking-widest">
                      02:45:12
                    </div>
                  </div>
                  <div className="space-y-5">
                    <div className="h-4 w-full bg-[var(--bg-tertiary)]/50 rounded-lg"></div>
                    <div className="h-4 w-full bg-[var(--bg-tertiary)]/50 rounded-lg"></div>
                    <div className="h-4 w-4/5 bg-[var(--bg-tertiary)]/50 rounded-lg"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-8 mt-6">
                    <div className="h-40 rounded-3xl border border-[var(--border-primary)] bg-[var(--bg-tertiary)]/30 p-6 flex flex-col justify-between group-hover:bg-[var(--bg-tertiary)]/50 transition-colors">
                       <div className="w-10 h-10 rounded-xl bg-[var(--bg-tertiary)] flex items-center justify-center"><Zap className="w-5 h-5 text-[var(--brand-orange)]" /></div>
                       <div className="h-3 w-1/2 bg-[var(--bg-tertiary)]/50 rounded-md"></div>
                    </div>
                    <div className="h-40 rounded-3xl border border-[var(--border-primary)] bg-[var(--bg-tertiary)]/30 p-6 flex flex-col justify-between group-hover:bg-[var(--bg-tertiary)]/50 transition-colors">
                       <div className="w-10 h-10 rounded-xl bg-[var(--bg-tertiary)] flex items-center justify-center"><Award className="w-5 h-5 text-[var(--accent-blue)]" /></div>
                       <div className="h-3 w-1/2 bg-[var(--bg-tertiary)]/50 rounded-md"></div>
                    </div>
                  </div>
               </div>
               {/* Overlay Glow */}
               <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-[var(--text-primary)]/[0.03] pointer-events-none"></div>
               
               {/* Floating Elements */}
               <div className="absolute top-1/2 -right-20 w-64 h-64 bg-[var(--brand-orange)]/10 blur-[100px] rounded-full"></div>
            </div>
            
            {/* Background Accents */}
            <div className="absolute -top-24 -right-24 w-[130%] h-[130%] bg-gradient-to-br from-[var(--brand-orange)]/10 to-transparent blur-[140px] -z-10"></div>
          </motion.div>
        </div>
      </section>

      {/* 2. Subjects Section */}
      <section className="py-24 md:py-40 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-10">
            <div className="max-w-3xl">
              <h2 className="text-4xl md:text-7xl font-bold mb-8 text-[var(--text-primary)] tracking-tighter">Master the <span className="text-[var(--brand-orange)]">Core.</span></h2>
              <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed font-light">
                Deep-dive into every topic required for JEE Mains & Advanced with curated problem sets, interactive solutions, and real-time performance tracking.
              </p>
            </div>
            <Link to="/problems" className="group inline-flex items-center gap-3 text-base font-bold text-[var(--brand-orange)] hover:text-[var(--brand-orange-hover)] transition-colors">
              View All Topics <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 perspective-card">
            {[
              {
                icon: <Atom className="w-10 h-10" />,
                title: "Physics",
                tagline: "Mechanics & Electrodynamics",
                desc: "From Classical Mechanics to Modern Physics, master the most challenging concepts with 1500+ problems vetted by top IITians.",
                color: "var(--accent-blue)",
                stats: `${stats.subjectCounts?.Physics || 0}+ Problems`
              },
              {
                icon: <FlaskConical className="w-10 h-10" />,
                title: "Chemistry",
                tagline: "Organic & Physical",
                desc: "Organic, Inorganic, and Physical Chemistry modules designed for maximum retention and numerical precision.",
                color: "var(--color-easy)",
                stats: `${stats.subjectCounts?.Chemistry || 0}+ Problems`
              },
              {
                icon: <Calculator className="w-10 h-10" />,
                title: "Mathematics",
                tagline: "Calculus & Algebra",
                desc: "Calculus, Algebra, and Coordinate Geometry with advanced difficulty levels to build logical rigor and problem-solving speed.",
                color: "var(--brand-orange)",
                stats: `${stats.subjectCounts?.Maths || 0}+ Problems`
              }
            ].map((subject, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -15 }}
                className="perspective-card-inner group relative p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] bg-[var(--bg-secondary)] border border-[var(--border-primary)] hover:border-[var(--text-tertiary)] transition-all duration-700 overflow-hidden"
              >
                {/* Background Glow */}
                <div className="absolute -top-32 -right-32 w-64 h-64 blur-[100px] opacity-0 group-hover:opacity-20 transition-opacity duration-700" style={{ background: subject.color }}></div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl flex items-center justify-center mb-8 md:mb-10 transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 shadow-2xl" style={{ background: `${subject.color}15`, color: subject.color }}>
                    {subject.icon}
                  </div>
                  <div className="mb-6 md:mb-8">
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-30 mb-3 block">{subject.tagline}</span>
                    <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-4 md:mb-5">{subject.title}</h3>
                    <p className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed font-light">
                      {subject.desc}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-6 md:pt-8 border-t border-[var(--border-primary)]">
                    <span className="text-[10px] md:text-xs font-bold text-[var(--text-tertiary)] tracking-widest uppercase">{subject.stats}</span>
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl bg-[var(--bg-tertiary)] flex items-center justify-center group-hover:bg-[var(--brand-orange)] group-hover:text-white transition-all duration-500 shadow-xl">
                      <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Features Section (Bento Grid) */}
      <section className="py-24 md:py-40 bg-[var(--bg-secondary)]/30">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-7xl font-bold mb-8 text-[var(--text-primary)] tracking-tighter">Built for <span className="text-gradient">Performance.</span></h2>
            <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto font-light leading-relaxed">
              Our "Arena" is modeled after the actual JEE computer-based testing environment, providing the most realistic practice experience available.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 md:gap-8 h-auto md:h-[700px]">
            {/* Main Feature: Arena */}
            <div className="md:col-span-2 md:row-span-2 p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] bg-[var(--bg-secondary)] border border-[var(--border-primary)] flex flex-col justify-between group overflow-hidden relative">
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-[var(--brand-orange)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[var(--brand-orange)]/10 flex items-center justify-center text-[var(--brand-orange)] mb-8 md:mb-10 shadow-xl">
                  <Target className="w-7 h-7 md:w-8 md:h-8" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4 md:mb-6 tracking-tight">CBT Simulation Arena</h3>
                <p className="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed font-light mb-8 md:mb-10">
                  Experience the exact interface used in JEE Mains & Advanced. Build the stamina, speed, and familiarity needed for the 3-hour marathon.
                </p>
                <ul className="space-y-3 md:space-y-4">
                  {["Full-length Mock Tests", "Topic-wise Practice Sets", "Previous Year Questions (PYQs)"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 md:gap-4 text-sm md:text-base text-[var(--text-secondary)] font-light">
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[var(--brand-orange)] shadow-[0_0_8px_var(--brand-orange)]"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative z-10 mt-12 md:mt-16 h-48 md:h-56 bg-[var(--bg-primary)]/40 rounded-2xl md:rounded-3xl border border-[var(--border-primary)] overflow-hidden backdrop-blur-md">
                 <div className="absolute inset-0 flex items-center justify-center text-[8px] md:text-[10px] font-bold text-[var(--text-tertiary)] uppercase tracking-[0.8em]">Live Environment Simulation</div>
              </div>
            </div>

            {/* Analytics */}
            <div className="md:col-span-2 p-8 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] bg-[var(--bg-secondary)] border border-[var(--border-primary)] flex flex-col sm:flex-row items-center gap-8 md:gap-10 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-[var(--accent-blue)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="flex-1 relative z-10">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[var(--accent-blue)]/10 flex items-center justify-center text-[var(--accent-blue)] mb-6 md:mb-8 shadow-xl">
                  <BarChart3 className="w-6 h-6 md:w-7 md:h-7" />
                </div>
                <h4 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-3 md:mb-4 tracking-tight">Advanced Analytics</h4>
                <p className="text-sm md:text-base text-[var(--text-secondary)] font-light leading-relaxed">Track accuracy, speed, and subject-wise progress with high-precision data visualization.</p>
              </div>
              <div className="hidden sm:block w-32 h-32 md:w-40 md:h-40 rounded-2xl md:rounded-3xl bg-[var(--bg-primary)]/5 border border-[var(--border-primary)] relative overflow-hidden shadow-2xl">
                 <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[var(--accent-blue)]/20 animate-pulse"></div>
              </div>
            </div>

            {/* Community */}
            <div className="p-8 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] bg-[var(--bg-secondary)] border border-[var(--border-primary)] group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-[var(--color-easy)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[var(--color-easy)]/10 flex items-center justify-center text-[var(--color-easy)] mb-6 md:mb-8 shadow-xl">
                  <Users className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h4 className="text-lg md:text-xl font-bold text-[var(--text-primary)] mb-2 md:mb-3 tracking-tight">Elite Community</h4>
                <p className="text-xs md:text-sm text-[var(--text-secondary)] font-light leading-relaxed">Learn alongside {stats.totalUsers > 1000 ? (stats.totalUsers / 1000).toFixed(1) + 'k+' : stats.totalUsers} serious JEE aspirants.</p>
              </div>
            </div>

            {/* Verified Content */}
            <div className="p-8 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] bg-[var(--bg-secondary)] border border-[var(--border-primary)] group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-[var(--accent-purple)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[var(--accent-purple)]/10 flex items-center justify-center text-[var(--accent-purple)] mb-6 md:mb-8 shadow-xl">
                  <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h4 className="text-lg md:text-xl font-bold text-[var(--text-primary)] mb-2 md:mb-3 tracking-tight">Verified Content</h4>
                <p className="text-xs md:text-sm text-[var(--text-secondary)] font-light leading-relaxed">Solutions vetted by top IITians and subject matter experts.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Stats & Trust Section */}
      <section className="py-24 md:py-32 border-y border-[var(--border-primary)] bg-[var(--bg-secondary)]/10 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16 text-center">
            {[
              { label: "Active Aspirants", value: stats.totalUsers > 1000 ? (stats.totalUsers / 1000).toFixed(1) + 'k+' : stats.totalUsers },
              { label: "Problems Solved", value: stats.totalSubmissions > 1000000 ? (stats.totalSubmissions / 1000000).toFixed(1) + 'M+' : stats.totalSubmissions },
              { label: "Success Rate", value: "94%" },
              { label: "Active Contests", value: stats.activeContests }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-3 md:mb-4 tracking-tighter">{stat.value}</div>
                <div className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--text-tertiary)]">{stat.label}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-24 md:mt-32 flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-1000">
             <div className="flex items-center gap-3 md:gap-4 font-bold text-sm md:text-base tracking-tighter">
               <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-[var(--bg-tertiary)] flex items-center justify-center text-lg md:text-xl shadow-2xl">B</div>
               <span>IIT BOMBAY</span>
             </div>
             <div className="flex items-center gap-3 md:gap-4 font-bold text-sm md:text-base tracking-tighter">
               <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-[var(--bg-tertiary)] flex items-center justify-center text-lg md:text-xl shadow-2xl">D</div>
               <span>IIT DELHI</span>
             </div>
             <div className="flex items-center gap-3 md:gap-4 font-bold text-sm md:text-base tracking-tighter">
               <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-[var(--bg-tertiary)] flex items-center justify-center text-lg md:text-xl shadow-2xl">K</div>
               <span>IIT KANPUR</span>
             </div>
             <div className="flex items-center gap-3 md:gap-4 font-bold text-sm md:text-base tracking-tighter">
               <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-[var(--bg-tertiary)] flex items-center justify-center text-lg md:text-xl shadow-2xl">M</div>
               <span>IIT MADRAS</span>
             </div>
          </div>
        </div>
      </section>

      {/* 5. CTA Section */}
      <section className="py-24 md:py-40 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[1000px] h-[600px] md:h-[1000px] bg-[var(--brand-orange)]/10 blur-[150px] md:blur-[200px] rounded-full"></div>
        </div>
        
        <div className="max-w-[1100px] mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-12 md:p-32 rounded-[3rem] md:rounded-[4rem] bg-[var(--bg-secondary)] border border-[var(--border-primary)] relative overflow-hidden animated-gradient-border shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)]"
          >
            <h2 className="text-4xl md:text-7xl font-bold mb-8 md:mb-10 text-[var(--text-primary)] tracking-tighter leading-tight">Ready to achieve your <br /><span className="text-gradient-orange">Dream Rank?</span></h2>
            <p className="text-lg md:text-2xl text-[var(--text-secondary)] mb-12 md:mb-16 max-w-3xl mx-auto font-light leading-relaxed">
              Join thousands of serious aspirants who are already using Orbit to master Physics, Chemistry, and Mathematics.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8">
              <Link 
                to="/signup"
                className="w-full sm:w-auto px-12 md:px-16 py-4 md:py-6 rounded-2xl bg-[var(--brand-orange)] text-white font-bold text-lg md:text-xl hover:bg-[var(--brand-orange-hover)] transition-all hover:scale-105 active:scale-95 shadow-[0_20px_40px_-10px_rgba(255,162,23,0.3)]"
              >
                Create Free Account
              </Link>
              <Link 
                to="/login"
                className="w-full sm:w-auto px-12 md:px-16 py-4 md:py-6 rounded-2xl glass-button font-bold text-lg md:text-xl hover:scale-105 active:scale-95"
              >
                Sign In to Arena
              </Link>
            </div>
            
            {/* Subtle Footer Note */}
            <p className="mt-12 md:mt-16 text-[8px] md:text-[10px] text-[var(--text-tertiary)] font-bold tracking-[0.4em] uppercase">No credit card required • Instant access to {stats.totalProblems}+ problems</p>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
