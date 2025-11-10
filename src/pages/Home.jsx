import React, { useEffect, useState } from "react";
import api from "../api";
import ProblemCard from "../components/ProblemCard";
import ProblemFilters from "../components/ProblemFilters";
import Calendar from "../components/Calendar.jsx";

export default function Home() {
  const [filters, setFilters] = useState({
    q: "",
    topic: "",
    difficulty: "",
  });

  const [loadedData, setLoadedData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [moreData, setMoreData] = useState(true);
  const pageSize = 20;

  // ✅ Main data fetcher
  const fetchProblems = async (reset = false) => {
    try {
      setLoading(true);

      const params = { ...filters, page, limit: pageSize };
      const res = await api.get("/problems", { params });
      const data = res.data || [];

      if (Array.isArray(data)) {
        setLoadedData((prev) =>
          reset ? data : [...prev, ...data]
        );

        if (data.length < pageSize) {
          setMoreData(false);
        } else {
          setMoreData(true);
        }
      }
    } catch (err) {
      console.error("Error fetching problems:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🧩 Run when filters change → reset + refetch
  useEffect(() => {
    setPage(1);
    fetchProblems(true); // ✅ immediate fetch on filter change
  }, [filters]);

  // 🧩 Run when page changes → fetch more
  useEffect(() => {
    if (page > 1) {
      fetchProblems(false);
    }
  }, [page]);

  // 🧭 Infinite scroll logic
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.offsetHeight
    ) {
      if (!loading && moreData) {
        setPage((prev) => prev + 1);
      }
    }
  };

  // ♻️ Scroll listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, moreData]);

  return (
    <div className="flex min-h-screen w-full bg-[var(--raisin-black)] text-[var(--white)] relative">
      <main className="flex-1 flex flex-col lg:flex-row gap-8 p-8 w-full">
        {/* 🧮 Problems Section */}
        <section className="flex-1 w-full">
          <ProblemFilters filters={filters} setFilters={setFilters} />

          {loading && page === 1 && (
            <div className="text-center mt-8 text-[var(--dark-pastel-green)]/70">
              Loading problems...
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
            {loadedData.map((p) => (
              <ProblemCard key={p._id} problem={p} />
            ))}
          </div>

          {!loading && loadedData.length === 0 && (
            <div className="text-center mt-8 text-gray-400">
              No problems found 😕
            </div>
          )}

          <div className="mt-8 flex justify-center text-[var(--dark-pastel-green)]/70">
            {loading && page > 1 && <div>Loading more problems...</div>}
            {!loading && !moreData && loadedData.length > 0 && (
              <div>No more problems 🎉</div>
            )}
          </div>
        </section>

        {/* 🗓️ Sidebar */}
        <aside className="hidden xl:block w-[360px] rounded-2xl shadow-md p-5">
          <Calendar />
        </aside>
      </main>

      {/* 📱 Mobile Calendar */}
      <div className="block xl:hidden">
        <Calendar />
      </div>
    </div>
  );
}
