import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Target, 
  Trophy, 
  ShoppingBag, 
  Zap, 
  BarChart3, 
  FlaskConical, 
  Atom, 
  Calculator,
  ChevronRight,
  ChevronDown,
  Users,
  ShieldCheck,
  Sparkles,
  Rocket,
  Quote,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import api from "../api";

export default function Home() {
  const [stats, setStats] = useState(null);
  const [activeUsers, setActiveUsers] = useState(42);
  const [loading, setLoading] = useState(true);
  const [subjectIndex, setSubjectIndex] = useState(0);
  const subjects = ["Physics", "Chemistry", "Mathematics"];

  // Mouse Parallax Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const textX = useSpring(useTransform(mouseX, [-500, 500], [-15, 15]), springConfig);
  const textY = useSpring(useTransform(mouseY, [-500, 500], [-15, 15]), springConfig);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX - innerWidth / 2);
    mouseY.set(clientY - innerHeight / 2);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSubjectIndex((prev) => (prev + 1) % subjects.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await api.get("/advanced/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch global stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();

    const interval = setInterval(() => {
      setActiveUsers(prev => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const revealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const [counts, setCounts] = useState({ users: 0, contests: 0, problems: 0 });

  useEffect(() => {
    if (stats) {
      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;
      
      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        setCounts({
          users: Math.floor((stats.totalUsers || 10000) * progress),
          contests: Math.floor((stats.activeContests || 12) * progress),
          problems: Math.floor((stats.totalProblems || 5000) * progress)
        });
        if (currentStep >= steps) clearInterval(timer);
      }, interval);
      return () => clearInterval(timer);
    }
  }, [stats]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-[var(--brand-orange)]/30">
      {/* Custom Home Header - Absolute Overlay & Branded */}
      <header className="absolute top-0 left-0 right-0 w-full py-6 px-4 sm:px-8 flex items-center justify-between bg-transparent z-50">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src="/orbit.png" 
              alt="Orbit Logo" 
              className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300"
            />
            <span className="text-2xl font-black tracking-tighter text-white">Orbit</span>
          </Link>
        </div>

        <nav className="flex items-center gap-3 sm:gap-6">
          <Link to="/login" className="text-sm font-semibold text-white/80 hover:text-white transition-colors">Sign in</Link>
          <Link to="/signup" className="text-sm font-semibold text-[var(--brand-orange)] border border-[var(--brand-orange)] px-4 sm:px-6 py-2 rounded-full hover:bg-[var(--brand-orange)] hover:text-white transition-all shadow-lg shadow-orange-500/10">Register</Link>
        </nav>
      </header>

      {/* 1. Hero Section - LeetCode Style */}
      <section 
        onMouseMove={handleMouseMove}
        className="relative h-screen flex items-center justify-center pt-20 pb-24 overflow-hidden"
      >
        {/* Video Background */}
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover brightness-[1.1] contrast-[1.05] saturate-[1.1]"
          >
            <source src="https://res.cloudinary.com/dx6pimg9n/video/upload/f_auto,q_auto/orbit_assets/hero_bg_video.mp4" type="video/mp4" />
          </video>
          {/* Overlays */}
          <div className="absolute inset-0 bg-[var(--bg-primary)]/30"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-[var(--bg-primary)]/40"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-primary)]/40 via-transparent to-[var(--bg-primary)]/40"></div>
          
          {/* Mouse Following Glow */}
          <motion.div 
            style={{ x: mouseX, y: mouseY }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--brand-orange)]/5 blur-[150px] rounded-full pointer-events-none"
          />
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 text-center z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-10"
          >
            <motion.h1 
              style={{ x: textX, y: textY }}
              variants={itemVariants}
              className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]"
            >
              A New Way to <br />
              <span className="inline-flex flex-col h-[1.1em] overflow-hidden align-bottom">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={subjects[subjectIndex]}
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                    className="text-gradient-orange"
                  >
                    Master {subjects[subjectIndex]}.
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg sm:text-xl md:text-2xl text-[var(--text-secondary)] max-w-3xl mx-auto font-light leading-relaxed px-4"
            >
              The ultimate platform for JEE aspirants. Practice smarter, compete harder, and track your progress with surgical precision.
            </motion.p>
            
            <motion.div 
              variants={itemVariants} 
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                whileHover={{ x: useTransform(mouseX, [-500, 500], [-10, 10]), y: useTransform(mouseY, [-500, 500], [-10, 10]) }}
                transition={{ type: "spring", stiffness: 150, damping: 15 }}
              >
                <Link 
                  to="/problems"
                  className="btn btn-primary px-12 py-4 rounded-xl text-lg font-bold shadow-[0_0_40px_-10px_var(--brand-orange)] active:scale-[0.98] transition-all"
                >
                  Start Exploring
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Ultra-Minimalist Scroll Hint */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 2 }}
            className="flex flex-col items-center"
          >
            <div className="w-px h-24 bg-gradient-to-b from-white/20 to-transparent relative overflow-hidden">
              <motion.div 
                animate={{ y: [0, 96, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-[var(--brand-orange)] to-transparent"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Command Center Section */}
      <section className="py-20 relative overflow-hidden border-y border-white/5 bg-[var(--bg-secondary)]">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={revealVariants}
          className="max-w-[1400px] mx-auto px-4 sm:px-6"
        >
          <div className="max-w-4xl text-left mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Your <span className="text-gradient-orange">Command Center</span> for JEE.</h2>
            <p className="text-lg text-[var(--text-secondary)] mb-8 leading-relaxed font-light">
              Orbit provides a comprehensive ecosystem designed to streamline your preparation. From adaptive practice to real-time competition, everything you need is at your fingertips.
            </p>
            <Link 
              to="/signup"
              className="inline-flex items-center gap-2 text-[var(--brand-orange)] font-bold hover:gap-4 transition-all group"
            >
              Get Started <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { 
                title: "Problem Arena", 
                icon: <Target />, 
                desc: "5000+ JEE questions.",
                illustration: (
                  <svg className="absolute right-[-10%] bottom-[-10%] w-32 h-32 text-[var(--brand-orange)]/5 group-hover:text-[var(--brand-orange)]/10 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                )
              },
              { 
                title: "Live Contests", 
                icon: <Trophy />, 
                desc: "Compete with the best.",
                illustration: (
                  <svg className="absolute right-[-10%] bottom-[-10%] w-32 h-32 text-[var(--brand-orange)]/5 group-hover:text-[var(--brand-orange)]/10 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                    <path d="M4 22h16" />
                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                  </svg>
                )
              },
              { 
                title: "Orbit Store", 
                icon: <ShoppingBag />, 
                desc: "Redeem your coins.",
                illustration: (
                  <svg className="absolute right-[-10%] bottom-[-10%] w-32 h-32 text-[var(--brand-orange)]/5 group-hover:text-[var(--brand-orange)]/10 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                    <path d="M3 6h18" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                )
              },
              { 
                title: "Daily Missions", 
                icon: <Zap />, 
                desc: "Earn rewards daily.",
                illustration: (
                  <svg className="absolute right-[-10%] bottom-[-10%] w-32 h-32 text-[var(--brand-orange)]/5 group-hover:text-[var(--brand-orange)]/10 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />
                  </svg>
                )
              }
            ].map((s, i) => (
              <div key={i} className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-primary)] border border-white/5 shadow-2xl group hover:border-[var(--brand-orange)]/10 transition-all hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-orange)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                {s.illustration}
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[var(--brand-orange)]/5 flex items-center justify-center mb-6 text-[var(--brand-orange)] group-hover:bg-[var(--brand-orange)]/80 group-hover:text-white transition-all duration-500 relative z-10 shadow-lg">
                  {React.cloneElement(s.icon, { className: "w-6 h-6 sm:w-7 sm:h-7" })}
                </div>
                <h3 className="text-lg sm:text-xl font-black mb-2 relative z-10 tracking-tight">{s.title}</h3>
                <p className="text-xs sm:text-sm text-[var(--text-tertiary)] font-light relative z-10 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 3. Subjects Section - Re-integrated with Clean Style */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none"></div>
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={revealVariants}
          className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10"
        >
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Master Every <span className="text-gradient-orange">Subject.</span></h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto font-light">
              Deep conceptual clarity with problems that make you think.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: <Atom className="w-6 h-6" />,
                title: "Physics",
                desc: "From Mechanics to Modern Physics. Visualize concepts, don't just memorize formulas.",
                color: "var(--accent-blue)",
                stats: `${stats?.subjectCounts?.Physics || 0}+ Problems`
              },
              {
                icon: <FlaskConical className="w-6 h-6" />,
                title: "Chemistry",
                desc: "Master reactions and mechanisms. Organic, Inorganic, and Physical modules for total retention.",
                color: "var(--color-easy)",
                stats: `${stats?.subjectCounts?.Chemistry || 0}+ Problems`
              },
              {
                icon: <Calculator className="w-6 h-6" />,
                title: "Mathematics",
                desc: "Develop problem-solving intuition. Calculus to Algebra with rigorous logical frameworks.",
                color: "var(--brand-orange)",
                stats: `${stats?.subjectCounts?.Maths || 0}+ Problems`
              }
            ].map((subject, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-secondary)] border border-white/5 hover:border-[var(--brand-orange)]/30 transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--brand-orange)]/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300 relative z-10" style={{ background: `${subject.color}10`, color: `var(--${subject.color.split('--')[1]})` }}>
                  {subject.icon}
                </div>
                <h3 className="text-lg font-bold mb-2 relative z-10">{subject.title}</h3>
                <p className="text-[var(--text-secondary)] text-[10px] leading-relaxed mb-4 font-light relative z-10">{subject.desc}</p>
                <div className="flex items-center justify-between pt-6 border-t border-white/5 relative z-10">
                  <span className="text-[10px] font-bold text-[var(--text-tertiary)] uppercase tracking-widest">{subject.stats}</span>
                  <div className="w-10 h-10 rounded-xl bg-[var(--bg-primary)] flex items-center justify-center group-hover:bg-[var(--brand-orange)] group-hover:text-white transition-all shadow-lg">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 4. Practice, Compete & Succeed */}
      <section className="py-32 relative bg-[var(--bg-secondary)]/30 border-y border-white/5">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={revealVariants}
          className="max-w-[1400px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row-reverse items-center gap-16"
        >
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tight">Practice, Compete & <span className="text-gradient-orange">Succeed.</span></h2>
            <p className="text-lg text-[var(--text-secondary)] mb-10 leading-relaxed font-light">
              Access a massive repository of {stats?.totalProblems || 5000}+ JEE-standard problems. Join a thriving community of aspirants, participate in weekly contests, and climb the global leaderboard to earn exclusive rewards.
            </p>
            <Link 
              to="/problems"
              className="inline-flex items-center gap-2 text-[var(--brand-orange)] font-bold hover:gap-4 transition-all group"
            >
              Enter Problem Arena <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="flex-1 relative group">
            {/* Image Container with Simple Hover Effect */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.4)] bg-[var(--bg-primary)] group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)] transition-shadow duration-500"
            >
              <img 
                src="/problem-arena-preview.png" 
                alt="Problem Arena Preview" 
                className="w-full h-auto object-cover brightness-[1.02] contrast-[1.05] saturate-[1.1] image-rendering-crisp"
              />
              
              {/* Subtle Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
            </motion.div>

          </div>
        </motion.div>
      </section>

      {/* 5. Interactive Tools & Mission */}
      <section className="py-32">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={revealVariants}
          className="max-w-[1400px] mx-auto px-4 sm:px-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">Built for <span className="text-gradient-orange">Precision.</span></h2>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed font-light">
                Our advanced tools like the CBT Exam Interface and Granular Performance Analytics are engineered to give you a realistic testing experience and deep insights into your preparation.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-4 p-6 rounded-2xl bg-[var(--bg-secondary)] border border-white/5 group hover:border-[var(--accent-blue)]/30 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-[var(--accent-blue)]/10 flex items-center justify-center text-[var(--accent-blue)] shrink-0 group-hover:bg-[var(--accent-blue)] group-hover:text-white transition-all">
                    <Target className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">CBT Interface</h4>
                    <p className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider font-bold">NTA-style environment</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-6 rounded-2xl bg-[var(--bg-secondary)] border border-white/5 group hover:border-[var(--accent-purple)]/30 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-[var(--accent-purple)]/10 flex items-center justify-center text-[var(--accent-purple)] shrink-0 group-hover:bg-[var(--accent-purple)] group-hover:text-white transition-all">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Analytics</h4>
                    <p className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider font-bold">Real-time insights</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-12 rounded-3xl bg-[var(--bg-secondary)] border border-white/5 shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--brand-orange)]/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-[var(--brand-orange)]/10 transition-colors"></div>
               <h3 className="text-2xl font-bold mb-6 relative z-10">Our Mission</h3>
               <p className="text-[var(--text-secondary)] text-lg leading-relaxed font-light mb-8 italic relative z-10">
                 "At Orbit, we are dedicated to democratizing high-quality JEE preparation. Our mission is to provide every aspirant with the tools, content, and community needed to reach their dream IIT."
               </p>
               <Link 
                to="/signup"
                className="btn btn-primary px-10 py-4 rounded-xl font-bold shadow-lg inline-block relative z-10 hover:scale-[1.05] transition-transform"
              >
                Join the Mission
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 6. Success Stories Section - Ultra-Minimalist Approach */}
      <section className="py-24 relative overflow-hidden bg-[var(--bg-secondary)]/30">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={revealVariants}
          className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10"
        >
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-16 gap-8 text-center md:text-left">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-[0.9]">
                From Orbit to <br />
                <span className="text-gradient-orange">The Top IITs.</span>
              </h2>
            </div>
            <p className="text-lg text-[var(--text-secondary)] font-light max-w-md md:text-right mx-auto md:mx-0">
              Real stories from real aspirants who mastered the JEE with surgical precision.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                name: "Aryan Sharma", 
                rank: "AIR 42", 
                iit: "IIT Bombay", 
                improvement: "99.98 Percentile",
                quote: "Orbit's CBT interface was a total game changer. It felt exactly like the real exam, which killed my exam anxiety completely.",
                delay: 0
              },
              { 
                name: "Priya Gupta", 
                rank: "AIR 156", 
                iit: "IIT Delhi", 
                improvement: "Physics: 100/100",
                quote: "The granular analytics helped me identify my weak spots in Physics instantly. I went from struggling with Mechanics to a perfect score.",
                delay: 0.1
              },
              { 
                name: "Ishaan Verma", 
                rank: "AIR 89", 
                iit: "IIT Madras", 
                improvement: "Math: 99.9%ile",
                quote: "The problem arena has the best collection of JEE Advanced level questions. The adaptive difficulty kept me constantly challenged.",
                delay: 0.2
              }
            ].map((story, i) => (
              <motion.div 
                key={i}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: story.delay, duration: 0.6 }}
                className="relative p-8 rounded-3xl bg-[var(--bg-primary)] border border-white/5 hover:border-[var(--brand-orange)]/20 transition-all group"
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 text-lg font-black group-hover:border-[var(--brand-orange)]/30 transition-colors">
                      {story.name[0]}
                    </div>
                    <div className="text-right">
                      <div className="text-[var(--brand-orange)]/60 text-[10px] font-black uppercase tracking-widest mb-1">
                        {story.rank}
                      </div>
                      <div className="text-[9px] text-[var(--text-tertiary)] font-bold uppercase tracking-wider">{story.iit}</div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mb-1">Achievement</div>
                    <div className="text-lg font-black text-white group-hover:text-[var(--brand-orange)] transition-colors">{story.improvement}</div>
                  </div>

                  <p className="text-[var(--text-secondary)] text-sm font-light leading-relaxed italic">
                    "{story.quote}"
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 7. White Section - Community Focus */}
      <section className="py-10 bg-white text-black relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-100 to-transparent"></div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealVariants}
          className="max-w-[1400px] mx-auto px-4 sm:px-6 text-center relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-xs font-bold uppercase tracking-widest mb-2">
            <Users className="w-4 h-4" /> Join the Community
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-8xl font-black mb-2 tracking-tighter leading-[0.85]">
            10,000+ Aspirants <br />
            <span className="text-gray-300">Growing Together.</span>
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-500 max-w-3xl mx-auto font-light leading-relaxed mb-8 px-4">
            Connect with like-minded students, share insights, and solve doubts in real-time. Orbit is more than just a platform; it's a movement of future engineers.
          </p>

          {/* Social Proof - Avatars */}
          <div className="flex flex-col items-center gap-4 mb-10">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="w-14 h-14 rounded-full border-4 border-white bg-gray-100 flex items-center justify-center overflow-hidden shadow-xl">
                  <div className={`w-full h-full bg-gradient-to-br ${i % 2 === 0 ? 'from-orange-400 to-orange-600' : 'from-blue-400 to-blue-600'} flex items-center justify-center text-white font-bold text-xs`}>
                    {['AS', 'PG', 'IV', 'RK', 'MS', 'JD'][i-1]}
                  </div>
                </div>
              ))}
              <div className="w-14 h-14 rounded-full border-4 border-white bg-black text-white flex items-center justify-center text-xs font-bold shadow-xl">
                +10k
              </div>
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Trusted by top rankers across India</p>
          </div>

          <div className="flex flex-wrap justify-center gap-12 md:gap-24 mb-10">
             <div className="flex flex-col items-center group">
                <span className="text-4xl md:text-5xl font-black mb-1 group-hover:scale-110 transition-transform">5M+</span>
                <span className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-400">Submissions</span>
             </div>
             <div className="flex flex-col items-center group">
                <span className="text-4xl md:text-5xl font-black mb-1 group-hover:scale-110 transition-transform">200k+</span>
                <span className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-400">Discussions</span>
             </div>
             <div className="flex flex-col items-center group">
                <span className="text-4xl md:text-5xl font-black mb-1 group-hover:scale-110 transition-transform">50k+</span>
                <span className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-400">Daily Active</span>
             </div>
          </div>

          <Link 
            to="/signup"
            className="inline-flex items-center gap-3 px-10 py-4 bg-black text-white rounded-2xl text-lg font-black hover:bg-gray-900 transition-all hover:scale-105 shadow-2xl shadow-black/20"
          >
            <span className="text-white">Join the Movement</span> <ArrowRight className="w-5 h-5 text-white" />
          </Link>
        </motion.div>
      </section>


    </div>
  );
}
