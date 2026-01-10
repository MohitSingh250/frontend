import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, Lock, Star, Trophy, Zap, Gift, HelpCircle, Home } from "lucide-react";
import { motion } from "framer-motion";
import api from "../../api";
import { AuthContext } from "../../context/AuthContext";
import ProblemListSidebar from "../../components/ProblemList/ProblemListSidebar";

// Mock data removed, fetching from backend

export default function QuestDetail() {
  const { id } = useParams();
  const { user } = React.useContext(AuthContext);
  const [quest, setQuest] = useState(null);
  const [progress, setProgress] = useState({ completedNodes: [], activeNode: 1, stars: 0, chestsOpened: [] });
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const qRes = await api.get(`/quests/${id}`);
        setQuest(qRes.data);
        
        if (user) {
          const pRes = await api.get(`/quests/progress/${id}`);
          setProgress(pRes.data);
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchData();
  }, [id, user]);

  if (loading || !quest) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#FFA217]"></div>
      </div>
    );
  }

  const getNodeStatus = (nodeId) => {
    if (progress.completedNodes.includes(nodeId)) return 'completed';
    if (progress.activeNode === nodeId) return 'active';
    return 'locked';
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white font-sans selection:bg-[#FFA217]/30 flex flex-col">
      <div className="max-w-full mx-auto flex-1 flex flex-col w-full">
        <div className="flex flex-1">
          {/* 1. LEFT SIDEBAR */}
          <ProblemListSidebar />

          {/* 2. MAIN CONTENT */}
          <div className="flex-1 min-w-0 flex flex-col bg-[#0F0F0F]">
            {/* Header */}
            <div className="h-16 px-6 border-b border-[#282828] bg-[#1A1A1A] flex items-center justify-between sticky top-0 z-50">
              <div className="flex items-center gap-4">
                <Link to="/quest" className="p-2 hover:bg-[#282828] rounded-lg transition-colors">
                  <ChevronLeft size={20} />
                </Link>
                <h1 className="text-xl font-bold">{quest.title}</h1>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-[#8A8A8A]">{progress.completedNodes.length}/{quest.totalLevels}</span>
                  <div className="flex items-center gap-1">
                     {[...Array(10)].map((_, i) => (
                       <div 
                         key={i} 
                         className={`w-2 h-2 rounded-full ${i < (progress.completedNodes.length / quest.totalLevels) * 10 ? 'bg-[#FFA217]' : 'bg-[#282828]'}`}
                       ></div>
                     ))}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[#FFA217]">
                  <Trophy size={18} />
                  <span className="text-sm font-black">{progress.stars || 0}</span>
                </div>
              </div>
            </div>

            {/* Path View */}
            <div className="flex-1 overflow-y-auto bg-[#0F0F0F] relative" style={{ 
              backgroundImage: `linear-gradient(45deg, #141414 25%, transparent 25%), 
                                linear-gradient(-45deg, #141414 25%, transparent 25%), 
                                linear-gradient(45deg, transparent 75%, #141414 75%), 
                                linear-gradient(-45deg, transparent 75%, #141414 75%)`,
              backgroundSize: '40px 40px',
              backgroundPosition: '0 0, 0 20px, 20px -20px, -20px 0px'
            }}>
              <div className="max-w-4xl mx-auto py-12 px-6">
                {quest.sections.map((section, sIdx) => (
                  <div key={section.id} className="mb-24">
                    <h2 className="text-[#8A8A8A] text-xs font-black uppercase tracking-[0.2em] mb-12 text-center">{section.title}</h2>
                    
                    <div className="flex flex-col items-center gap-12 relative">
                      {/* SVG Path Line */}
                      <svg className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0" style={{ minHeight: section.nodes.length * 100 }}>
                        <path 
                          d={`M ${window.innerWidth / 2} 0 ${section.nodes.map((_, i) => `Q ${window.innerWidth / 2 + (i % 2 === 0 ? 80 : -80)} ${i * 120 + 60}, ${window.innerWidth / 2} ${i * 120 + 120}`).join(' ')}`}
                          fill="none"
                          stroke="#282828"
                          strokeWidth="3"
                          strokeDasharray="6 6"
                        />
                      </svg>

                      {section.nodes.map((node, nIdx) => (
                        <motion.div
                          key={node.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          className="relative z-10"
                        >
                          {node.type === "node" ? (
                            <div className="flex flex-col items-center group">
                              <div className={`
                                w-20 h-14 rounded-2xl flex items-center justify-center border-2 transition-all duration-300 relative
                                ${getNodeStatus(node.id) === 'active' ? 'bg-[#1A1A1A] border-[#E84C3D] shadow-[0_0_20px_rgba(232,76,61,0.4)] scale-110' : 
                                  getNodeStatus(node.id) === 'completed' ? 'bg-[#2DB55D] border-[#2DB55D]' : 
                                  'bg-[#1A1A1A] border-[#282828] text-[#3E3E3E]'}
                              `}>
                                {getNodeStatus(node.id) === 'active' && (
                                  <div className="absolute inset-0 rounded-2xl border-2 border-[#E84C3D] animate-pulse"></div>
                                )}
                                {getNodeStatus(node.id) === 'locked' ? <Lock size={20} /> : <Home size={24} className={getNodeStatus(node.id) === 'active' ? 'text-[#E84C3D]' : 'text-white'} />}
                              </div>
                              <div className={`mt-3 px-3 py-1 rounded-lg text-xs font-bold transition-colors ${getNodeStatus(node.id) === 'active' ? 'bg-[#E84C3D] text-white' : 'text-[#8A8A8A]'}`}>
                                {node.title}
                              </div>
                            </div>
                          ) : node.type === "chest" ? (
                            <div className="flex flex-col items-center">
                              <div className="w-14 h-14 bg-[#1A1A1A] rounded-2xl flex items-center justify-center border border-[#282828] shadow-sm">
                                <Gift size={24} className="text-[#8A8A8A]" />
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center">
                              <div className="w-14 h-14 bg-[#1A1A1A] rounded-2xl flex items-center justify-center border border-[#282828] shadow-sm">
                                 <HelpCircle size={24} className="text-purple-400/50" />
                              </div>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Locked Section Placeholder */}
                <div className="mt-24 p-12 rounded-[2rem] border-2 border-dashed border-[#282828] flex flex-col items-center justify-center text-[#3E3E3E]">
                  <Lock size={48} className="mb-4" />
                  <p className="text-lg font-bold">Complete the units above to unlock</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
