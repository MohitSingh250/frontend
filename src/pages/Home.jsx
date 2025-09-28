import React, { useEffect, useState } from 'react';
import api from '../api';
import ProblemCard from '../components/ProblemCard';
import ProblemFilters from '../components/ProblemFilters';
import Pagination from '../components/Pagination';
import  Calendar  from '../components/calendar.jsx';

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

  useEffect(() => { fetchProblems(); }, [filters, page]);

  return (
    <div>
    <Calendar/>
      <h1 className="text-2xl font-bold mb-4">Problems</h1>
      <ProblemFilters filters={filters} setFilters={setFilters} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {problems.map(p => <ProblemCard key={p._id} problem={p} />)}
      </div>
    <Pagination page={page} setPage={setPage} hasMore={hasMore} />
    </div>
  );
}
