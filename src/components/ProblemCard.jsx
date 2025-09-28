import React from 'react';
import { Link } from 'react-router-dom';

export default function ProblemCard({ problem }) {
  return (
    <div className="bg-white rounded shadow-sm p-4">
      <div className="flex justify-between items-center">
        <h3 className="text-md font-semibold">
          <Link to={`/problems/${problem._id}`} className="hover:underline">{problem.title}</Link>
        </h3>
        <span className={`px-2 py-1 rounded text-xs ${problem.difficulty === 'hard' ? 'bg-red-100 text-red-700' : problem.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
          {problem.difficulty}
        </span>
      </div>

      <div className="mt-2 text-sm text-gray-600">
        {problem.topics?.map(t => <span key={t} className="mr-2 inline-block text-xs bg-gray-100 px-2 py-1 rounded">{t}</span>)}
      </div>

      <div className="mt-3 text-right">
        <Link to={`/problems/${problem._id}`} className="text-blue-600 text-sm">Open →</Link>
      </div>
    </div>
  );
}
