import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../api/index";
import { AuthContext } from "../context/AuthContext";
import ProblemDescription from "../components/Workspace/ProblemDescription";
import ProblemEditor from "../components/Workspace/ProblemEditor";
import ProblemSubmissions from "../components/Workspace/ProblemSubmissions";
import { FileText, History, List, MessageSquare } from "lucide-react";
import DiscussionList from "../components/Discussion/DiscussionList";

export default function ProblemDetail() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [problem, setProblem] = useState(null);
  const [answer, setAnswer] = useState("");
  const [msg, setMsg] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [activeTab, setActiveTab] = useState("description"); // 'description' | 'submissions' | 'discuss'

  useEffect(() => {
    setProblem(null);
    setAnswer("");
    setMsg(null);
    
    api
      .get(`/problems/${id}`)
      .then((r) => setProblem(r.data))
      .catch(() => {});

    if (user) {
      api
        .get(`/submissions/problem/${id}`)
        .then((r) => setSubmissions(r.data))
        .catch(() => {});
    }
  }, [id, user]);

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
        Loading problem...
      </div>
    );

  return (
    <div className="h-[calc(100vh-60px)] flex flex-col lg:flex-row bg-[var(--bg-primary)] overflow-hidden">
      
      {/* LEFT PANEL: Tabs (Description, Submissions, Discuss) */}
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
           <button
              onClick={() => setActiveTab("discuss")}
              className={`
                 flex items-center gap-2 px-4 h-full text-xs font-medium transition-colors border-r border-[var(--border-secondary)]
                 ${activeTab === "discuss" 
                    ? "bg-[var(--bg-secondary)] text-[var(--text-primary)]" 
                    : "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]"}
              `}
           >
              <MessageSquare size={14} />
              Discuss
           </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-hidden relative">
           {activeTab === "description" && <ProblemDescription key={id} problem={problem} />}
           {activeTab === "submissions" && <ProblemSubmissions key={id} submissions={submissions} />}
           {activeTab === "discuss" && <DiscussionList key={id} problemId={id} />}
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
         />
      </div>

    </div>
  );
}
