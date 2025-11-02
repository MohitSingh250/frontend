import React, { useEffect, useState } from 'react';
import api from '../api';
import ProblemCard from '../components/ProblemCard';
import ProblemFilters from '../components/ProblemFilters';
import Pagination from '../components/Pagination';
import Calendar from '../components/calendar.jsx';
import Sidebar from '../components/Sidebar.jsx';

export default function Home() {
  const [problems, setProblems] = useState([]);
  const [filters, setFilters] = useState({ q: '', topic: '', difficulty: '', tags: '' });
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const fetchProblems = async () => {
    const params = { ...filters, page };
    const res = await api.get('/problems', { params });
    setProblems(res.data || []);
    setHasMore(res.data && res.data.length >= 20);
  };

  useEffect(() => {
    fetchProblems();
  }, [filters, page]);

  return (
    <div className="flex min-h-screen w-full bg-[#0e0e0e] text-gray-200">
      <main className="flex-1 flex flex-col lg:flex-row gap-8 p-8 w-full">
        <section className="flex-1 w-full">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-white tracking-tight">Problems</h1>
          </div>

          <div className="bg-neutral-900 p-5 rounded-2xl shadow-md border border-neutral-800 mb-6">
            <ProblemFilters filters={filters} setFilters={setFilters} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
            {problems.map((p) => (
              <ProblemCard key={p._id} problem={p} />
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Pagination page={page} setPage={setPage} hasMore={hasMore} />
          </div>
        </section>

        {/* ✅ Sticky sidebar */}
        <aside className="hidden xl:block w-[360px] bg-neutral-900 border border-neutral-800 rounded-2xl shadow-md p-5 mt-15 ">
          <h2 className="text-xl font-semibold mb-4 text-white text-center">📅 Daily Progress</h2>
          <Calendar />
        </aside>
      </main>
    </div>
  );
}
