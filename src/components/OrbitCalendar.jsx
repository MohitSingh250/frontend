import React, { useEffect, useState } from "react";
import { Check, CalendarDays, X } from "lucide-react";
import api from "../api";

const Calendar = ({ isMobileModal = false, onClose }) => {
  const [today] = useState(new Date());
  const [dailyProblem, setDailyProblem] = useState(null);
  const [solvedDays, setSolvedDays] = useState(new Set());
  const [streak, setStreak] = useState(null);

  const getDateKey = (date) => date.toLocaleDateString("en-CA");



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
  const firstDayOfWeek = new Date(today.getFullYear(), today.getMonth(), 1).getDay(); // 0 = Sun, 1 = Mon, etc.

  // Generate an array of days with correct spacing
  const daysArray = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    daysArray.push(null); // empty placeholders before day 1
  }
  for (let d = 1; d <= daysInMonth; d++) {
    daysArray.push(d);
  }



  // 🗓️ Calendar Grid Renderer
  const renderDays = () => (
    <div className="grid grid-cols-7 gap-2 text-center">
      {daysArray.map((day, index) => {
        if (!day)
          return (
            <div key={`empty-${index}`} className="h-10 w-10"></div> // empty cell
          );

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
  );

  // 📱 Mobile Modal View
  if (isMobileModal) {
    return (
      <>
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        />
        <div
          className="
            fixed bottom-0 left-0 w-full z-50 bg-[var(--dark-slate-gray)]
            text-[var(--white)] rounded-t-3xl border-t border-[var(--card-border)]
            shadow-2xl animate-slide-up
          "
          style={{ maxHeight: "85vh" }}
        >
          <div className="relative p-6 overflow-y-auto">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-[var(--raisin-black)] rounded-full text-[var(--text-secondary)] hover:text-[var(--white)]"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold mb-6 text-center flex items-center justify-center gap-2">
              <CalendarDays className="text-[var(--orange-peel)]" />
              {today.toLocaleString("default", { month: "long" })} {today.getFullYear()}
            </h2>

            {/* Weekdays */}
            <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-[var(--text-secondary)] mb-3">
              {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
                <div key={d}>{d}</div>
              ))}
            </div>

            {renderDays()}

            {streak && (
              <div className="mt-6 flex items-center justify-center gap-3 bg-[var(--raisin-black)] p-3 rounded-xl border border-[var(--card-border)]">
                <span className="text-[var(--text-secondary)] text-sm">Current Streak:</span>
                <span className="text-[var(--dark-pastel-green)] font-bold text-lg">
                  {streak.currentStreak} days 🔥
                </span>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  // 🖥 Desktop Widget View
  return (
    <>
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

          {renderDays()}
        </div>
        
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
