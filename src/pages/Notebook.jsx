import React, { useEffect, useState } from "react";
import api from "../api";
import { Book, ArrowRight, Calendar, Edit2, Trash2, X, Check, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Notebook() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingNote, setEditingNote] = useState(null); // { problemId, note }
  const [editText, setEditText] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

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

  const handleEdit = (note) => {
    setEditingNote(note);
    setEditText(note.note);
  };

  const handleSave = async () => {
    if (!editingNote) return;
    setIsSaving(true);
    try {
      await api.put("/users/me/notes", {
        problemId: editingNote.problemId,
        note: editText
      });
      toast.success("Note updated!");
      setEditingNote(null);
      fetchNotes();
    } catch (err) {
      toast.error("Failed to update note");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (problemId) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await api.delete(`/users/me/notes/${problemId}`);
      toast.success("Note deleted!");
      fetchNotes();
    } catch (err) {
      toast.error("Failed to delete note");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[var(--text-secondary)]">
        <Loader2 className="animate-spin mr-2" /> Loading notebook...
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
                  <div className="flex-1 min-w-0">
                    <Link 
                      to={`/problems/${note.problemId}`}
                      className="text-lg font-bold hover:text-[var(--brand-orange)] transition-colors flex items-center gap-2 truncate"
                    >
                      {note.problemTitle}
                      <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </Link>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`
                        px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider
                        ${note.problemDifficulty === 'easy' ? 'bg-[var(--color-easy)]/10 text-[var(--color-easy)]' : ''}
                        ${note.problemDifficulty === 'medium' ? 'bg-[var(--color-medium)]/10 text-[var(--color-medium)]' : ''}
                        ${note.problemDifficulty === 'hard' ? 'bg-[var(--color-hard)]/10 text-[var(--color-hard)]' : ''}
                      `}>
                        {note.problemDifficulty}
                      </span>
                      <div className="flex items-center gap-1 text-[10px] text-[var(--text-tertiary)]">
                        <Calendar size={10} />
                        <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <button 
                      onClick={() => handleEdit(note)}
                      className="p-2 hover:bg-[var(--bg-tertiary)] rounded-lg text-[var(--text-tertiary)] hover:text-[var(--brand-orange)] transition-colors"
                      title="Edit Note"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(note.problemId)}
                      className="p-2 hover:bg-[var(--bg-tertiary)] rounded-lg text-[var(--text-tertiary)] hover:text-[var(--color-hard)] transition-colors"
                      title="Delete Note"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                
                {editingNote?.problemId === note.problemId ? (
                  <div className="mt-3 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-lg p-4 text-sm text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-orange)] min-h-[120px] font-mono"
                      placeholder="Write your note here..."
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditingNote(null)}
                        className="px-4 py-1.5 rounded-lg text-xs font-bold text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="px-4 py-1.5 rounded-lg bg-[var(--brand-orange)] text-white text-xs font-bold hover:opacity-90 transition-all flex items-center gap-2 disabled:opacity-50"
                      >
                        {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                        Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[var(--bg-tertiary)]/50 rounded-lg p-4 text-sm text-[var(--text-secondary)] whitespace-pre-wrap font-mono border border-transparent group-hover:border-[var(--border-primary)]/50 transition-colors">
                    {note.note}
                  </div>
                )}
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
              className="inline-block mt-4 px-6 py-2 bg-[var(--brand-orange)] text-white rounded-lg text-sm font-bold hover:opacity-90 transition-all shadow-lg shadow-[var(--brand-orange)]/20"
            >
              Start Solving
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
