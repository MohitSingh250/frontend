import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, X, Calendar as CalendarIcon, Zap } from "lucide-react";
import api from "../api";
import { AuthContext } from "../context/AuthContext";

export default function OrbitCalendar({ isMobile = false, onClose }) {
  const { user } = useContext(AuthContext);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [streak, setStreak] = useState(null);
  const [activeDay, setActiveDay] = useState(new Date().getDate());

  // Mock streak data if API fails or for visual demo
  useEffect(() => {
    if (user) {
      api.get(`/users/${user._id}/streak`)
        .then((res) => setStreak(res.data))
        .catch(() => {
           setStreak({ currentStreak: 0, maxStreak: 0, history: [] });
        });
    } else {
       setStreak({ currentStreak: 0, maxStreak: 0, history: [] });
    }
  }, [user]);

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const renderDays = () => {
    const days = [];
    const today = new Date();
    const isCurrentMonth =
      today.getMonth() === currentDate.getMonth() &&
      today.getFullYear() === currentDate.getFullYear();

    // Empty slots for previous month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 w-8" />);
    }

    // Days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday = isCurrentMonth && i === today.getDate();
      const isActive = i === activeDay;
      
      // Construct date string YYYY-MM-DD for this day (Local Time)
      const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      const offset = dayDate.getTimezoneOffset();
      const localDate = new Date(dayDate.getTime() - (offset*60*1000));
      const dateString = localDate.toISOString().split('T')[0];

      // Check if any history timestamp falls on this local date
      const isSolved = streak?.history?.some(timestamp => {
        const d = new Date(timestamp);
        // Convert history timestamp to local YYYY-MM-DD
        const localD = new Date(d.getTime() - (d.getTimezoneOffset() * 60000));
        return localD.toISOString().split('T')[0] === dateString;
      });

      days.push(
        <div
          key={i}
          onClick={() => setActiveDay(i)}
          className={`
            h-8 w-8 flex items-center justify-center rounded-full text-xs font-medium cursor-pointer transition-all relative
            ${isActive ? "bg-[var(--white)] text-black" : "text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]"}
            ${isToday && !isActive && !isSolved ? "text-[var(--text-primary)] font-bold" : ""}
            ${isSolved && !isActive ? "text-[var(--color-success)] font-bold" : ""}
          `}
        >
          {i}
          
          {/* Today Indicator (Orange Dot) - Only if NOT solved */}
          {isToday && !isActive && !isSolved && (
             <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-[var(--brand-orange)]" />
          )}

          {/* Solved Indicator (Green Checkmark) */}
          {isSolved && !isActive && (
             <div className="absolute -bottom-1.5 flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-success)]">
                   <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
             </div>
          )}
          
          {/* Solved + Active Indicator (Black Checkmark) */}
          {isSolved && isActive && (
             <div className="absolute -bottom-1.5 flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                   <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
             </div>
          )}
        </div>
      );
    }
    return days;
  };

  const content = (
    <>
      {/* Header with Month/Year and Streak Badge */}
      <div className="p-4 flex items-center justify-between border-b border-[var(--border-secondary)] bg-[var(--bg-tertiary)]/30">
        <div className="flex items-center gap-2">
           <span className="text-[var(--text-primary)] font-bold text-sm">
             {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
           </span>
           <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-[var(--brand-orange)]/10 border border-[var(--brand-orange)]/20">
              <Zap size={10} className="text-[var(--brand-orange)] fill-[var(--brand-orange)]" />
              <span className="text-[10px] font-bold text-[var(--brand-orange)]">{streak?.currentStreak || 0}</span>
           </div>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
            className="p-1 rounded hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)] transition-colors"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
            className="p-1 rounded hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)] transition-colors"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-4">
        {/* Day Labels */}
        <div className="grid grid-cols-7 mb-2">
          {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
            <div key={i} className="h-8 w-8 flex items-center justify-center text-[10px] font-bold text-[var(--text-tertiary)]">
              {d}
            </div>
          ))}
        </div>
        
        {/* Days */}
        <div className="grid grid-cols-7 gap-y-1">
          {renderDays()}
        </div>
      </div>

      {/* Footer: Check-in Button */}
      <div className="p-4 border-t border-[var(--border-secondary)] bg-[var(--bg-tertiary)]/10">
         <Link to="/daily" className="w-full py-2 rounded-lg bg-[var(--brand-orange)] hover:bg-[var(--brand-orange)]/90 text-white text-xs font-bold shadow-lg shadow-[var(--brand-orange)]/20 transition-all flex items-center justify-center gap-2">
            <CalendarIcon size={14} />
            {streak?.history?.some(ts => {
               const d = new Date(ts);
               const localD = new Date(d.getTime() - (d.getTimezoneOffset() * 60000));
               const today = new Date();
               const localToday = new Date(today.getTime() - (today.getTimezoneOffset() * 60000));
               return localD.toISOString().split('T')[0] === localToday.toISOString().split('T')[0];
            }) ? "Solved Today" : "Daily Challenge"}
         </Link>
      </div>
    </>
  );

  if (isMobile) {
    return (
      <>
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={onClose} />
        <div
          className="
            fixed bottom-0 left-0 w-full z-50 bg-[var(--bg-secondary)]
            text-[var(--text-primary)] rounded-t-3xl border-t border-[var(--border-primary)]
            shadow-2xl animate-slide-up
          "
        >
          <div className="p-4 border-b border-[var(--border-primary)] flex justify-between items-center">
             <h2 className="text-lg font-bold">Daily Streak</h2>
             <button onClick={onClose} className="p-2 rounded-full bg-[var(--bg-tertiary)] text-[var(--text-secondary)]">
                <X size={20} />
             </button>
          </div>
          <div className="bg-[var(--bg-secondary)]">
             {content}
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="bg-[var(--bg-secondary)] rounded-xl overflow-hidden border border-[var(--border-primary)] shadow-sm">
      {content}
    </div>
  );
}
