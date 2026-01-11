import React from 'react';
import { Check, Zap, Star, Trophy, Target, Rocket, ShieldCheck, Globe, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const PLANS = [
  {
    name: "Monthly",
    price: "₹299",
    period: "/month",
    description: "Perfect for short-term intensive revision.",
    features: [
      "Access to all Premium Problems",
      "Detailed Video Solutions",
      "Daily Practice Problems (DPP)",
      "Basic Performance Analytics",
      "Community Support"
    ],
    buttonText: "Get Started",
    popular: false
  },
  {
    name: "Yearly",
    price: "₹1,999",
    period: "/year",
    description: "The most popular choice for serious JEE aspirants.",
    features: [
      "Everything in Monthly",
      "All India Mock Test Series",
      "Personalized Study Planner",
      "Advanced Analytics & Heatmaps",
      "Priority Doubt Solving",
      "Exclusive Webinars"
    ],
    buttonText: "Go Pro",
    popular: true
  },
  {
    name: "Lifetime",
    price: "₹4,999",
    period: " once",
    description: "One-time investment for your entire JEE journey.",
    features: [
      "Everything in Yearly",
      "Lifetime Access to All Content",
      "Personal Mentorship Session",
      "Hardcopy Formula Sheets",
      "Early Access to New Features",
      "Orbit Alumni Network"
    ],
    buttonText: "Become a Legend",
    popular: false
  }
];

const FEATURES = [
  {
    title: "Premium Problem Bank",
    description: "10,000+ hand-picked problems curated by top IITians with varying difficulty levels.",
    icon: <Target className="text-[var(--brand-orange)]" size={24} />
  },
  {
    title: "Real-time Analytics",
    description: "Deep dive into your performance with subject-wise and topic-wise accuracy tracking.",
    icon: <Zap className="text-[var(--color-medium)]" size={24} />
  },
  {
    title: "Mock Test Series",
    description: "Full-length tests simulated on the exact JEE pattern with All India Ranking.",
    icon: <Trophy className="text-[var(--accent-purple)]" size={24} />
  },
  {
    title: "Expert Solutions",
    description: "Step-by-step video and text solutions for every problem to ensure conceptual clarity.",
    icon: <ShieldCheck className="text-[var(--color-success)]" size={24} />
  }
];

export default function Premium() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] pb-20">
      {/* Hero Section */}
      <div className="relative pt-20 pb-16 px-6 overflow-hidden border-b border-[var(--border-primary)] bg-[var(--bg-primary)]">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--brand-orange)]/10 rounded-full blur-[120px] opacity-50" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--brand-orange)]/10 border border-[var(--brand-orange)]/20 text-[var(--brand-orange)] text-xs font-bold uppercase tracking-widest mb-8">
              <Star size={14} fill="currentColor" />
              Elevate Your Preparation
            </div>
            <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter leading-tight">
              Unlock the Full Potential of <span className="text-gradient-orange">Orbit Premium</span>
            </h1>
            <p className="text-[var(--text-secondary)] text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              Join thousands of successful JEE aspirants who use Orbit's premium tools to crack the toughest exam in the world.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="max-w-[1200px] mx-auto px-6 -mt-12 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`
                relative flex flex-col p-8 rounded-3xl border transition-all duration-300
                ${plan.popular 
                  ? "bg-[var(--bg-secondary)] border-[var(--brand-orange)] shadow-2xl shadow-orange-500/10 md:scale-105 z-10" 
                  : "bg-[var(--bg-secondary)] border-[var(--border-primary)] hover:border-[var(--text-tertiary)]"}
              `}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[var(--brand-orange)] text-[var(--bg-primary)] text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black">{plan.price}</span>
                  <span className="text-[var(--text-secondary)] text-sm">{plan.period}</span>
                </div>
                <p className="text-[var(--text-secondary)] text-sm mt-4 font-light">
                  {plan.description}
                </p>
              </div>

              <div className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-[var(--color-success)]/10 flex items-center justify-center shrink-0">
                      <Check size={12} className="text-[var(--color-success)]" />
                    </div>
                    <span className="text-sm text-[var(--text-secondary)] font-light leading-tight">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <button className={`
                w-full py-4 rounded-2xl font-bold transition-all active:scale-95
                ${plan.popular 
                  ? "bg-[var(--brand-orange)] text-[var(--bg-primary)] shadow-xl shadow-[var(--brand-orange)]/20 hover:bg-[var(--brand-orange-hover)]" 
                  : "bg-[var(--bg-tertiary)] text-[var(--text-primary)] border border-[var(--border-primary)] hover:bg-[var(--bg-primary)]"}
              `}>
                {plan.buttonText}
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-[1200px] mx-auto px-6 mt-24 md:mt-32">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Premium?</h2>
          <p className="text-[var(--text-secondary)] font-light">Precision-engineered features to give you the edge.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature, i) => (
            <div key={i} className="p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-primary)] hover:border-[var(--brand-orange)]/30 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-[var(--bg-tertiary)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h4 className="text-lg font-bold mb-3">{feature.title}</h4>
              <p className="text-sm text-[var(--text-secondary)] font-light leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Section */}
      <div className="max-w-[1000px] mx-auto px-6 mt-24 md:mt-32 text-center">
        <div className="p-8 md:p-12 rounded-[2rem] md:rounded-[40px] bg-gradient-to-br from-[var(--brand-orange)]/5 to-transparent border border-[var(--brand-orange)]/10">
          <Globe className="mx-auto text-[var(--brand-orange)] mb-6" size={48} />
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Trusted by 50,000+ Aspirants</h2>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
             <div className="flex items-center gap-2 font-black text-lg md:text-xl tracking-tighter">IIT BOMBAY</div>
             <div className="flex items-center gap-2 font-black text-lg md:text-xl tracking-tighter">IIT DELHI</div>
             <div className="flex items-center gap-2 font-black text-lg md:text-xl tracking-tighter">IIT MADRAS</div>
             <div className="flex items-center gap-2 font-black text-lg md:text-xl tracking-tighter">IIT KANPUR</div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="max-w-[1200px] mx-auto px-6 mt-24 md:mt-32">
         <div className="relative overflow-hidden rounded-[2rem] md:rounded-[40px] bg-[var(--brand-orange)] p-12 md:p-20 text-center text-[var(--bg-primary)]">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--text-primary)]/10 rounded-full blur-[100px] -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--bg-primary)]/10 rounded-full blur-[100px] -ml-48 -mb-48" />
            
            <Rocket className="mx-auto mb-8 animate-bounce" size={64} />
            <h2 className="text-3xl md:text-6xl font-black mb-8 tracking-tighter">Ready to Start Your Journey?</h2>
            <p className="text-[var(--bg-primary)]/80 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light">
               Don't leave your JEE success to chance. Get the tools you need to succeed today.
            </p>
            <button className="w-full sm:w-auto px-12 py-5 bg-[var(--text-primary)] text-[var(--brand-orange)] rounded-2xl font-black text-xl hover:bg-[var(--text-primary)]/90 transition-colors shadow-2xl shadow-[var(--bg-primary)]/20 active:scale-95">
               Get Orbit Premium Now
            </button>
         </div>
      </div>
    </div>
  );
}
