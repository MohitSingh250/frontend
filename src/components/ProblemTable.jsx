import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api';
import { CheckCircle2, Circle, FileText } from 'lucide-react';

const HighlightText = ({ text, query }) => {
  if (!query || !query.trim()) return text;
  
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return (
    <span>
      {parts.map((part, i) => 
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-[var(--brand-orange)]/30 text-[var(--brand-orange)] rounded-sm px-0.5">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </span>
  );
};

export default function ProblemTable({ problems, loading, searchQuery }) {
  const { user } = useContext(AuthContext);
  const [solvedIds, setSolvedIds] = useState(new Set());

  useEffect(() => {
    const fetchSolved = async () => {
      if (!user?._id) return;
      try {
        const res = await api.get(`/submissions/user/${user._id}`);
        const solved = res.data
          .filter(sub => sub.isCorrect)
          .map(sub => sub.problemId);
        setSolvedIds(new Set(solved));
      } catch (err) {
        console.error("Failed to fetch solved problems", err);
      }
    };
    fetchSolved();
  }, [user]);

  const getDifficultyColor = (diff) => {
    switch (diff?.toLowerCase()) {
      case 'hard': return 'text-[var(--color-hard)]';
      case 'medium': return 'text-[var(--color-medium)]';
      case 'easy': return 'text-[var(--color-easy)]';
      default: return 'text-[var(--text-secondary)]';
    }
  };

  if (loading && problems.length === 0) {
     return (
        <div className="space-y-2">
           {[...Array(10)].map((_, i) => (
              <div key={i} className="h-12 w-full bg-[var(--bg-secondary)] animate-pulse rounded-md" />
           ))}
        </div>
     );
  }

  return (
    <div className="w-full overflow-hidden rounded-lg bg-transparent">
      <table className="w-full text-left text-sm border-separate border-spacing-y-0.5">
        <thead className="text-[var(--text-secondary)] text-xs uppercase tracking-wider">
          <tr>
            <th className="px-4 py-3 w-12 text-center font-medium border-b border-transparent">Status</th>
            <th className="px-4 py-3 font-medium border-b border-transparent">Title</th>
            <th className="px-4 py-3 w-24 font-medium border-b border-transparent">Acceptance</th>
            <th className="px-4 py-3 w-24 font-medium border-b border-transparent">Difficulty</th>
            <th className="px-4 py-3 w-12 font-medium border-b border-transparent">Frequency</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((problem, index) => {
            const isSolved = solvedIds.has(problem._id);
            const acceptance = (Math.random() * 40 + 30).toFixed(1); // Mock data
            const rowBg = index % 2 === 0 ? 'bg-[var(--bg-secondary)]' : 'bg-[var(--bg-primary)]';

            return (
              <tr 
                key={problem._id} 
                className="group transition-colors"
              >
                <td className={`px-4 py-2 text-center rounded-l-lg ${rowBg} transition-colors`}>
                  {isSolved ? (
                    <CheckCircle2 size={16} className="text-[var(--color-success)] mx-auto" />
                  ) : (
                    <Circle size={16} className="text-[var(--text-tertiary)] mx-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </td>
                <td className={`px-4 py-2 font-medium ${rowBg} transition-colors`}>
                  <Link 
                    to={`/problems/${problem._id}`} 
                    className="text-[var(--text-primary)] transition-colors flex items-center gap-2"
                  >
                    <HighlightText text={problem.title} query={searchQuery} />
                  </Link>
                </td>
                <td className={`px-4 py-2 text-[var(--text-secondary)] ${rowBg} transition-colors`}>
                  {acceptance}%
                </td>
                <td className={`px-4 py-2 font-medium ${getDifficultyColor(problem.difficulty)} ${rowBg} transition-colors`}>
                  {problem.difficulty?.toLowerCase()}
                </td>
                <td className={`px-4 py-2 text-center rounded-r-lg ${rowBg} transition-colors`}>
                   <div className="flex items-center justify-center gap-1 opacity-50">
                      <div className="w-1 h-3 bg-[var(--text-tertiary)] rounded-full h-[4px]" />
                      <div className="w-1 h-3 bg-[var(--text-tertiary)] rounded-full h-[6px]" />
                      <div className="w-1 h-3 bg-[var(--text-tertiary)] rounded-full h-[8px]" />
                      <div className="w-1 h-3 bg-[var(--text-tertiary)] rounded-full h-[4px]" />
                   </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
