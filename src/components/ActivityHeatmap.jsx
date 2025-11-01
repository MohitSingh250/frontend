import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { format } from "date-fns";

export default function ActivityHeatmap({ submissions = [] }) {
  if (!submissions || submissions.length === 0) {
    return (
      <div className="text-gray-500 text-sm text-center py-4">
        No activity yet.
      </div>
    );
  }

  // 🔹 Group submissions by date
  const dateMap = submissions.reduce((acc, sub) => {
    if (!sub.solvedAt) return acc;
    const date = new Date(sub.solvedAt).toISOString().split("T")[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  // 🔹 Convert to array format for the heatmap
  const values = Object.keys(dateMap).map((date) => ({
    date,
    count: dateMap[date],
  }));

  // 🔹 Define the date range (1 year)
  const endDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(endDate.getFullYear() - 1);

  return (
    <div className="w-full overflow-x-auto">
      <CalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={values}
        classForValue={(value) => {
          if (!value) return "color-empty";
          const level = Math.min(value.count, 4); // cap at 4 levels
          return `color-scale-${level}`;
        }}
        tooltipDataAttrs={(value) =>
          value?.date
            ? {
                "data-tip": `${format(
                  new Date(value.date),
                  "MMM d, yyyy"
                )}: ${value.count} solved`,
              }
            : null
        }
        showWeekdayLabels
      />

      {/* ✅ Custom LeetCode-style colors */}
      <style>
        {`
          .react-calendar-heatmap {
            width: 100%;
          }
          .color-empty { fill: #161b22; }
          .color-scale-1 { fill: #9be9a8; }
          .color-scale-2 { fill: #40c463; }
          .color-scale-3 { fill: #30a14e; }
          .color-scale-4 { fill: #216e39; }
          .react-calendar-heatmap text { fill: #888; font-size: 9px; }
          .react-calendar-heatmap .react-calendar-heatmap-weekday-labels {
            display: none;
          }
        `}
      </style>
    </div>
  );
}
