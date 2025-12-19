import React from "react";
import { Play, Send, RotateCcw } from "lucide-react";

export default function ProblemEditor({ problem, answer, setAnswer, submit, msg }) {
  if (!problem) return null;

  return (
    <div className="flex flex-col h-full bg-[var(--bg-secondary)] border-l border-[var(--border-primary)]">
      {/* Editor Header */}
      <div className="h-10 flex items-center px-4 border-b border-[var(--border-primary)] bg-[var(--bg-tertiary)]">
        <span className="text-xs font-medium text-[var(--text-secondary)]">
           Answer
        </span>
      </div>

      {/* Editor Content */}
      <div className="flex-1 p-4 overflow-y-auto">
         
         {/* MCQ Input */}
         {problem.inputType === "mcq_single" && (
            <div className="space-y-3">
               <p className="text-sm text-[var(--text-primary)] font-medium mb-2">Select the correct option:</p>
               {problem.options?.map((o) => (
               <label
                  key={o.id}
                  className={`
                     flex items-center p-3 rounded-lg border cursor-pointer transition-all
                     ${answer === o.id 
                        ? "bg-[var(--brand-orange)]/10 border-[var(--brand-orange)]" 
                        : "bg-[var(--bg-tertiary)] border-[var(--border-secondary)] hover:border-[var(--text-secondary)]"}
                  `}
               >
                  <input
                     type="radio"
                     name="opt"
                     value={o.id}
                     checked={answer === o.id}
                     onChange={(e) => setAnswer(e.target.value)}
                     className="hidden"
                  />
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-3 ${
                     answer === o.id ? "border-[var(--brand-orange)]" : "border-[var(--text-secondary)]"
                  }`}>
                     {answer === o.id && <div className="w-2 h-2 rounded-full bg-[var(--brand-orange)]" />}
                  </div>
                  <span className="text-sm text-[var(--text-primary)]">
                     <span className="font-bold mr-2">{o.id}.</span> {o.text}
                  </span>
               </label>
               ))}
            </div>
         )}

         {/* Numeric Input */}
         {problem.inputType === "numeric" && (
            <div className="space-y-2">
               <p className="text-sm text-[var(--text-primary)] font-medium">Enter your answer:</p>
               <input
               value={answer}
               onChange={(e) => setAnswer(e.target.value)}
               placeholder="Type your numerical answer here..."
               className="
                  w-full bg-[var(--bg-tertiary)] text-[var(--text-primary)] 
                  border border-[var(--border-secondary)] rounded-lg px-4 py-3
                  focus:outline-none focus:border-[var(--brand-orange)]
                  font-mono text-sm
               "
               />
            </div>
         )}

         {/* Manual / Text Input */}
         {problem.inputType === "manual" && (
            <div className="h-full flex flex-col">
               <textarea
               value={answer}
               onChange={(e) => setAnswer(e.target.value)}
               placeholder="// Write your solution here..."
               className="
                  flex-1 w-full bg-[var(--bg-tertiary)] text-[var(--text-primary)] 
                  border border-[var(--border-secondary)] rounded-lg p-4
                  focus:outline-none focus:border-[var(--brand-orange)]
                  font-mono text-sm resize-none leading-relaxed
               "
               spellCheck="false"
               />
            </div>
         )}
      </div>

      {/* Editor Footer (Actions) */}
      <div className="p-4 border-t border-[var(--border-primary)] bg-[var(--bg-tertiary)] flex items-center justify-between">
         <div className="flex items-center gap-2">
            {msg && (
               <span className={`text-sm font-medium px-3 py-1.5 rounded-md ${
                  msg.type === "error" 
                  ? "bg-[var(--color-error)]/10 text-[var(--color-error)]" 
                  : "bg-[var(--color-success)]/10 text-[var(--color-success)]"
               }`}>
                  {msg.text}
               </span>
            )}
         </div>
         
         <div className="flex items-center gap-2">
            <button 
               className="px-4 py-1.5 rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] transition-colors flex items-center gap-2"
               onClick={() => setAnswer("")}
            >
               <RotateCcw size={14} />
               Reset
            </button>
            <button 
               onClick={submit}
               className="px-5 py-1.5 rounded-lg text-sm font-medium bg-[var(--color-success)] text-white hover:brightness-110 transition-all flex items-center gap-2 shadow-lg shadow-[var(--color-success)]/20"
            >
               <Send size={14} />
               Submit
            </button>
         </div>
      </div>
    </div>
  );
}
