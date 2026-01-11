import React, { useEffect, useState } from "react";
import api from "../api";
import { PieChart, BarChart2, TrendingUp, Award, CheckCircle2, Clock, Target, Loader2 } from "lucide-react";
import SolvedProblemsChart from "../components/Dashboard/SolvedProblemsChart";

export default function Progress() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await api.get("/users/me/dashboard");
        setData(res.data);
      } catch (err) {
        console.error("Error fetching progress:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProgress();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[var(--text-secondary)]">
        <Loader2 className="animate-spin mr-2" /> Loading progress...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] p-6 pb-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-xl bg-[var(--brand-orange)]/10 text-[var(--brand-orange)]">
            <TrendingUp size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">My Progress</h1>
            <p className="text-[var(--text-secondary)] text-sm">
              Detailed breakdown of your learning journey
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Overall Stats Card */}
          <div className="lg:col-span-2 bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-primary)] p-8 flex items-center gap-12">
            <div className="shrink-0">
              <SolvedProblemsChart 
                easy={data.easySolved || 0} 
                medium={data.mediumSolved || 0} 
                hard={data.hardSolved || 0} 
                total={data.totalSolved || 0} 
                totalEasy={data.totalEasy || 0}
                totalMedium={data.totalMedium || 0}
                totalHard={data.totalHard || 0}
                size={200}
              />
            </div>
            <div className="flex-1 space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <StatBox label="Easy" solved={data.easySolved} total={data.totalEasy} color="var(--color-easy)" />
                <StatBox label="Med." solved={data.mediumSolved} total={data.totalMedium} color="var(--color-medium)" />
                <StatBox label="Hard" solved={data.hardSolved} total={data.totalHard} color="var(--color-hard)" />
              </div>
              <div className="pt-4 border-t border-[var(--border-primary)]">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-[var(--text-secondary)]">Overall Accuracy</span>
                  <span className="text-sm font-bold">{data.accuracy || 0}%</span>
                </div>
                <div className="h-2 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[var(--brand-orange)] rounded-full transition-all duration-1000" 
                    style={{ width: `${data.accuracy || 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Points & Rank Card */}
          <div className="bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-primary)] p-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[var(--color-medium)]/10 text-[var(--color-medium)]">
                    <Award size={20} />
                  </div>
                  <span className="text-sm font-medium text-[var(--text-secondary)]">Global Rank</span>
                </div>
                <span className="text-xl font-bold">#{data.globalRank || "N/A"}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[var(--accent-blue)]/10 text-[var(--accent-blue)]">
                    <Target size={20} />
                  </div>
                  <span className="text-sm font-medium text-[var(--text-secondary)]">Percentile</span>
                </div>
                <span className="text-xl font-bold">{data.percentile || 0}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[var(--color-success)]/10 text-[var(--color-success)]">
                    <CheckCircle2 size={20} />
                  </div>
                  <span className="text-sm font-medium text-[var(--text-secondary)]">Reputation</span>
                </div>
                <span className="text-xl font-bold">{data.reputation || 0}</span>
              </div>
            </div>
            <div className="mt-8 p-4 bg-[var(--bg-tertiary)]/50 rounded-xl border border-[var(--border-primary)]">
              <div className="flex items-center gap-2 text-xs text-[var(--text-tertiary)] mb-1">
                <Clock size={12} />
                <span>Last Activity</span>
              </div>
              <div className="text-sm font-medium">
                {data.solvedProblems?.[0] ? new Date(data.solvedProblems[0].solvedAt).toLocaleDateString() : "No activity"}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Subject Stats */}
          <div className="bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-primary)] p-6">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <PieChart size={18} className="text-[var(--brand-orange)]" />
              Subject Breakdown
            </h3>
            <div className="space-y-4">
              {data.subjectStats && Object.entries(data.subjectStats).map(([subject, stats]) => (
                <div key={subject} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{subject}</span>
                    <span className="text-xs text-[var(--text-secondary)]">
                      <span className="font-bold text-[var(--text-primary)]">{stats.correct}</span> solved
                    </span>
                  </div>
                  <div className="h-1.5 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[var(--brand-orange)] rounded-full" 
                      style={{ width: `${Math.min(100, (stats.correct / (data.totalSolved || 1)) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Topic Stats */}
          <div className="bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-primary)] p-6">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <BarChart2 size={18} className="text-[var(--accent-blue)]" />
              Top Mastered Topics
            </h3>
            <div className="space-y-4">
              {data.topicStats && Object.entries(data.topicStats)
                .sort(([, a], [, b]) => b.correct - a.correct)
                .slice(0, 6)
                .map(([topic, stats]) => (
                  <div key={topic} className="flex items-center justify-between p-3 bg-[var(--bg-tertiary)]/30 rounded-xl border border-[var(--border-primary)]/50">
                    <span className="text-sm font-medium">{topic}</span>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-xs font-bold">{stats.correct}</div>
                        <div className="text-[10px] text-[var(--text-tertiary)] uppercase">Solved</div>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-primary)] flex items-center justify-center text-[10px] font-bold text-[var(--brand-orange)]">
                        {Math.round(stats.accuracy)}%
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, solved, total, color }) {
  const percentage = Math.min(100, (solved / (total || 1)) * 100);
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-end">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-tertiary)]" style={{ color }}>{label}</span>
        <span className="text-sm font-bold">{solved}<span className="text-[var(--text-tertiary)] font-normal text-xs">/{total}</span></span>
      </div>
      <div className="h-1.5 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-1000" 
          style={{ width: `${percentage}%`, backgroundColor: color }}
        ></div>
      </div>
    </div>
  );
}
