import React, { useEffect, useState } from "react";
import { Check, CalendarDays } from "lucide-react";
import api from "../api";

const Calendar = () => {
  const [today] = useState(new Date());
  const [dailyProblem, setDailyProblem] = useState(null);
  const [solvedDays, setSolvedDays] = useState(new Set());
  const [streak, setStreak] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const getDateKey = (date) => date.toLocaleDateString("en-CA");
  console.log("hlo")
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resProblem = await api.get("/problems/daily-problem");
        setDailyProblem(resProblem.data);

        const streakData = await api.get("/users/me/streak");
        setStreak(streakData.data);

        const resDashboard = await api.get("/users/me/dashboard");
        const solvedDates = resDashboard.data.solvedProblems.map(
          (p) => getDateKey(new Date(p.solvedAt))
        );
        setSolvedDays(new Set(solvedDates));
      } catch (err) {
        console.error("Error fetching calendar data:", err);
      }
    };
    fetchData();
  }, []);

  const handleDayClick = (day) => {
    const clickedDate = new Date(today.getFullYear(), today.getMonth(), day);
    const clickedKey = getDateKey(clickedDate);
    const todayKey = getDateKey(today);
    if (clickedKey === todayKey && dailyProblem) {
      window.location.href = `/problems/${dailyProblem._id}`;
    }
  };

  const isFuture = (date) => date > today;
  const isPast = (date) => date < today;
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

  // 📱 Floating Icon on Mobile
  if (isMobile && !expanded) {
    return (
      <div
        onClick={() => setExpanded(true)}
        className="
          fixed bottom-6 right-6 z-50 flex flex-col items-center justify-center 
          bg-[var(--dark-slate-gray)]/90 border border-[var(--dark-pastel-green)]/30
          rounded-full w-16 h-16 shadow-lg backdrop-blur-md 
          hover:scale-105 transition-all cursor-pointer
        "
      >
        <CalendarDays
          className="text-[var(--dark-pastel-green)] w-8 h-8 animate-pulse"
          strokeWidth={1.5}
        />
        {streak && (
          <span className="absolute -top-2 -right-2 bg-[var(--orange-peel)] text-[var(--white)] text-xs font-bold px-2 py-0.5 rounded-full shadow">
            {streak.currentStreak}
          </span>
        )}
      </div>
    );
  }

  // 🗓️ Full Calendar (Desktop or Expanded Mobile Modal)
  return (
    <>
      {/* Overlay for mobile modal */}
      {isMobile && expanded && (
        <div
          onClick={() => setExpanded(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-40"
        />
      )}

      {/* Bottom Sheet Modal for Mobile */}
      {isMobile ? (
        <div
          className={`
            fixed bottom-0 left-0 w-full z-50 bg-[var(--dark-slate-gray)]/95
            text-[var(--white)] rounded-t-3xl border-t border-[var(--dark-pastel-green)]/30
            shadow-xl transition-transform duration-300 ease-out
            ${expanded ? "translate-y-0" : "translate-y-full"}
          `}
          style={{ maxHeight: "90vh" }}
        >
          <div className="relative p-5 overflow-y-auto">
            <button
              onClick={() => setExpanded(false)}
              className="absolute top-2 right-4 text-[var(--white)]/50 hover:text-[var(--aqua)] text-lg"
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold mb-4 text-center">
              {today.toLocaleString("default", { month: "long" })} {today.getFullYear()}
            </h2>

            {/* Weekdays */}
            <div className="grid grid-cols-7 gap-2 text-center text-sm text-[var(--white)]/50 mb-2">
              {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
                <div key={d}>{d}</div>
              ))}
            </div>

            {/* Days */}
            <div className="grid grid-cols-7 gap-2 text-center">
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                const date = new Date(today.getFullYear(), today.getMonth(), day);
                const dateKey = getDateKey(date);
                const isToday = dateKey === getDateKey(today);
                const isSolved = solvedDays.has(dateKey);
                const future = isFuture(date);
                const past = isPast(date);

                let styles = "";
                if (future) styles = "bg-[var(--raisin-black)]/60 text-[var(--white)]/20";
                else if (isToday)
                  styles =
                    "border-2 border-[var(--orange-peel)] text-[var(--orange-peel)] font-semibold";
                else if (isSolved)
                  styles =
                    "bg-[var(--dark-pastel-green)]/20 text-[var(--dark-pastel-green)] border border-[var(--dark-pastel-green)]/30";
                else if (past)
                  styles = "bg-[var(--dark-slate-gray)]/60 text-[var(--white)]/40";

                return (
                  <div
                    key={day}
                    onClick={() => !future && handleDayClick(day)}
                    className={`relative h-10 w-10 flex items-center justify-center rounded-xl select-none ${styles}`}
                  >
                    {day}
                    {isSolved && (
                      <Check
                        className="absolute bottom-1 right-1 text-[var(--dark-pastel-green)]"
                        size={14}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {streak && (
              <div className="mt-4 text-sm text-center">
                <span className="text-[var(--white)]/60">Streak: </span>
                <span className="text-[var(--dark-pastel-green)] font-semibold">
                  {streak.currentStreak} days
                </span>
              </div>
            )}
          </div>
        </div>
      ) : (
        // 💻 Desktop View
        <div
          className="
            bg-[var(--dark-slate-gray)]/80 text-[var(--white)] 
            rounded-2xl p-5 w-full max-w-md mx-auto 
            border border-[var(--dark-pastel-green)]/15 shadow-md backdrop-blur-md
          "
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">
              {today.toLocaleString("default", { month: "long" })} {today.getFullYear()}
            </h2>
            <span className="text-sm text-[var(--dark-pastel-green)] bg-[var(--raisin-black)]/50 px-3 py-1 rounded-full border border-[var(--dark-pastel-green)]/30">
              Daily Problem
            </span>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-sm text-[var(--white)]/50 mb-2">
            {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2 text-center">
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
              const date = new Date(today.getFullYear(), today.getMonth(), day);
              const dateKey = getDateKey(date);
              const isToday = dateKey === getDateKey(today);
              const isSolved = solvedDays.has(dateKey);
              const future = isFuture(date);
              const past = isPast(date);

              let styles = "";
              if (future)
                styles =
                  "bg-[var(--raisin-black)]/60 text-[var(--white)]/20 cursor-not-allowed";
              else if (isToday)
                styles =
                  "border-2 border-[var(--orange-peel)] text-[var(--orange-peel)] font-semibold";
              else if (isSolved)
                styles =
                  "bg-[var(--dark-pastel-green)]/20 text-[var(--dark-pastel-green)] border border-[var(--dark-pastel-green)]/30";
              else if (past)
                styles =
                  "bg-[var(--dark-slate-gray)]/60 text-[var(--white)]/40 cursor-default";

              return (
                <div
                  key={day}
                  onClick={() => !future && handleDayClick(day)}
                  className={`relative h-10 w-10 flex items-center justify-center rounded-xl select-none ${styles}`}
                >
                  {day}
                  {isSolved && (
                    <Check
                      className="absolute bottom-1 right-1 text-[var(--dark-pastel-green)]"
                      size={14}
                    />
                  )}
                </div>
                
              );
              
            })}
            
          </div>
          
        </div>
        
      )}
       {streak && (
              <div className="mt-4 text-sm text-center">
                <span className="text-[var(--white)]/60">Streak: </span>
                <span className="text-[var(--dark-pastel-green)] font-semibold">
                  {streak.currentStreak} days
                </span>
              </div>
            )}
    </>
  );
};

export default Calendar;
