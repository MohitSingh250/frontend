import React from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';

export default function SolvedProblemsChart({ easy, medium, hard, total }) {
  // Calculate percentages for the gauge
  // We'll use a single bar for "Total Solved" vs "Total Questions" (mocking total questions as 3000 for now)
  const totalQuestions = 3000;
  const percentage = Math.min(100, (total / totalQuestions) * 100);
  
  const data = [
    { name: 'Solved', value: percentage, fill: 'var(--brand-orange)' }
  ];

  return (
    <div className="relative h-[160px] w-[160px] flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart 
          cx="50%" 
          cy="50%" 
          innerRadius="85%" 
          outerRadius="100%" 
          barSize={10} 
          data={data} 
          startAngle={90} 
          endAngle={-270}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            background={{ fill: 'var(--bg-tertiary)' }}
            clockWise
            dataKey="value"
            cornerRadius={10}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      
      {/* Center Text */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="text-xs text-[var(--text-secondary)] font-medium mb-0.5">Beats</div>
        <div className="text-3xl font-bold text-[var(--text-primary)]">
          {percentage.toFixed(1)}%
        </div>
        <div className="text-xs text-[var(--text-tertiary)] mt-1">of users</div>
      </div>
    </div>
  );
}
