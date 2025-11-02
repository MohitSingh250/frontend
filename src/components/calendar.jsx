import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import api from "../api";

const Calendar = () => {
  const [today] = useState(new Date());
  const [dailyProblem, setDailyProblem] = useState(null);
  const [solvedDays, setSolvedDays] = useState(new Set());
  const [streak,setStreak] = useState(null)

  const getDateKey = (date) => date.toLocaleDateString("en-CA"); 
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resProblem = await api.get("/problems/daily-problem");
        setDailyProblem(resProblem.data);
        
        const streakdata = await api.get("/users/me/streak")
          setStreak(streakdata.data);

        const resDashboard = await api.get("/users/me/dashboard");
        const solvedDates = resDashboard.data.solvedProblems.map(
          (p) => getDateKey(new Date(p.solvedAt))
        );
        setSolvedDays(new Set(solvedDates));
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };
    fetchData();
  }, []);
  console.log(streak)
  console.log(solvedDays?.data)

  // 🔹 Handle clicking on a day
  const handleDayClick = (day) => {
    const clickedDate = new Date(today.getFullYear(), today.getMonth(), day);
    const clickedKey = getDateKey(clickedDate);
    const todayKey = getDateKey(today);

    // ✅ Only allow clicking on today's date
    if (clickedKey === todayKey && dailyProblem) {
      window.location.href = `/problems/${dailyProblem._id}`;
    }
  };

  // 🔹 Helper to compare dates
  const isFuture = (date) => date > today;
  const isPast = (date) => date < today;

  const daysInMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0
  ).getDate();

  return (
    <div className="bg-[#1a1a1a] text-gray-200 rounded-2xl p-5 w-full max-w-md mx-auto shadow-[0_4px_20px_rgba(0,0,0,0.6)] border border-neutral-800 sticky top-15">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 ">
        <h2 className="text-lg font-semibold text-white">
          {today.toLocaleString("default", { month: "long" })} {today.getFullYear()}
        </h2>
        <span className="text-sm text-gray-400 bg-neutral-800 px-3 py-1 rounded-full">
          Daily Problem
        </span>
      </div>

      {/* Weekday labels */}
      <div className="grid grid-cols-7 gap-2 text-center text-sm text-gray-500 mb-2">
        {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-2 text-center">
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
          const date = new Date(today.getFullYear(), today.getMonth(), day);
          const dateKey = getDateKey(date);
          const isToday = dateKey === getDateKey(today);
          const isSolved = solvedDays.has(dateKey);
          const future = isFuture(date);
          const past = isPast(date);

          // 🔹 Compute CSS based on state
          let styles = "";
          if (future) {
            styles =
              "bg-neutral-900 text-gray-600 cursor-not-allowed opacity-50";
          } else if (isToday) {
            styles =
              "border-2 border-blue-500 text-blue-400 font-semibold shadow-[0_0_10px_rgba(59,130,246,0.4)] hover:scale-105 transition";
          } else if (isSolved) {
            styles =
              "bg-blue-500/30 text-blue-300 hover:bg-blue-500/40 cursor-default";
          } else if (past) {
            styles =
              "bg-neutral-800 text-gray-500 cursor-default hover:bg-neutral-800";
          }

          return (
            <div
              key={day}
              onClick={() => !future && handleDayClick(day)} // Disable future clicks
              className={`relative h-10 w-10 flex items-center justify-center rounded-xl select-none ${styles}`}
            >
              {day}
              {isSolved && (
                <Check
                  className="absolute bottom-1 right-1 text-blue-400"
                  size={14}
                />
              )}
            </div>
          );
        })}
      </div>

    {streak ? (
    <div className="mt-4 text-sm text-gray-400 text-center">
      Streak: <span className="text-blue-400 font-semibold">{streak.currentStreak} days</span>
    </div>
    ) : (
      <div className="mt-4 text-sm text-gray-500 text-center">Loading streak...</div>
    )}
    </div>
  );
};

export default Calendar;
