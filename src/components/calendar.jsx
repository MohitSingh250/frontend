import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import api from '../api';

const Calendar = () => {
  const [today] = useState(new Date());
  const [dailyProblem, setDailyProblem] = useState(null);
  const [solvedDays, setSolvedDays] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resProblem = await api.get("/problems/daily-problem");
        setDailyProblem(resProblem.data);

        const resDashboard = await api.get("/users/me/dashboard");

        const solvedDates = resDashboard.data.solvedProblems.map(
          (p) => new Date(p.createdAt).getDate()
        );
        setSolvedDays(solvedDates);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };
    fetchData();
  }, []);
  console.log(Number(solvedDays))
  const handleDayClick = (day) => {
    if (day === today.getDate() && dailyProblem) {
      window.location.href = `/problems/${dailyProblem._id}`;
    }
  };

  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

  return (
    <div className="bg-neutral-900 text-white rounded-xl p-4 w-[360px] mx-auto shadow-lg">
      <div className="grid grid-cols-7 gap-2 text-center text-gray-400 mb-4">
        {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
          <div key={d}>{d}</div>
        ))}

        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
          <div
            key={day}
            onClick={() => handleDayClick(day)}
            className={`h-10 w-10 flex items-center justify-center rounded-full cursor-pointer relative 
              ${day === today.getDate() ? "border border-red-500" : ""}
              ${solvedDays.includes(day) ? "text-blue-400" : "text-gray-500"}`}
          >
            {day}
            {solvedDays.includes(day) && (
              <Check className="absolute text-blue-400" size={18} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
