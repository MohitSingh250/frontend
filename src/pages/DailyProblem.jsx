import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

export default function DailyProblem() {
  const [p, setP] = useState(null);
  useEffect(() => {
    api.get('/problems/daily-problem').then(r => setP(r.data)).catch(()=>{});
  }, []);
  if (!p) return <div>Loading...</div>;
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Daily Problem</h1>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold">{p.title}</h2>
        <div className="text-sm text-gray-600 mb-2">Difficulty: {p.difficulty}</div>
        <p className="mb-2">{p.statement?.slice?.(0, 300)}...</p>
        <Link to={`/problems/${p._id}`} className="text-blue-600">Open problem</Link>
      </div>
    </div>
  );
}
