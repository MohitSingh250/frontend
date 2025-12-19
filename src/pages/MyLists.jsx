import React, { useEffect, useState } from "react";
import api from "../api";
import { List, ArrowRight, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import ProblemTable from "../components/ProblemTable";

export default function MyLists() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookmarks = async () => {
    try {
      const res = await api.get("/problems/bookmarks");
      setBookmarks(res.data);
    } catch (err) {
      console.error("Error fetching bookmarks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[var(--text-secondary)]">
        Loading lists...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-xl bg-[var(--color-success)]/10 text-[var(--color-success)]">
            <List size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">My Lists</h1>
            <p className="text-[var(--text-secondary)] text-sm">
              Your bookmarked problems and custom collections
            </p>
          </div>
        </div>

        {bookmarks.length > 0 ? (
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-xl overflow-hidden">
             <ProblemTable problems={bookmarks} loading={false} />
          </div>
        ) : (
          <div className="text-center py-20 bg-[var(--bg-secondary)] rounded-xl border border-dashed border-[var(--border-primary)]">
            <List size={48} className="mx-auto text-[var(--text-tertiary)] mb-4" />
            <h3 className="text-lg font-medium text-[var(--text-primary)]">No bookmarks yet</h3>
            <p className="text-[var(--text-secondary)] text-sm mt-1">
              Bookmark problems to save them for later.
            </p>
            <Link 
              to="/problems" 
              className="inline-block mt-4 px-4 py-2 bg-[var(--brand-orange)] text-white rounded-lg text-sm font-medium hover:opacity-90"
            >
              Browse Problems
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
