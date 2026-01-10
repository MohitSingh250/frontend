import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Check, Sparkles, BookOpen, Target, Award, Gift } from "lucide-react";

export default function Signup() {
  const { signup } = useContext(AuthContext);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  // Step 1: Basic Info
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");

  // Step 2: Academic Info
  const [userClass, setUserClass] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const [learningGoals, setLearningGoals] = useState([]);

  // Step 3: Interests & Referrals
  const [interests, setInterests] = useState([]);
  const [referral, setReferral] = useState("");
  const [coupon, setCoupon] = useState("");

  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", 
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", 
    "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  const classes = ["9th", "10th", "11th", "12th", "Dropper", "College", "Other"];
  const skills = [
    { id: "beginner", label: "Beginner", desc: "Just starting out" },
    { id: "intermediate", label: "Intermediate", desc: "Have some experience" },
    { id: "advanced", label: "Advanced", desc: "Looking for a challenge" }
  ];
  const goals = ["JEE Mains", "JEE Advanced", "NEET", "Boards", "Olympiads", "Placement", "General Coding"];
  const interestOptions = ["Physics", "Chemistry", "Mathematics", "Biology", "Data Structures", "Algorithms", "Web Dev", "AI/ML"];

  const toggleGoal = (goal) => {
    setLearningGoals(prev => prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]);
  };

  const toggleInterest = (interest) => {
    setInterests(prev => prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]);
  };

  const nextStep = () => {
    if (step === 1 && (!username || !email || !password || !location)) {
      return setErr("Please fill all basic details");
    }
    setErr(null);
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setErr(null);
    setStep(prev => prev - 1);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (step < 3) {
      nextStep();
      return;
    }
    
    setErr(null);

    try {
      setLoading(true);
      const onboardingData = {
        location,
        class: userClass,
        skillLevel,
        learningGoals,
        interests,
        referral,
        coupon
      };
      await signup(username, email, password, onboardingData);
    } catch (error) {
      setErr(error?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const stepVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#1A1A1A] text-white p-6">
      <div className="w-full max-w-[440px]">
        <div className="bg-[#222] rounded-2xl p-10 shadow-xl border border-[#2A2A2A]">
          {/* Logo & Header */}
          <div className="text-center mb-10">
            <div className="flex justify-center mb-4">
              <img src="/orbits.png" alt="Orbit" className="h-10 w-10 opacity-100" />
            </div>
            <h1 className="text-2xl font-bold mb-2">
              {step === 1 ? "Sign up" : step === 2 ? "Your Journey" : "Final Touches"}
            </h1>
            <div className="flex justify-center gap-1.5 mt-4">
              {[1, 2, 3].map((s) => (
                <div 
                  key={s} 
                  className={`h-1 rounded-full transition-all duration-300 ${
                    s === step ? "w-6 bg-[#FFA217]" : "w-2 bg-[#333]"
                  }`}
                />
              ))}
            </div>
          </div>

          {err && (
            <div className="mb-6 p-3 rounded bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">
              {err}
            </div>
          )}

          <form onSubmit={submit}>
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-4"
                >
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-[#2A2A2A] border border-[#333] text-white placeholder-[#666] focus:outline-none focus:border-[#FFA217] transition-colors text-sm"
                    placeholder="Username"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-[#2A2A2A] border border-[#333] text-white placeholder-[#666] focus:outline-none focus:border-[#FFA217] transition-colors text-sm"
                    placeholder="Email address"
                  />
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-[#2A2A2A] border border-[#333] text-white focus:outline-none focus:border-[#FFA217] transition-colors text-sm appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select State</option>
                    {states.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-[#2A2A2A] border border-[#333] text-white placeholder-[#666] focus:outline-none focus:border-[#FFA217] transition-colors text-sm"
                    placeholder="Password"
                  />
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6"
                >
                  <div className="space-y-3">
                    <label className="text-xs font-medium text-[#888] ml-1 uppercase tracking-wider">Current Class</label>
                    <div className="flex flex-wrap gap-2">
                      {classes.map(c => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setUserClass(c)}
                          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                            userClass === c ? "bg-[#FFA217] text-[#1A1A1A]" : "bg-[#2A2A2A] text-[#888] hover:bg-[#333]"
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-medium text-[#888] ml-1 uppercase tracking-wider">Skill Level</label>
                    <div className="grid grid-cols-1 gap-2">
                      {skills.map(s => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setSkillLevel(s.id)}
                          className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                            skillLevel === s.id ? "bg-[#FFA217]/5 border-[#FFA217]" : "bg-[#2A2A2A] border-[#333]"
                          }`}
                        >
                          <div className="text-left">
                            <div className={`text-sm font-bold ${skillLevel === s.id ? "text-[#FFA217]" : "text-white"}`}>{s.label}</div>
                            <div className="text-[10px] text-[#666]">{s.desc}</div>
                          </div>
                          {skillLevel === s.id && <Check size={16} className="text-[#FFA217]" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-medium text-[#888] ml-1 uppercase tracking-wider">Goals</label>
                    <div className="flex flex-wrap gap-2">
                      {goals.map(g => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => toggleGoal(g)}
                          className={`px-3 py-1.5 rounded-full text-[10px] font-bold border transition-all ${
                            learningGoals.includes(g) ? "bg-[#38BDF8] border-[#38BDF8] text-[#1A1A1A]" : "bg-transparent border-[#333] text-[#888]"
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6"
                >
                  <div className="space-y-3">
                    <label className="text-xs font-medium text-[#888] ml-1 uppercase tracking-wider">Interests</label>
                    <div className="grid grid-cols-2 gap-2">
                      {interestOptions.map(i => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => toggleInterest(i)}
                          className={`p-3 rounded-lg text-xs font-bold border transition-all flex items-center justify-between ${
                            interests.includes(i) ? "bg-[#FFA217]/5 border-[#FFA217] text-[#FFA217]" : "bg-[#2A2A2A] border-[#333] text-[#888]"
                          }`}
                        >
                          {i}
                          {interests.includes(i) && <Check size={12} />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <input
                      value={referral}
                      onChange={(e) => setReferral(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-[#2A2A2A] border border-[#333] text-white placeholder-[#666] focus:outline-none focus:border-[#FFA217] transition-colors text-sm"
                      placeholder="Referral Code (Optional)"
                    />
                    <input
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-[#2A2A2A] border border-[#333] text-white placeholder-[#666] focus:outline-none focus:border-[#FFA217] transition-colors text-sm"
                      placeholder="Coupon Code (Optional)"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-10 space-y-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-lg bg-[#FFA217] text-[#1A1A1A] font-bold text-sm hover:bg-[#FFB237] transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-[#1A1A1A]/20 border-t-[#1A1A1A] rounded-full animate-spin" />
                ) : (
                  <>
                    {step === 3 ? "Sign Up" : "Continue"}
                    {step < 3 && <ChevronRight size={18} />}
                  </>
                )}
              </button>
              
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="w-full py-3 rounded-lg bg-transparent text-[#888] font-medium text-sm hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <ChevronLeft size={16} /> Back
                </button>
              )}
            </div>
            
            <div className="text-center mt-8 text-sm">
               <span className="text-[#666]">Already have an account? </span>
               <a href="/login" className="text-[#FFA217] font-bold hover:underline">Sign In</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
