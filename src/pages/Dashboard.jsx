import React, { useEffect, useState } from 'react';
import api from '../api';

export default function Dashboard() {
  const [data, setData] = useState(null);
  useEffect(() => {
    api.get('/users/me/dashboard').then(r => setData(r.data)).catch(()=>{});
  }, []);

  if (!data) return <div>Loading...</div>;
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-sm text-gray-500">Username</h3>
          <div className="text-lg">{data.username}</div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-sm text-gray-500">Total Solved</h3>
          <div className="text-lg">{data.totalSolved}</div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-sm text-gray-500">Accuracy</h3>
          <div className="text-lg">{data.accuracy}%</div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="font-semibold">Topic Accuracy</h2>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
          {Object.entries(data.topicStats || {}).map(([topic, s]) => (
            <div key={topic} className="bg-white p-3 rounded shadow">
              <div className="font-semibold">{topic}</div>
              <div className="text-sm">Attempts: {s.attempts} — Accuracy: {s.accuracy}%</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="font-semibold">Solved Problems</h2>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
          {data.solvedProblems?.map(p => (
            <div key={p._id} className="bg-white p-3 rounded shadow">
              <div className="font-medium">{p.title}</div>
              <div className="text-sm text-gray-600">{p.difficulty}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
