import React, { useEffect, useState } from "react";
import api from "../api";
import { Book, ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

export default function Notebook() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/users/me/dashboard");
        setNotes(res.data.notes || []);
      } catch (err) {
        console.error("Error fetching notes:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[var(--text-secondary)]">
        Loading notebook...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-xl bg-[var(--accent-blue)]/10 text-[var(--accent-blue)]">
            <Book size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">My Notebook</h1>
            <p className="text-[var(--text-secondary)] text-sm">
              Your personal notes and thoughts on problems
            </p>
          </div>
        </div>

        {notes.length > 0 ? (
          <div className="grid gap-4">
            {notes.map((note, idx) => (
              <div 
                key={idx} 
                className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-xl p-5 hover:border-[var(--brand-orange)] transition-colors group"
              >
                <div className="flex justify-between items-start mb-3">
                  <Link 
                    to={`/problems/${note.problemId}`}
                    className="text-lg font-bold hover:text-[var(--brand-orange)] transition-colors flex items-center gap-2"
                  >
                    {note.problemTitle}
                    <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  <span className={`
                    px-2 py-1 rounded text-xs font-medium capitalize
                    ${note.problemDifficulty === 'easy' ? 'bg-[var(--color-easy)]/10 text-[var(--color-easy)]' : ''}
                    ${note.problemDifficulty === 'medium' ? 'bg-[var(--color-medium)]/10 text-[var(--color-medium)]' : ''}
                    ${note.problemDifficulty === 'hard' ? 'bg-[var(--color-hard)]/10 text-[var(--color-hard)]' : ''}
                  `}>
                    {note.problemDifficulty}
                  </span>
                </div>
                
                <div className="bg-[var(--bg-tertiary)]/50 rounded-lg p-4 text-sm text-[var(--text-secondary)] whitespace-pre-wrap font-mono">
                  {note.note}
                </div>

                <div className="flex items-center gap-2 mt-4 text-xs text-[var(--text-tertiary)]">
                  <Calendar size={12} />
                  <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[var(--bg-secondary)] rounded-xl border border-dashed border-[var(--border-primary)]">
            <Book size={48} className="mx-auto text-[var(--text-tertiary)] mb-4" />
            <h3 className="text-lg font-medium text-[var(--text-primary)]">No notes yet</h3>
            <p className="text-[var(--text-secondary)] text-sm mt-1">
              Add notes to problems while solving them to see them here.
            </p>
            <Link 
              to="/problems" 
              className="inline-block mt-4 px-4 py-2 bg-[var(--brand-orange)] text-[var(--bg-primary)] rounded-lg text-sm font-medium hover:opacity-90"
            >
              Start Solving
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
