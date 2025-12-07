import React, { useMemo } from "react";

export default function ActivityHeatmap({ submissions }) {
  // --- Step 1: Compute heatmap data
  const heatmapData = useMemo(() => {
    const dateMap = {};
    submissions.forEach((sub) => {
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
        dateStr,
      });
    }

    // Calculate current streak
    for (let i = days.length - 1; i >= 0; i--) {
      if (days[i].count > 0) currentStreak++;
      else break;
    }

    return { days, activeDays, maxStreak, currentStreak, totalSubmissions };
  }, [submissions]);

  // --- Step 2: Color scale
  const getColorClass = (count) => {
    if (count === 0) return "bg-[var(--heatmap-level-0)]";
    if (count === 1) return "bg-[var(--heatmap-level-1)]";
    if (count === 2) return "bg-[var(--heatmap-level-2)]";
    if (count <= 4) return "bg-[var(--heatmap-level-3)]";
    return "bg-[var(--heatmap-level-4)]";
  };

  // --- Step 3: Group into weeks for vertical columns
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

  // --- Step 4: Month labels & Gaps
  const { monthLabels, weekMargins } = useMemo(() => {
    const labels = [];
    const margins = []; // Store margin for each week
    let lastMonth = -1;
    let currentOffset = 0;

    weeks.forEach((week, weekIndex) => {
      const firstDay = week.find((d) => d !== null);
      let isNewMonth = false;

      if (firstDay) {
        const month = firstDay.date.getMonth();
        if (month !== lastMonth) {
          isNewMonth = true;
          if (lastMonth !== -1) {
             // Add gap before this week (which starts a new month)
             // Actually, usually gaps are between the last week of prev month and first of new.
             // But here we iterate weeks. Let's add margin to the PREVIOUS week.
             if (weekIndex > 0) margins[weekIndex - 1] = 16; // 16px gap
          }
          
          labels.push({
            month: firstDay.date.toLocaleDateString("en-US", { month: "short" }),
            offset: currentOffset
          });
          lastMonth = month;
        }
      }
      
      // Default gap is 3px. If we added a margin to prev week, we account for it?
      // No, the offset calculation needs to sum up widths.
      // Width of a week is 10px + 3px gap = 13px.
      // If there's an extra margin, we add it.
      
      // Let's simplify: We render weeks with dynamic margins.
      // We calculate label positions based on cumulative width.
      
      const gap = margins[weekIndex - 1] || 2; // Gap AFTER the previous week (default 2px)
      if (weekIndex > 0) currentOffset += (9 + gap); // 9px width + gap
      
      // Initialize margin for current week
      margins[weekIndex] = 2; 
    });

    // Re-calculate margins to add extra space at month boundaries
    // We want a gap *between* months.
    // So if week[i] is in Month A and week[i+1] starts Month B, add margin to week[i].
    
    weeks.forEach((week, i) => {
        if (i < weeks.length - 1) {
            const dayA = week.find(d => d);
            const dayB = weeks[i+1].find(d => d);
            if (dayA && dayB && dayA.date.getMonth() !== dayB.date.getMonth()) {
                margins[i] = 10; // Larger gap at month end (reduced from 12)
            }
        }
    });

    // Recalculate offsets for labels to center them
    let runningOffset = 0;
    const finalLabels = [];
    let currentMonthLabel = null;
    let currentMonthStartOffset = 0;
    let currentMonthWeekCount = 0;
    
    weeks.forEach((week, i) => {
       const day = week.find(d => d);
       if (day) {
           const month = day.date.toLocaleDateString("en-US", { month: "short" });
           
           if (month !== currentMonthLabel) {
               // Push previous month label
               if (currentMonthLabel) {
                   // Calculate center: start + (width / 2)
                   // Width is roughly weekCount * 11 (plus gaps?)
                   // Let's just use the start offset and add half the width
                   const width = currentMonthWeekCount * 11; 
                   finalLabels.push({ month: currentMonthLabel, offset: currentMonthStartOffset + (width / 2) - 10 }); // -10 to center text roughly
               }
               
               currentMonthLabel = month;
               currentMonthStartOffset = runningOffset;
               currentMonthWeekCount = 0;
           }
           currentMonthWeekCount++;
       }
       runningOffset += (9 + (margins[i] || 2));
    });
    
    // Push last month
    if (currentMonthLabel) {
        const width = currentMonthWeekCount * 11;
        finalLabels.push({ month: currentMonthLabel, offset: currentMonthStartOffset + (width / 2) - 10 });
    }

    return { monthLabels: finalLabels, weekMargins: margins };
  }, [weeks]);

  // --- Step 5: Render
  return (
    <div className="w-full">
      {/* Heatmap Container */}
      <div className="w-full">
            {/* Grid Weeks */}
            <div className="flex items-end h-[100px]">
              {weeks.map((week, weekIndex) => (
                <div 
                    key={weekIndex} 
                    className="flex flex-col gap-[2px]"
                    style={{ marginRight: `${weekMargins[weekIndex] || 2}px` }}
                >
                  {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => {
                    const day = week[dayIndex];
                    if (!day)
                      return (
                        <div key={dayIndex} className="w-[9px] h-[9px]" />
                      );

                    return (
                      <div
                        key={dayIndex}
                        className={`w-[9px] h-[9px] rounded-[2px] ${getColorClass(
                          day.count
                        )} transition-all hover:ring-1 hover:ring-[var(--text-secondary)] cursor-pointer`}
                        title={`${day.count} submission${
                          day.count !== 1 ? "s" : ""
                        } on ${day.date.toLocaleDateString()}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Month labels (Bottom) */}
            <div className="flex mt-2 text-xs text-[var(--text-tertiary)] relative h-4 w-full">
              {monthLabels.map((label, i) => (
                <div
                  key={i}
                  className="absolute top-0 text-[10px]"
                  style={{ left: `${label.offset}px` }}
                >
                  {label.month}
                </div>
              ))}
            </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-2 mt-3 text-xs text-[var(--text-tertiary)]">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-[9px] h-[9px] rounded-[2px] bg-[var(--heatmap-level-0)]" />
            <div className="w-[9px] h-[9px] rounded-[2px] bg-[var(--heatmap-level-1)]" />
            <div className="w-[9px] h-[9px] rounded-[2px] bg-[var(--heatmap-level-2)]" />
            <div className="w-[9px] h-[9px] rounded-[2px] bg-[var(--heatmap-level-3)]" />
            <div className="w-[9px] h-[9px] rounded-[2px] bg-[var(--heatmap-level-4)]" />
          </div>
          <span>More</span>
      </div>
    </div>
  );
}