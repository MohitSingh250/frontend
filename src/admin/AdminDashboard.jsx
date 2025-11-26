import { useState } from "react";
import CreateContest from "./CreateContest";
import CreateContestProblem from "./CreateContestProblem";
import CreatePracticeProblem from "./CreatePracticeProblem";
import ManageContests from "./ManageContests";
import { LayoutDashboard, PlusCircle, FileText, BookOpen, Settings, LogOut, Shield, List } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminDashboard() {
  const [view, setView] = useState("dashboard");

  const menuItems = [
    { id: "dashboard", label: "Overview", icon: LayoutDashboard },
    { id: "manageContests", label: "Manage Contests", icon: List },
    { id: "createContest", label: "Create Contest", icon: PlusCircle },
    { id: "contestProblem", label: "Add Contest Problem", icon: FileText },
    { id: "practiceProblem", label: "Add Practice Problem", icon: BookOpen },
  ];

  return (
    <div className="flex h-screen bg-[#0b0a0a] text-white font-sans selection:bg-[var(--dark-pastel-green)]/30 overflow-hidden">
      
      {/* SIDEBAR */}
      <div className="w-72 bg-[#151515] border-r border-white/5 flex flex-col">
        <div className="p-8 border-b border-white/5">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-lg bg-[var(--dark-pastel-green)]/20 flex items-center justify-center text-[var(--dark-pastel-green)]">
              <Shield className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white">Orbit Admin</h2>
          </div>
          <p className="text-xs text-white/40 pl-11">Command Center</p>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = view === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive 
                    ? "bg-[var(--dark-pastel-green)] text-black shadow-[0_0_20px_rgba(44,188,93,0.2)]" 
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-black" : "opacity-70"}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors">
            <LogOut className="w-4 h-4 opacity-70" />
            Logout
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Background Noise/Gradient */}
        <div className="absolute inset-0 pointer-events-none">
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--dark-pastel-green)]/5 blur-[100px] rounded-full pointer-events-none" />
        </div>

        {/* Header */}
        <header className="h-20 border-b border-white/5 bg-[#0b0a0a]/50 backdrop-blur-xl flex items-center justify-between px-8 z-10">
          <h1 className="text-2xl font-bold text-white">
            {menuItems.find(i => i.id === view)?.label}
          </h1>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border border-white/10" />
          </div>
        </header>

        {/* Scrollable Area */}
        <main className="flex-1 overflow-y-auto p-8 z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-6xl mx-auto"
            >
              {view === "dashboard" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 rounded-2xl bg-[#1e2022]/40 border border-white/5 backdrop-blur-md">
                    <h3 className="text-white/60 text-sm font-medium mb-2">Total Contests</h3>
                    <p className="text-4xl font-bold text-white">12</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-[#1e2022]/40 border border-white/5 backdrop-blur-md">
                    <h3 className="text-white/60 text-sm font-medium mb-2">Active Users</h3>
                    <p className="text-4xl font-bold text-white">1,240</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-[#1e2022]/40 border border-white/5 backdrop-blur-md">
                    <h3 className="text-white/60 text-sm font-medium mb-2">Problems Created</h3>
                    <p className="text-4xl font-bold text-white">85</p>
                  </div>
                </div>
              )}
              {view === "manageContests" && <ManageContests />}
              {view === "createContest" && <CreateContest />}
              {view === "contestProblem" && <CreateContestProblem />}
              {view === "practiceProblem" && <CreatePracticeProblem />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
