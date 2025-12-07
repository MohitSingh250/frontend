import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Code2, Users, Trophy, Building2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="w-full bg-[var(--bg-primary)] text-[var(--text-primary)]">
      
      {/* 1. Hero Section */}
      <section className="relative w-full py-20 md:py-32 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-12">
          
          {/* Left: 3D Illustration Placeholder */}
          <div className="flex-1 relative">
            <div className="relative z-10 w-full max-w-[500px] aspect-[4/3] bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-tertiary)] rounded-2xl shadow-2xl border border-[var(--border-primary)] flex items-center justify-center overflow-hidden">
               {/* Abstract UI Mockup */}
               <div className="absolute inset-4 bg-[var(--bg-primary)] rounded-xl p-4 flex flex-col gap-3 opacity-90">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                  </div>
                  <div className="h-4 w-3/4 bg-[var(--bg-tertiary)] rounded"></div>
                  <div className="h-4 w-1/2 bg-[var(--bg-tertiary)] rounded"></div>
                  <div className="flex-1 bg-[var(--bg-tertiary)]/30 rounded mt-2 border border-dashed border-[var(--border-secondary)]"></div>
               </div>
            </div>
            {/* Decorative blobs */}
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-[var(--brand-orange)]/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[var(--accent-blue)]/10 rounded-full blur-3xl"></div>
          </div>

          {/* Right: Content */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              A New Way to Learn
            </h1>
            <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
              Orbit is the best platform to help you enhance your skills, expand your knowledge and prepare for JEE & NEET exams.
            </p>
            <Link 
              to="/signup"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[var(--color-easy)] hover:bg-[var(--color-easy)]/90 text-white font-semibold text-lg shadow-lg shadow-[var(--color-easy)]/20 transition-all hover:scale-105"
            >
              Create Account <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Start Exploring */}
      <section className="py-20 bg-[var(--bg-secondary)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center gap-4 mb-12">
            <div className="p-3 rounded-xl bg-[var(--color-easy)]/10 text-[var(--color-easy)]">
              <Code2 className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold text-[var(--color-easy)]">Start Exploring</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
             <div className="space-y-6">
               <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                 Explore is a well-organized tool that helps you get the most out of Orbit by providing structure to guide your progress towards the next step in your programming career.
               </p>
               <Link to="/explore" className="text-[var(--accent-blue)] font-medium hover:underline inline-flex items-center gap-1">
                 Get Started <ChevronRight className="w-4 h-4" />
               </Link>
             </div>
             
             {/* Cards Carousel Mockup */}
             <div className="relative h-[300px] w-full">
                <div className="absolute top-0 right-0 w-[80%] h-full bg-gradient-to-br from-[#00B8A3] to-[#007AFF] rounded-2xl shadow-xl p-8 text-white flex flex-col justify-end transform translate-x-4 translate-y-4 opacity-50 scale-95"></div>
                <div className="absolute top-0 right-0 w-[80%] h-full bg-gradient-to-br from-[#00B8A3] to-[#007AFF] rounded-2xl shadow-xl p-8 text-white flex flex-col justify-end z-10">
                   <h3 className="text-2xl font-bold mb-2">JEE Advanced 75</h3>
                   <p className="opacity-90">Ace your entrance exam with 75 curated high-weightage questions.</p>
                   <div className="mt-6 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                     <ChevronRight className="w-6 h-6" />
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 3. Features Grid */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-16">
          
          {/* Feature 1 */}
          <div className="flex gap-6">
             <div className="shrink-0">
               <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-purple)] flex items-center justify-center text-white shadow-lg">
                 <Users className="w-8 h-8" />
               </div>
             </div>
             <div>
               <h3 className="text-2xl font-bold text-[var(--accent-blue)] mb-4">Questions, Community & Contests</h3>
               <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">
                 Over 4000 questions for you to practice. Come and join one of the largest student communities and participate in our mock tests to challenge yourself and earn rewards.
               </p>
               <Link to="/problems" className="text-[var(--accent-blue)] font-medium hover:underline inline-flex items-center gap-1">
                 View Questions <ChevronRight className="w-4 h-4" />
               </Link>
             </div>
          </div>

          {/* Feature 2 */}
          <div className="flex gap-6">
             <div className="shrink-0">
               <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--brand-orange)] to-[var(--color-medium)] flex items-center justify-center text-white shadow-lg">
                 <Building2 className="w-8 h-8" />
               </div>
             </div>
             <div>
               <h3 className="text-2xl font-bold text-[var(--brand-orange)] mb-4">Institutes & Aspirants</h3>
               <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">
                 Not only does Orbit prepare aspirants for JEE & NEET, we also help institutes identify top talent. From sponsoring contests to providing online assessments and training.
               </p>
               <Link to="/business" className="text-[var(--accent-blue)] font-medium hover:underline inline-flex items-center gap-1">
                 Partner Opportunities <ChevronRight className="w-4 h-4" />
               </Link>
             </div>
          </div>

        </div>
      </section>

    </div>
  );
}
