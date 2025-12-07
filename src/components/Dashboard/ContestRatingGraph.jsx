import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ContestRatingGraph({ rating, globalRank, attended, title = "Mock Test Rating" }) {
  // Mock data for visualization
  const data = [
    { name: 'Sep', rating: 1500 },
    { name: 'Oct', rating: 1520 },
    { name: 'Nov', rating: 1480 },
    { name: 'Dec', rating: 1550 },
    { name: 'Jan', rating: 1580 },
    { name: 'Feb', rating: 1600 },
    { name: 'Mar', rating: rating || 1620 },
  ];

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between items-start mb-6 px-2">
        <div>
           <div className="text-xs text-[var(--text-secondary)] uppercase tracking-wider font-bold mb-1">{title}</div>
           <div className="text-3xl font-black text-[var(--text-primary)]">{rating || 1500}</div>
        </div>
        <div className="text-right">
           <div className="text-xs text-[var(--text-secondary)] uppercase tracking-wider font-bold mb-1">Global Ranking</div>
           <div className="text-xl font-bold text-[var(--text-primary)]">{globalRank ? globalRank.toLocaleString() : "N/A"}</div>
           <div className="text-xs text-[var(--text-tertiary)] mt-1">Top {((globalRank || 1000) / 10000).toFixed(2)}%</div>
        </div>
      </div>

      <div className="flex-1 min-h-[150px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorRating" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--brand-orange)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--brand-orange)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-secondary)" vertical={false} />
            <XAxis 
               dataKey="name" 
               axisLine={false}
               tickLine={false}
               tick={{ fill: 'var(--text-tertiary)', fontSize: 10 }}
               dy={10}
            />
            <Tooltip
              contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-primary)', borderRadius: '8px', fontSize: '12px' }}
              itemStyle={{ color: 'var(--text-primary)' }}
              labelStyle={{ display: 'none' }}
              formatter={(value) => [`${value}`, 'Rating']}
              cursor={{ stroke: 'var(--text-tertiary)', strokeWidth: 1, strokeDasharray: '4 4' }}
            />
            <Area 
               type="monotone" 
               dataKey="rating" 
               stroke="var(--brand-orange)" 
               strokeWidth={3} 
               fillOpacity={1} 
               fill="url(#colorRating)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
