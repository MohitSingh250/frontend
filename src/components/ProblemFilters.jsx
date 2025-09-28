import React from 'react';

export default function ProblemFilters({ filters, setFilters }) {
  return (
    <div className="bg-white p-4 rounded shadow mb-4 flex flex-wrap gap-3">
      <input value={filters.q} onChange={e => setFilters(f => ({ ...f, q: e.target.value }))} placeholder="Search (title / statement)" className="border rounded px-3 py-2 w-64" />
      <input value={filters.topic} onChange={e => setFilters(f => ({ ...f, topic: e.target.value }))} placeholder="Topic (Mechanics)" className="border rounded px-3 py-2" />
      <select value={filters.difficulty} onChange={e => setFilters(f => ({ ...f, difficulty: e.target.value }))} className="border rounded px-3 py-2">
        <option value="">Any difficulty</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <input value={filters.tags} onChange={e => setFilters(f => ({ ...f, tags: e.target.value }))} placeholder="tags comma separated" className="border rounded px-3 py-2" />
      <button onClick={() => setFilters({ q:'', topic:'', difficulty:'', tags:'' })} className="ml-auto text-sm text-red-600">Reset</button>
    </div>
  );
}
