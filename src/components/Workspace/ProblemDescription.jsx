import React, { useState, useContext } from "react";
import ReactMarkdown from "react-markdown";
import { Lightbulb, ChevronRight, ChevronDown } from "lucide-react";
import { ThemeContext } from "../../context/ThemeContext";

export default function ProblemDescription({ problem }) {
  const { theme } = useContext(ThemeContext);
  const [shownHints, setShownHints] = useState(0);

  if (!problem) return null;

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
          {problem.title}
        </h1>
        <div className="flex items-center gap-3 text-sm">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
              problem.difficulty === "Easy"
                ? "bg-[var(--color-easy)]/10 text-[var(--color-easy)]"
                : problem.difficulty === "Medium"
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

      {/* Hints */}
      {problem.hints && problem.hints.length > 0 && (
        <div className="space-y-3 pt-4 border-t border-[var(--border-secondary)]">
          <div className="flex items-center gap-2 text-[var(--text-secondary)] font-medium text-sm">
             <Lightbulb size={16} />
             <span>Hints</span>
          </div>
          
          <div className="space-y-2">
             {problem.hints.map((hint, index) => (
                <div key={hint._id || index} className="rounded-lg overflow-hidden border border-[var(--border-secondary)]">
                   {index < shownHints ? (
                      <div className="bg-[var(--bg-tertiary)] p-4 text-sm">
                         <div className="flex justify-between items-start mb-2">
                            <span className="font-medium text-[var(--text-primary)]">Hint {index + 1}</span>
                         </div>
                         <ReactMarkdown>{hint.text}</ReactMarkdown>
                      </div>
                   ) : (
                      index === shownHints && (
                         <button 
                            onClick={() => setShownHints(prev => prev + 1)}
                            className="w-full flex items-center justify-between p-3 bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] transition-colors text-sm text-[var(--text-secondary)]"
                         >
                            <span>View Hint {index + 1}</span>
                            <ChevronRight size={16} />
                         </button>
                      )
                   )}
                </div>
             ))}
          </div>
        </div>
      )}
    </div>
  );
}
