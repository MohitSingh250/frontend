import React, { useMemo } from 'react';

export default function ActivityHeatmap({ submissions }) {
  console.log(submissions)
  const heatmapData = useMemo(() => {
    const dateMap = {};
    submissions.forEach(sub => {
      if (sub.solvedAt) {
        const date = new Date(sub.solvedAt).toDateString();
        dateMap[date] = (dateMap[date] || 0) + 1;
      }
    });

    const today = new Date();
    const oneYearAgo = new Date(today);
    oneYearAgo.setFullYear(today.getFullYear() - 1);

    const days = [];
    let activeDays = 0;
    let totalSubmissions = 0;
    let currentStreak = 0;
    let maxStreak = 0;
    let tempStreak = 0;

    for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
      const dateStr = new Date(d).toDateString();
      const count = dateMap[dateStr] || 0;

      if (count > 0) {
        activeDays++;
        totalSubmissions += count;
        tempStreak++;
        maxStreak = Math.max(maxStreak, tempStreak);
      } else {
        tempStreak = 0;
      }

      days.push({
        date: new Date(d),
        count,
        dateStr
      });
    }

    // current streak
    for (let i = days.length - 1; i >= 0; i--) {
      if (days[i].count > 0) currentStreak++;
      else break;
    }

    return { days, activeDays, maxStreak, currentStreak, totalSubmissions };
  }, [submissions]);

  const getColorClass = (count) => {
    if (count === 0) return 'bg-[#2f2f2f]';
    if (count === 1) return 'bg-[#016620]';
    if (count === 2) return 'bg-[#29C244]';
    if (count <= 4) return 'bg-[#7FE18C]';
    return 'bg-[#99f7a5]';
  };

  // Group days into weeks
  const weeks = useMemo(() => {
    const weekArray = [];
    let currentWeek = [];

    heatmapData.days.forEach((day, index) => {
      const dayOfWeek = day.date.getDay();

      if (dayOfWeek === 0 && currentWeek.length > 0) {
        weekArray.push(currentWeek);
        currentWeek = [];
      }

      if (index === 0 && dayOfWeek !== 0) {
        for (let i = 0; i < dayOfWeek; i++) currentWeek.push(null);
      }

      currentWeek.push(day);

      if (index === heatmapData.days.length - 1) {
        weekArray.push(currentWeek);
      }
    });

    return weekArray;
  }, [heatmapData.days]);

  // Month labels
  const monthLabels = useMemo(() => {
    const labels = [];
    let lastMonth = -1;

    weeks.forEach((week, weekIndex) => {
      const firstDay = week.find(d => d !== null);
      if (firstDay) {
        const month = firstDay.date.getMonth();
        if (month !== lastMonth) {
          labels.push({
            month: firstDay.date.toLocaleDateString('en-US', { month: 'short' }),
            weekIndex
          });
          lastMonth = month;
        }
      }
    });
    return labels;
  }, [weeks]);

  return (
    <div className="w-full">
      {/* Stats Header */}
      <div className="flex items-center justify-between mb-3 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-gray-300">
            <span className="font-semibold text-white">{heatmapData.totalSubmissions}</span> submissions in the past one year
          </span>
        </div>
        <div className="flex items-center gap-5 text-gray-400">
          <span>Total active days: <span className="font-semibold text-white">{heatmapData.activeDays}</span></span>
          <span>Max streak: <span className="font-semibold text-white">{heatmapData.maxStreak}</span></span>
        </div>
      </div>

      {/* Heatmap */}
      <div className="relative bg-[#1c1c1c] p-3 rounded-xl border border-[#2a2a2a]">
        {/* Month labels */}
        <div className="flex mb-1 ml-8">
          {monthLabels.map((label, i) => (
            <div
              key={i}
              className="text-xs text-gray-500 font-medium"
              style={{
                marginLeft:
                  i === 0
                    ? 0
                    : `${(label.weekIndex - (monthLabels[i - 1]?.weekIndex || 0)) * 13 + 10}px`, 
              }}
            >
              {label.month}
            </div>
          ))}
        </div>

          {/* Grid Weeks */}
          <div className="flex gap-[2px] overflow-x-auto pb-2">
            {weeks.map((week, weekIndex) => {
              const firstDay = week.find(d => d !== null);
              const prevWeek = weeks[weekIndex - 1];
              const prevMonth =
                prevWeek?.find(d => d !== null)?.date.getMonth() ?? null;
              const isNewMonth =
                firstDay && firstDay.date.getMonth() !== prevMonth;

              return (
                <div
                  key={weekIndex}
                  className="flex flex-col gap-[2px]"
                  style={{ marginLeft: isNewMonth ? '10px' : '0' }}
                >
                  {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => {
                    const day = week[dayIndex];
                    if (!day)
                      return <div key={dayIndex} className="w-[11px] h-[11px]" />;
                    return (
                      <div
                        key={dayIndex}
                        className={`w-[10px] h-[10px] rounded-[2.5px] ${getColorClass(
                          day.count
                        )} transition-all hover:ring-1 hover:ring-gray-400 cursor-pointer`}
                        title={`${day.count} submission${
                          day.count !== 1 ? 's' : ''
                        } on ${day.date.toLocaleDateString()}`}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-2 mt-3 text-xs text-gray-500">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-[11px] h-[11px] rounded-sm bg-[#2f2f2f]" />
            <div className="w-[11px] h-[11px] rounded-sm bg-[#016620]" />
            <div className="w-[11px] h-[11px] rounded-sm bg-[#29C244]" />
            <div className="w-[11px] h-[11px] rounded-sm bg-[#7FE18C]" />
            <div className="w-[11px] h-[11px] rounded-sm bg-[#99f7a5]" />
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
