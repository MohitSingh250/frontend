import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

export default function Contests() {
  const [contests, setContests] = useState([]);
  useEffect(() => {
    api.get('/contests').then(r => setContests(r.data)).catch(()=>{});
  }, []);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Contests</h1>
      <div className="space-y-3">
        {contests.map(c => (
          <div key={c._id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between">
              <div>
                <div className="font-semibold">{c.title}</div>
                <div className="text-sm text-gray-500">Starts: {new Date(c.startTime).toLocaleString()}</div>
              </div>
              <div>
                <Link to={`/contests/${c._id}`} className="text-blue-600">Open</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
