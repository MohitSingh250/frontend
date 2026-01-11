import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ChevronLeft, Lock, Star, Trophy, Zap, Gift, HelpCircle, Home, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import api from "../../api";
import { AuthContext } from "../../context/AuthContext";
import ProblemListSidebar from "../../components/ProblemList/ProblemListSidebar";
import QuestModal from "../../components/Quest/QuestModal";

// Mock data removed, fetching from backend

export default function QuestDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = React.useContext(AuthContext);
  const [quest, setQuest] = useState(null);
  const [progress, setProgress] = useState({ completedNodes: [], solvedProblems: [], activeNode: 1, stars: 0, chestsOpened: [] });
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);

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

  const handleNodeClick = (node) => {
    const status = getNodeStatus(node.id);
    if (status === 'locked') return;
    
    setSelectedNode(node);
    setIsModalOpen(true);
  };

  const handleStartQuest = () => {
    // Support both new array format (problemIds) and legacy single format (problemId)
    const pIds = selectedNode.problemIds || (selectedNode.problemId ? [selectedNode.problemId] : []);

    if (selectedNode && pIds.length > 0) {
      // Find the first unsolved problem
      const solved = progress.solvedProblems || [];
      const firstUnsolved = pIds.find(pid => !solved.includes(pid));
      
      // If all solved (shouldn't happen if node is active but not complete), default to first
      const targetProblemId = firstUnsolved || pIds[0];

      navigate(`/quest/problem/${targetProblemId}?questId=${id}&nodeId=${selectedNode.id}`);
    } else {
      console.log("No problems linked to this node");
    }
    setIsModalOpen(false);
  };

  const totalNodes = quest.sections.reduce((acc, section) => acc + section.nodes.length, 0);


  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white font-sans selection:bg-[#FFA217]/30 flex overflow-hidden">
      <ProblemListSidebar />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Header */}
        <div className="h-16 border-b border-[#282828] bg-[#1A1A1A] flex items-center justify-between px-6 shrink-0 z-20">
          <div className="flex items-center gap-4">
            <Link to="/quest" className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#282828] text-[#8A8A8A] hover:text-white hover:bg-[#333] transition-all">
              <ChevronLeft size={20} />
            </Link>
            <h1 className="text-xl font-bold text-white tracking-tight">{quest.title}</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#8A8A8A]">{progress.completedNodes.length}/{totalNodes}</span>
            <div className="flex gap-1">
              {Array.from({ length: totalNodes }).map((_, i) => (
                <div 
                  key={i} 
                  className={`h-2 w-2 rounded-full ${i < progress.completedNodes.length ? 'bg-[#58CC02]' : 'bg-[#333]'}`}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Scrollable Map Area */}
        <div className="flex-1 overflow-y-auto relative bg-[#151515]">
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
          
          <div className="relative max-w-3xl mx-auto px-6 py-12 min-h-full">
            {quest.sections.map((section) => (
              <div key={section.id} className="mb-16 relative">
                <div className="text-xs font-medium text-[#555] uppercase tracking-widest mb-12 pl-4 border-l-2 border-[#333]">
                  {section.title}
                </div>
                
                <div className="flex flex-col items-center gap-16 relative">
                  {/* Dashed Path Line */}
                  <svg className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0" style={{ minHeight: section.nodes.length * 120 }}>
                    <path 
                      d={`M ${window.innerWidth < 768 ? 150 : 336} 20 ${section.nodes.map((_, i) => {
                        // Vertical snake path logic
                        const x = (window.innerWidth < 768 ? 150 : 336) + (Math.sin(i * 1.5) * 40); 
                        const y = i * 120 + 60;
                        return `L ${x} ${y}`;
                      }).join(' ')}`}
                      fill="none"
                      stroke="#333"
                      strokeWidth="2"
                      strokeDasharray="6 6"
                      strokeLinecap="round"
                    />
                  </svg>

                  {section.nodes.map((node, nIdx) => {
                    const status = getNodeStatus(node.id);
                    const xOffset = Math.sin(nIdx * 1.5) * 40; // Matching path offset
                    
                    return (
                    <motion.div
                      key={node.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="relative z-10"
                      style={{ transform: `translateX(${xOffset}px)` }}
                    >
                      {/* Node Item */}
                      <div 
                        className={`
                          group relative flex items-center gap-4 px-5 py-3 rounded-2xl border-2 transition-all duration-300 cursor-pointer
                          ${status === 'active' 
                            ? 'bg-[#1A2A1A] border-[#2DB55D] shadow-[0_0_30px_-5px_rgba(45,181,93,0.4)] scale-110 animate-pulse' 
                            : status === 'completed'
                              ? 'bg-[#1A1A1A] border-[#333] opacity-80'
                              : 'bg-[#1A1A1A] border-[#282828] opacity-50'}
                        `}
                        onClick={() => handleNodeClick(node)}
                      >
                        {/* Icon Box */}
                        <div className={`
                          w-12 h-12 rounded-xl flex items-center justify-center border overflow-hidden relative
                          ${status === 'active' 
                            ? 'bg-[#1D3A1D] border-[#2DB55D]/30' 
                            : status === 'completed'
                              ? 'bg-[#2DB55D]/10 border-[#2DB55D]/30'
                              : 'bg-[#222] border-[#333]'}
                        `}>
                          {status === 'active' && <div className="absolute inset-0 bg-[#2DB55D]/10 animate-pulse"></div>}
                          
                          {node.type === 'chest' ? (
                            <img src="/store/treasure.png" alt="Chest" className={`w-8 h-8 object-contain ${status === 'locked' ? 'grayscale opacity-40' : ''}`} />
                          ) : node.type === 'mystery' ? (
                            <HelpCircle size={20} className="text-[#555]" />
                          ) : (
                            <img 
                              src="/store/hometree.png" 
                              alt="Level" 
                              className={`w-8 h-8 object-contain ${status === 'locked' ? 'grayscale opacity-30' : ''}`} 
                            />
                          )}
                        </div>

                        {/* Text Content */}
                        <div className="flex flex-col">
                          <span className={`text-sm font-medium ${status === 'locked' ? 'text-[#555]' : 'text-gray-200'}`}>
                            {node.title || (node.type === 'chest' ? 'Bonus Chest' : 'Mystery')}
                          </span>
                          {status === 'active' && (
                            <span className="text-[10px] text-[#2DB55D] font-bold uppercase tracking-wider">Current</span>
                          )}
                        </div>

                        {/* Active Glow */}
                        {status === 'active' && (
                          <div className="absolute inset-0 rounded-2xl border border-[#2DB55D]/50 animate-pulse pointer-events-none"></div>
                        )}
                      </div>
                    </motion.div>
                  )})}
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


      <QuestModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={handleStartQuest} 
      />
    </div>
  );
}
