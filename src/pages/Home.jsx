import React, { useEffect, useState } from 'react';
import api from '../api';
import ProblemCard from '../components/ProblemCard';
import ProblemFilters from '../components/ProblemFilters';
import Calendar from '../components/calendar.jsx';
import Sidebar from '../components/Sidebar.jsx';

export default function Home() {
  const [filters, setFilters] = useState({ q: '', topic: '', difficulty: '', tags: '' });
  const [loadedData, setLoadedData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [moreData, setMoreData] = useState(true);
  const pageSize = 20; 

  const fetchProblems = async () => {
    try {
      setLoading(true);
      const params = { ...filters, page, limit: pageSize };
      const res = await api.get('/problems', { params });
      const data = res.data || [];

      if (Array.isArray(data) && data.length > 0) {
        setLoadedData(prev => (page === 1 ? data : [...prev, ...data]));
        if (data.length < pageSize) setMoreData(false);
      } else {
        setMoreData(false);
      }
    } catch (err) {
      console.error('Error fetching problems:', err);
      setMoreData(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, [page]);

  useEffect(() => {
    setLoadedData([]);
    setPage(1);
    setMoreData(true);
  }, [filters]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.offsetHeight
    ) {
      if (!loading && moreData) {
        setPage(prevPage => prevPage + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, moreData]);

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
            {loadedData.map((p) => (
              <ProblemCard key={p._id} problem={p} />
            ))}
          </div>
          <div className="mt-8 flex justify-center text-gray-400">
            {loading && <div>Loading more problems...</div>}
            {!loading && !moreData && <div>No more problems 🎉</div>}
          </div>
        </section>
        <aside className="hidden xl:block w-[360px] bg-neutral-900 border border-neutral-800 rounded-2xl shadow-md p-5 mt-15">
          <Calendar />
        </aside>
      </main>
    </div>
  );
}
