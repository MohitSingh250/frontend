import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api';
import { CheckCircle2, Circle, FileText } from 'lucide-react';

export default function ProblemTable({ problems, loading }) {
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
      case 'hard': return 'text-[var(--alert-red)]';
      case 'medium': return 'text-[var(--orange-peel)]';
      case 'easy': return 'text-[var(--dark-pastel-green)]';
      default: return 'text-[var(--text-secondary)]';
    }
  };

  if (loading && problems.length === 0) {
     return (
        <div className="space-y-2">
           {[...Array(10)].map((_, i) => (
              <div key={i} className="h-12 w-full bg-[var(--card-bg)] animate-pulse rounded-md" />
           ))}
        </div>
     );
  }

  return (
    <div className="w-full overflow-hidden rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]">
      <table className="w-full text-left text-sm">
        <thead className="bg-[var(--glass-border)] text-[var(--text-secondary)] uppercase text-xs font-medium">
          <tr>
            <th className="px-4 py-3 w-12 text-center">Status</th>
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3 w-24">Acceptance</th>
            <th className="px-4 py-3 w-24">Difficulty</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--card-border)]">
          {problems.map((problem, index) => {
            const isSolved = solvedIds.has(problem._id);
            const acceptance = (Math.random() * 40 + 30).toFixed(1); // Mock data for now

            return (
              <tr 
                key={problem._id} 
                className={`
                   group transition-colors hover:bg-[var(--card-border)]
                   ${index % 2 === 0 ? 'bg-transparent' : 'bg-[var(--raisin-black)]/50'}
                `}
              >
                <td className="px-4 py-3 text-center">
                  {isSolved ? (
                    <CheckCircle2 size={16} className="text-[var(--dark-pastel-green)] mx-auto" />
                  ) : (
                    <Circle size={16} className="text-[var(--text-secondary)]/30 mx-auto group-hover:text-[var(--text-secondary)]" />
                  )}
                </td>
                <td className="px-4 py-3 font-medium">
                  <Link 
                    to={`/problems/${problem._id}`} 
                    className="text-[var(--white)] hover:text-[var(--aqua)] transition-colors flex items-center gap-2"
                  >
                    {problem.title}
                  </Link>
                </td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">
                  {acceptance}%
                </td>
                <td className={`px-4 py-3 font-medium ${getDifficultyColor(problem.difficulty)}`}>
                  {problem.difficulty}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
