import React, { useEffect, useState } from "react";
import api from "../api/index.js";
import ProblemTable from "../components/ProblemTable";
import ProblemFilters from "../components/ProblemFilters";
import Calendar from "../components/OrbitCalendar";
import FeaturedWidgets from "../components/FeaturedWidgets";
import ImportantChapters from "../components/ImportantChapters";
import MobileFloatingMenu from "../components/MobileFloatingMenu";
import { Loader2 } from "lucide-react";

export default function Home() {
  const [filters, setFilters] = useState({
    q: "",
    topic: "",
    difficulty: "",
  });

  const [loadedData, setLoadedData] = useState([]);
  const [dailyProblem, setDailyProblem] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [moreData, setMoreData] = useState(true);
  const [activeMobileWidget, setActiveMobileWidget] = useState(null); // 'calendar' | 'chapters' | null
  const pageSize = 20;

  // Fetch Daily Problem for Widgets
  useEffect(() => {
    const fetchDaily = async () => {
      try {
        const res = await api.get("/problems/daily-problem");
        setDailyProblem(res.data);
      } catch (err) {
        console.error("Error fetching daily problem:", err);
      }
    };
    fetchDaily();
  }, []);

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
    <div className="min-h-screen w-full bg-[var(--raisin-black)] text-[var(--white)] font-sans selection:bg-[var(--dark-pastel-green)]/30 pb-20 transition-colors duration-300">
      
      <div className="max-w-[1400px] mx-auto p-4 md:p-6">
        
        {/* 1. TOP WIDGETS */}
        <FeaturedWidgets dailyProblem={dailyProblem} />

        <div className="flex flex-col xl:flex-row gap-6">
          
          {/* 2. LEFT COLUMN (PROBLEM LIST) */}
          <div className="flex-1 min-w-0">
            
            <ProblemFilters filters={filters} setFilters={setFilters} />

            <ProblemTable problems={loadedData} loading={loading && page === 1} />

            {!loading && loadedData.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-[var(--card-border)] rounded-xl bg-[var(--card-bg)] mt-4">
                <div className="w-12 h-12 bg-[var(--raisin-black)] rounded-full flex items-center justify-center mb-3 text-2xl">
                  🔍
                </div>
                <h3 className="text-lg font-bold text-[var(--white)] mb-1">No problems found</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Try adjusting your filters.
                </p>
              </div>
            )}

            <div className="mt-8 flex justify-center">
              {loading && page > 1 && (
                 <div className="flex items-center gap-2 text-[var(--dark-pastel-green)]">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-xs font-bold uppercase tracking-wider">Loading more...</span>
                 </div>
              )}
              {!loading && !moreData && loadedData.length > 0 && (
                <div className="text-xs text-[var(--text-secondary)]">
                  You've reached the end
                </div>
              )}
            </div>
          </div>

          {/* 3. RIGHT COLUMN (SIDEBAR) */}
          <aside className="hidden xl:block w-[320px] shrink-0 space-y-4">
            <div className="sticky top-6">
               <Calendar />
               <ImportantChapters />
               
               {/* Footer Links */}
               <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-xs text-[var(--text-secondary)] px-2">
                  <a href="#" className="hover:text-[var(--white)]">Copyright © 2025 Orbit</a>
                  <a href="#" className="hover:text-[var(--white)]">Help Center</a>
                  <a href="#" className="hover:text-[var(--white)]">Jobs</a>
                  <a href="#" className="hover:text-[var(--white)]">Bug Bounty</a>
                  <a href="#" className="hover:text-[var(--white)]">Students</a>
                  <a href="#" className="hover:text-[var(--white)]">Terms</a>
                  <a href="#" className="hover:text-[var(--white)]">Privacy Policy</a>
               </div>
            </div>
          </aside>

        </div>
      </div>

      {/* 📱 Mobile Floating Menu */}
      <MobileFloatingMenu setActiveMobileWidget={setActiveMobileWidget} />

      {/* 📱 Mobile Modals */}
      {activeMobileWidget === 'calendar' && (
        <Calendar isMobileModal={true} onClose={() => setActiveMobileWidget(null)} />
      )}
      {activeMobileWidget === 'chapters' && (
        <ImportantChapters isMobileModal={true} onClose={() => setActiveMobileWidget(null)} />
      )}

    </div>
  );
}
