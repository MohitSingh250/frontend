import React, { useState, useContext } from "react";
import ReactMarkdown from "react-markdown";
import { Lightbulb, ChevronRight, ChevronDown, Layers } from "lucide-react";
import { ThemeContext } from "../../context/ThemeContext";
import { Link } from "react-router-dom";

export default function ProblemDescription({ problem, isQuestMode }) {
  const { theme } = useContext(ThemeContext);
  const [activePanel, setActivePanel] = useState(null); // 'hints' | 'similar' | null
  const [unlockedHints, setUnlockedHints] = useState(0);

  if (!problem) return null;

  const hasHints = problem.hints && problem.hints.length > 0;
  const hasSimilar = !isQuestMode && problem.similarProblems && problem.similarProblems.length > 0;

  const togglePanel = (panel) => {
    setActivePanel(activePanel === panel ? null : panel);
  };

  const revealNextHint = () => {
    if (unlockedHints < problem.hints.length) {
      setUnlockedHints(prev => prev + 1);
    }
  };

  return (
    <div className="flex flex-col h-full relative overflow-hidden bg-[var(--bg-primary)]">
      
      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto p-6 pb-24 custom-scrollbar">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
            {problem.title}
          </h1>
          <div className="flex items-center gap-3 text-sm">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                problem.difficulty?.toLowerCase() === "easy"
                  ? "bg-[var(--color-easy)]/10 text-[var(--color-easy)]"
                  : problem.difficulty?.toLowerCase() === "medium"
                  ? "bg-[var(--color-medium)]/10 text-[var(--color-medium)]"
                  : "bg-[var(--color-hard)]/10 text-[var(--color-hard)]"
              }`}
            >
              {problem.difficulty}
            </span>
            {problem.topics?.map((t) => (
              <span
                key={t}
                className="px-2 py-1 rounded-md bg-[var(--bg-tertiary)] text-[var(--text-secondary)] text-xs"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Statement */}
        <div className={`prose ${theme === 'dark' ? 'prose-invert' : ''} max-w-none text-[var(--text-primary)] text-sm leading-relaxed`}>
          <ReactMarkdown>{problem.statement}</ReactMarkdown>
        </div>
      </div>

      {/* Fixed Bottom Panel (Integrated Drawer) */}
      {(hasHints || hasSimilar) && (
        <div className={`absolute bottom-0 left-0 right-0 z-10 transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) flex flex-col overflow-hidden
          ${activePanel ? "h-[350px]" : "h-12"} 
          bg-[var(--bg-secondary)] border-t border-[var(--border-primary)] rounded-t-xl shadow-[0_-8px_30px_rgba(0,0,0,0.12)]`}
        >
          {/* Toggle Bar */}
          <div className="flex items-center h-12 px-4 gap-6 bg-[var(--bg-tertiary)]/50 border-b border-[var(--border-secondary)]">
            {hasHints && (
              <button
                onClick={() => togglePanel('hints')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors
                  ${activePanel === 'hints' 
                    ? "text-[var(--brand-orange)] bg-[var(--brand-orange)]/10" 
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
              >
                <Lightbulb size={14} />
                <span>Hints ({unlockedHints}/{problem.hints.length})</span>
                {activePanel === 'hints' ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </button>
            )}
            
            {hasSimilar && (
              <button
                onClick={() => togglePanel('similar')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors
                  ${activePanel === 'similar' 
                    ? "text-[var(--brand-orange)] bg-[var(--brand-orange)]/10" 
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
              >
                <Layers size={14} />
                <span>Similar Problems</span>
                {activePanel === 'similar' ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </button>
            )}
          </div>

          {/* Panel Content */}
          <div className="flex-1 overflow-y-auto p-6 bg-[var(--bg-secondary)]">
            {activePanel === 'hints' && (
              <div className="space-y-4 max-w-3xl mx-auto">
                {problem.hints.map((hint, index) => (
                  index < unlockedHints && (
                    <div key={index} className="p-4 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-secondary)] shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[var(--brand-orange)]/20 text-[var(--brand-orange)] text-xs font-bold">
                          {index + 1}
                        </div>
                        <span className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">Hint</span>
                      </div>
                      <div className="text-sm text-[var(--text-primary)] leading-relaxed pl-7">
                         <ReactMarkdown>{hint.text}</ReactMarkdown>
                      </div>
                    </div>
                  )
                ))}
                
                {unlockedHints < problem.hints.length && (
                  <button 
                    onClick={revealNextHint}
                    className="w-full py-3 rounded-xl border-2 border-dashed border-[var(--border-secondary)] text-[var(--text-secondary)] hover:border-[var(--brand-orange)] hover:text-[var(--brand-orange)] hover:bg-[var(--brand-orange)]/5 transition-all flex items-center justify-center gap-2 text-sm font-medium group"
                  >
                    <Lightbulb size={16} className="group-hover:scale-110 transition-transform" />
                    <span>Reveal Hint {unlockedHints + 1}</span>
                  </button>
                )}
              </div>
            )}

            {activePanel === 'similar' && (
              <div className="grid grid-cols-1 gap-3 max-w-3xl mx-auto">
                {problem.similarProblems.map((p) => (
                  <Link 
                    key={p._id}
                    to={`/problems/${p._id}`}
                    className="flex items-center justify-between p-4 rounded-xl bg-[var(--bg-tertiary)] hover:bg-[var(--bg-primary)] border border-[var(--border-secondary)] hover:border-[var(--brand-orange)]/50 transition-all group shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-1 h-8 rounded-full ${
                        p.difficulty?.toLowerCase() === 'easy' ? 'bg-[var(--color-easy)]' :
                        p.difficulty?.toLowerCase() === 'medium' ? 'bg-[var(--color-medium)]' :
                        'bg-[var(--color-hard)]'
                      }`} />
                      <span className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--brand-orange)] transition-colors">{p.title}</span>
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wide ${
                      p.difficulty?.toLowerCase() === 'easy' ? 'text-[var(--color-easy)] bg-[var(--color-easy)]/10' :
                      p.difficulty?.toLowerCase() === 'medium' ? 'text-[var(--color-medium)] bg-[var(--color-medium)]/10' :
                      'text-[var(--color-hard)] bg-[var(--color-hard)]/10'
                    }`}>
                      {p.difficulty}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
