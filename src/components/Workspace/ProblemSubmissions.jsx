import React from "react";
import { Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

export default function ProblemSubmissions({ submissions }) {
  if (!submissions || submissions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-[var(--text-secondary)] p-6 text-center">
        <Clock className="w-12 h-12 mb-3 opacity-20" />
        <p>No submissions yet</p>
        <p className="text-xs mt-1">Submit your code to see results here</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-4 space-y-3">
      {submissions.map((s) => (
        <div
          key={s._id}
          className="bg-[var(--bg-tertiary)] p-4 rounded-lg border border-[var(--border-secondary)] hover:border-[var(--border-primary)] transition-colors"
        >
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
               {s.isCorrect ? (
                  <CheckCircle2 size={18} className="text-[var(--color-success)]" />
               ) : s.manual ? (
                  <AlertCircle size={18} className="text-[var(--color-medium)]" />
               ) : (
                  <XCircle size={18} className="text-[var(--color-error)]" />
               )}
               <span className={`font-medium ${
                  s.isCorrect ? "text-[var(--color-success)]" 
                  : s.manual ? "text-[var(--color-medium)]"
                  : "text-[var(--color-error)]"
               }`}>
                  {s.isCorrect ? "Accepted" : s.manual ? "Pending Review" : "Wrong Answer"}
               </span>
            </div>
            <span className="text-xs text-[var(--text-secondary)]">
               {new Date(s.createdAt).toLocaleDateString()}
            </span>
          </div>
          
          <div className="flex justify-between items-center text-xs text-[var(--text-secondary)]">
             <span>Score: {s.score ?? 0}</span>
             <span>{new Date(s.createdAt).toLocaleTimeString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
