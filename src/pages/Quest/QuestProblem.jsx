import React, { useEffect, useState, useContext } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import api from "../../api/index";
import { AuthContext } from "../../context/AuthContext";
import ProblemDescription from "../../components/Workspace/ProblemDescription";
import ProblemEditor from "../../components/Workspace/ProblemEditor";
import ProblemSubmissions from "../../components/Workspace/ProblemSubmissions";
import { FileText, History, ChevronLeft, Map } from "lucide-react";
import toast from "react-hot-toast";
import confetti from "canvas-confetti";

export default function QuestProblem() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const questId = searchParams.get("questId");
  const nodeId = searchParams.get("nodeId");
  const navigate = useNavigate();
  
  const { user } = useContext(AuthContext);
  const [problem, setProblem] = useState(null);
  const [answer, setAnswer] = useState("");
  const [msg, setMsg] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [activeTab, setActiveTab] = useState("description"); // 'description' | 'submissions'
  const [questNode, setQuestNode] = useState(null);
  const [nextProblemId, setNextProblemId] = useState(null);

  useEffect(() => {
    setProblem(null);
    setAnswer("");
    setMsg(null);
    setNextProblemId(null);
    
    // Fetch Problem
    api.get(`/problems/${id}`).then((r) => setProblem(r.data)).catch(() => {});

    // Fetch Quest Node Data to determine next problem
    if (questId && nodeId) {
      api.get(`/quests/${questId}`).then((res) => {
        const quest = res.data;
        let foundNode = null;
        for (const section of quest.sections) {
          foundNode = section.nodes.find(n => n.id.toString() === nodeId);
          if (foundNode) break;
        }
        setQuestNode(foundNode);
        
        // Determine next problem (simple check based on current index)
        if (foundNode && foundNode.problemIds) {
          const currentIndex = foundNode.problemIds.findIndex(pid => pid === id);
          if (currentIndex !== -1 && currentIndex < foundNode.problemIds.length - 1) {
             setNextProblemId(foundNode.problemIds[currentIndex + 1]);
          }
        }
      });
    }

    if (user) {
      api.get(`/submissions/problem/${id}`).then((r) => setSubmissions(r.data)).catch(() => {});
    }
  }, [id, user, questId, nodeId]);

  const submit = async () => {
    setMsg(null);
    try {
      const res = await api.post("/submissions", { problemId: id, answer });
      setMsg({
        type: res.data.correct ? "success" : "error",
        text: res.data.message || (res.data.correct ? "✅ Correct!" : "❌ Wrong"),
      });
      
      if (user) {
        const s = await api.get(`/submissions/problem/${id}`);
        setSubmissions(s.data);

        // Update Quest Progress
        if (res.data.correct && questId && nodeId) {
          try {
            const progRes = await api.post("/quests/progress", {
              questId,
              nodeId: parseInt(nodeId),
              type: "node",
              problemId: id
            });
            
            if (progRes.data.nodeComplete) {
               toast.success("Level Complete! Quest Updated 🚀");
               confetti({
                 particleCount: 400,
                 spread: 160,
                 origin: { y: 0.6 },
                 scalar: 0.8,
                 ticks: 600,      // Lasts longer
                 gravity: 0.4,    // Falls slower
                 decay: 0.94,     // Slows down air resistance
                 drift: 0.1,      // Slight breeze effect
                 shapes: ['square', 'circle'], // No stars
                 colors: ['#FFD700', '#FFA500', '#FF4500', '#008000', '#0000FF', '#4B0082', '#EE82EE']
               });
            } else {
               toast.success("Problem Solved! Keep going! 🔥");
            }
          } catch (err) {
            console.error("Failed to update quest progress", err);
          }
        }
      }
    } catch (err) {
      setMsg({
        type: "error",
        text: err?.response?.data?.message || "Submit failed",
      });
    }
  };

  if (!problem)
    return (
      <div className="flex items-center justify-center min-h-screen text-[var(--text-secondary)] bg-[var(--bg-primary)]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#FFA217]"></div>
      </div>
    );

  return (
    <div className="h-screen flex flex-col bg-[var(--bg-primary)] overflow-hidden">
      {/* Quest Header */}
      <div className="h-16 border-b border-[#282828] bg-[#1A1A1A] flex items-center justify-between px-6 shadow-sm z-50">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(`/quest/${questId}`)}
            className="flex items-center gap-2 text-[#8A8A8A] hover:text-white transition-colors text-sm font-bold uppercase tracking-wide"
          >
            <ChevronLeft size={18} />
            Map
          </button>
          <div className="h-6 w-[1px] bg-[#282828]"></div>
          <div className="flex items-center gap-2 text-[#58CC02] font-black tracking-wider">
            <Map size={20} />
            <span>QUEST MODE</span>
          </div>
        </div>
        
        <div className="absolute left-1/2 -translate-x-1/2 text-lg font-bold text-white">
          {problem.title}
        </div>

        <div className="w-[150px] flex justify-end">
           {questNode && questNode.problemIds && (
             <div className="px-3 py-1 rounded-full bg-[#282828] border border-[#333] text-xs font-mono text-[#8A8A8A]">
               Problem <span className="text-white font-bold">{questNode.problemIds.findIndex(pid => pid === id) + 1}</span>
               <span className="mx-1">/</span>
               <span>{questNode.problemIds.length}</span>
             </div>
           )}
        </div> 
      </div>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* LEFT PANEL: Tabs (Description, Submissions) */}
        <div className="w-full lg:w-1/2 flex flex-col border-r border-[var(--border-secondary)] bg-[var(--bg-secondary)]">
          
          {/* Tab Header */}
          <div className="flex items-center h-10 bg-[var(--bg-tertiary)] border-b border-[var(--border-secondary)]">
             <button
                onClick={() => setActiveTab("description")}
                className={`
                   flex items-center gap-2 px-4 h-full text-xs font-medium transition-colors border-r border-[var(--border-secondary)]
                   ${activeTab === "description" 
                      ? "bg-[var(--bg-secondary)] text-[var(--text-primary)]" 
                      : "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]"}
                `}
             >
                <FileText size={14} />
                Description
             </button>
             <button
                onClick={() => setActiveTab("submissions")}
                className={`
                   flex items-center gap-2 px-4 h-full text-xs font-medium transition-colors border-r border-[var(--border-secondary)]
                   ${activeTab === "submissions" 
                      ? "bg-[var(--bg-secondary)] text-[var(--text-primary)]" 
                      : "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]"}
                `}
             >
                <History size={14} />
                Submissions
             </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-hidden relative">
             {activeTab === "description" && <ProblemDescription key={id} problem={problem} isQuestMode={!!questId} />}
             {activeTab === "submissions" && <ProblemSubmissions key={id} submissions={submissions} />}
          </div>

        </div>

        {/* RIGHT PANEL: Editor */}
        <div className="w-full lg:w-1/2 flex flex-col bg-[var(--bg-primary)]">
           <ProblemEditor 
              key={id}
              problem={problem} 
              answer={answer} 
              setAnswer={setAnswer} 
              submit={submit} 
              msg={msg} 
              nextProblemId={nextProblemId}
              onNextProblem={() => navigate(`/quest/problem/${nextProblemId}?questId=${questId}&nodeId=${nodeId}`)}
           />
        </div>
      </div>
    </div>
  );
}
