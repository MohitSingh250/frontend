import React, { useEffect, useState } from "react";
import api from "../api/index.js";
import ProblemTable from "../components/ProblemTable";
import ProblemFilters from "../components/ProblemFilters";
import Calendar from "../components/OrbitCalendar";
import FeaturedWidgets from "../components/FeaturedWidgets";
import ImportantChapters from "../components/ImportantChapters";
import ProblemListSidebar from "../components/ProblemList/ProblemListSidebar";
import PromoCards from "../components/ProblemList/PromoCards";
import MobileFloatingMenu from "../components/MobileFloatingMenu";
import { Loader2 } from "lucide-react";

export default function ProblemList() {
  const [filters, setFilters] = useState({
    q: "",
    subject: "",
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

  const [userStats, setUserStats] = useState({ totalSolved: 0, totalProblems: 0 });

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

  // Fetch User Stats for Filter Header
  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const res = await api.get("/users/me/dashboard");
        setUserStats({
          totalSolved: res.data.totalSolved,
          totalProblems: res.data.totalEasy + res.data.totalMedium + res.data.totalHard
        });
      } catch (err) {
        console.error("Error fetching user stats:", err);
      }
    };
    fetchUserStats();
  }, []);

  const fetchProblems = async (reset = false) => {
    try {
      setLoading(true);

      const params = { ...filters, page: reset ? 1 : page, limit: pageSize };
      const res = await api.get("/problems", { params });
      
      let data = [];
      let total = 0;

      // Handle both old (array) and new (object) response formats
      if (Array.isArray(res.data)) {
        data = res.data;
      } else if (res.data && Array.isArray(res.data.problems)) {
        data = res.data.problems;
        total = res.data.total;
      }

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
    <div className="min-h-screen w-full bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans selection:bg-[var(--brand-orange)]/30 pb-20 transition-colors duration-300">
      
      <div className="max-w-full mx-auto">
        
        <div className="flex gap-6">
          
          {/* 1. LEFT SIDEBAR (Navigation) */}
          <ProblemListSidebar />

          {/* 2. MAIN CONTENT (Promo + List) */}
          <div className="flex-1 min-w-0 pt-8 pr-6">
            
            {/* Promo Cards */}
            <PromoCards />
            
            {/* Filters & Table */}
            <ProblemFilters filters={filters} setFilters={setFilters} userStats={userStats} />

            <ProblemTable 
              problems={loadedData} 
              loading={loading && page === 1} 
              searchQuery={filters.q}
            />

            {!loading && loadedData.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-[var(--border-primary)] rounded-xl bg-[var(--bg-secondary)] mt-4">
                <div className="w-12 h-12 bg-[var(--bg-tertiary)] rounded-full flex items-center justify-center mb-3 text-2xl">
                  🔍
                </div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">No problems found</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Try adjusting your filters.
                </p>
              </div>
            )}

            <div className="mt-8 flex justify-center">
              {loading && page > 1 && (
                 <div className="flex items-center gap-2 text-[var(--brand-orange)]">
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

          {/* 3. RIGHT SIDEBAR (Widgets) */}
          <aside className="hidden xl:block w-[260px] shrink-0 space-y-4 pt-8 pr-6">
             <Calendar />
             <ImportantChapters />
             
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
