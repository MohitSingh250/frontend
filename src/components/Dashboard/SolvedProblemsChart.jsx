import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function SolvedProblemsChart({ easy, medium, hard, total, totalEasy, totalMedium, totalHard }) {
  const totalQuestions = (totalEasy || 0) + (totalMedium || 0) + (totalHard || 0) || 1;
  
  const data = [
    { name: 'Easy', value: easy || 0, fill: 'var(--color-easy)' },
    { name: 'Medium', value: medium || 0, fill: 'var(--color-medium)' },
    { name: 'Hard', value: hard || 0, fill: 'var(--color-hard)' },
    { name: 'Remaining', value: Math.max(0, totalQuestions - total), fill: 'var(--bg-tertiary)' }
  ];

  return (
    <div className="relative h-[160px] w-[160px] flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={65}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      
      {/* Center Text */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="text-3xl font-bold text-[var(--text-primary)] leading-none">
          {total}
        </div>
        <div className="text-[10px] text-[var(--text-tertiary)] font-bold uppercase tracking-widest mt-2">
          Solved
        </div>
      </div>
    </div>
  );
}
