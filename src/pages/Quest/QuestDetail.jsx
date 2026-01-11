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
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[var(--brand-orange)]"></div>
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
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans selection:bg-[var(--brand-orange)]/30 flex overflow-hidden">
      <ProblemListSidebar />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Header */}
        <div className="h-16 border-b border-[var(--border-primary)] bg-[var(--bg-secondary)] flex items-center justify-between px-6 shrink-0 z-20">
          <div className="flex items-center gap-4">
            <Link to="/quest" className="w-8 h-8 flex items-center justify-center rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-primary)] transition-all border border-[var(--border-primary)]">
              <ChevronLeft size={20} />
            </Link>
            <h1 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">{quest.title}</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[var(--text-tertiary)]">{progress.completedNodes.length}/{totalNodes}</span>
            <div className="flex gap-1">
              {Array.from({ length: totalNodes }).map((_, i) => (
                <div 
                  key={i} 
                  className={`h-2 w-2 rounded-full ${i < progress.completedNodes.length ? 'bg-[var(--color-easy)]' : 'bg-[var(--bg-tertiary)]'}`}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Scrollable Map Area */}
        <div className="flex-1 overflow-y-auto relative bg-[var(--bg-secondary)]">
          <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
          
          <div className="relative max-w-3xl mx-auto px-6 py-12 min-h-full">
            {quest.sections.map((section) => (
              <div key={section.id} className="mb-16 relative">
                <div className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-widest mb-12 pl-4 border-l-2 border-[var(--border-primary)]">
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
                      stroke="var(--border-primary)"
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
                            ? 'bg-[var(--bg-tertiary)] border-[var(--color-easy)] shadow-[0_0_30px_-5px_rgba(45,181,93,0.4)] scale-110 animate-pulse' 
                            : status === 'completed'
                              ? 'bg-[var(--bg-tertiary)] border-[var(--border-primary)] opacity-80'
                              : 'bg-[var(--bg-tertiary)] border-[var(--border-primary)] opacity-50'}
                        `}
                        onClick={() => handleNodeClick(node)}
                      >
                        {/* Icon Box */}
                        <div className={`
                          w-12 h-12 rounded-xl flex items-center justify-center border overflow-hidden relative
                          ${status === 'active' 
                            ? 'bg-[var(--bg-secondary)] border-[var(--color-easy)]/30' 
                            : status === 'completed'
                              ? 'bg-[var(--color-easy)]/10 border-[var(--color-easy)]/30'
                              : 'bg-[var(--bg-secondary)] border-[var(--border-primary)]'}
                        `}>
                          {status === 'active' && <div className="absolute inset-0 bg-[var(--color-easy)]/10 animate-pulse"></div>}
                          
                          {node.type === 'chest' ? (
                            <img src="/store/treasure.png" alt="Chest" className={`w-8 h-8 object-contain ${status === 'locked' ? 'grayscale opacity-40' : ''}`} />
                          ) : node.type === 'mystery' ? (
                            <HelpCircle size={20} className="text-[var(--text-tertiary)]" />
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
                          <span className={`text-sm font-medium ${status === 'locked' ? 'text-[var(--text-tertiary)]' : 'text-[var(--text-primary)]'}`}>
                            {node.title || (node.type === 'chest' ? 'Bonus Chest' : 'Mystery')}
                          </span>
                          {status === 'active' && (
                            <span className="text-[10px] text-[var(--color-easy)] font-bold uppercase tracking-wider">Current</span>
                          )}
                        </div>

                        {/* Active Glow */}
                        {status === 'active' && (
                          <div className="absolute inset-0 rounded-2xl border border-[var(--color-easy)]/50 animate-pulse pointer-events-none"></div>
                        )}
                      </div>
                    </motion.div>
                  )})}
                </div>
              </div>
            ))}
            {/* Locked Section Placeholder */}
            <div className="mt-24 p-12 rounded-[2rem] border-2 border-dashed border-[var(--border-primary)] flex flex-col items-center justify-center text-[var(--text-tertiary)]">
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
