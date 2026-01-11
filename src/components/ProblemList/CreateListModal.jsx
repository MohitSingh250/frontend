import React, { useState } from "react";
import { X, Lock, Globe } from "lucide-react";

export default function CreateListModal({ isOpen, onClose, onCreate, initialData = null }) {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [isPrivate, setIsPrivate] = useState(initialData?.isPrivate ?? true);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    setLoading(true);
    try {
      await onCreate({ name, description, isPrivate });
      onClose();
    } catch (err) {
      console.error("Error creating list:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-2xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-6 border-b border-[var(--border-primary)]">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            {initialData ? "Edit List" : "Create New List"}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-[var(--bg-tertiary)] rounded-full transition-colors text-[var(--text-secondary)]"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[var(--text-secondary)]">Title</label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value.slice(0, 30))}
                placeholder="Enter a list name"
                className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-orange)]/50 transition-all"
                required
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-[var(--text-tertiary)] font-mono">
                {name.length}/30
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[var(--text-secondary)]">Description</label>
            <div className="relative">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value.slice(0, 150))}
                placeholder="Describe your list"
                rows={4}
                className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-orange)]/50 transition-all resize-none"
              />
              <span className="absolute right-4 bottom-3 text-[10px] text-[var(--text-tertiary)] font-mono">
                {description.length}/150
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                  className="peer sr-only"
                />
                <div className="w-5 h-5 border-2 border-[var(--border-primary)] rounded-md peer-checked:bg-[var(--brand-orange)] peer-checked:border-[var(--brand-orange)] transition-all flex items-center justify-center">
                  {isPrivate && <div className="w-2 h-2 bg-white rounded-sm" />}
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-[var(--text-primary)] flex items-center gap-2">
                  Private {isPrivate ? <Lock size={12} /> : <Globe size={12} />}
                </span>
                <span className="text-[11px] text-[var(--text-tertiary)]">
                  Only you can see this list
                </span>
              </div>
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl text-sm font-semibold text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !name.trim()}
              className="px-8 py-2.5 rounded-xl text-sm font-bold bg-[var(--brand-orange)] text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-[var(--brand-orange)]/20"
            >
              {loading ? "Creating..." : initialData ? "Save Changes" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
