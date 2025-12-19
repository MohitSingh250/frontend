import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import ActivityHeatmap from "../components/ActivityHeatmap";
import EditProfileModal from "../components/EditProfileModal";
import SolvedProblemsChart from "../components/Dashboard/SolvedProblemsChart";
import ContestRatingGraph from "../components/Dashboard/ContestRatingGraph";
import { MapPin, Edit2, Github, Linkedin, Globe, Award, CheckCircle2, Info } from "lucide-react";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [streak, setStreak] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dashboard, streak, me] = await Promise.all([
          api.get("/users/me/dashboard"),
          api.get("/users/me/streak"),
          api.get("/auth/me"),
        ]);

        setData({
          ...dashboard.data,
          username: me.data.username,
          location: me.data.location,
          avatar: me.data.avatar,
          about: me.data.about,
          website: me.data.website,
          github: me.data.github,
          linkedin: me.data.linkedin,
          skills: me.data.skills || [],
        });
        setStreak(streak.data);
      } catch (err) {
        console.error("❌ Dashboard fetch error:", err);
      }
    };
    fetchData();
  }, []);

  if (!data)
    return (
      <div className="flex justify-center items-center h-screen text-[var(--text-secondary)]">
        Loading dashboard...
      </div>
    );

  const hasSolvedProblems = data.solvedProblems && data.solvedProblems.length > 0;
  const hasValidDates = hasSolvedProblems && data.solvedProblems.some((p) => p.solvedAt);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] pb-20">
      <div className="max-w-[1200px] mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* ================= LEFT COLUMN (Profile) ================= */}
        <aside className="lg:col-span-4 space-y-4">
          
          {/* Profile Card */}
          <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-primary)] p-6 shadow-sm relative overflow-hidden">
             <div className="flex items-start gap-4">
                <div className="relative">
                   <img
                     src={data.avatar || "https://via.placeholder.com/100"}
                     alt="avatar"
                     className="w-20 h-20 rounded-xl border-2 border-[var(--bg-tertiary)] object-cover"
                   />
                </div>
                <div className="flex-1 min-w-0">
                   <h2 className="text-xl font-bold truncate">{data.username}</h2>
                   <p className="text-sm text-[var(--text-secondary)]">Rank {data.globalRank || "N/A"}</p>
                   {data.location && (
                      <div className="flex items-center gap-1 text-xs text-[var(--text-tertiary)] mt-1">
                         <MapPin size={12} />
                         <span>{data.location}</span>
                      </div>
                   )}
                </div>
             </div>

             <div className="mt-4 space-y-2">
                {data.about && <p className="text-sm text-[var(--text-secondary)] line-clamp-3">{data.about}</p>}
                
                <div className="flex gap-3 pt-2">
                   {data.github && <a href={data.github} target="_blank" className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"><Github size={18} /></a>}
                   {data.linkedin && <a href={data.linkedin} target="_blank" className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"><Linkedin size={18} /></a>}
                   {data.website && <a href={data.website} target="_blank" className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"><Globe size={18} /></a>}
                </div>
             </div>

             <button
               onClick={() => setShowEdit(true)}
               className="w-full mt-6 py-2 rounded-lg bg-[var(--color-success)]/10 text-[var(--color-success)] hover:bg-[var(--color-success)]/20 text-sm font-bold transition-colors flex items-center justify-center gap-2"
             >
               Edit Profile
             </button>
          </div>

          {/* Community Stats */}
          <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-primary)] p-4 shadow-sm">
            <h3 className="text-xs font-bold text-[var(--text-secondary)] mb-4 uppercase tracking-wider">Community Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <div className="text-blue-500"><Globe size={16} /></div>
                 <div className="flex-1 flex justify-between items-center">
                    <span className="text-sm text-[var(--text-secondary)]">Views</span>
                    <span className="text-sm font-medium text-[var(--text-primary)]">{data.views || 0}</span>
                 </div>
              </div>
              <div className="flex items-center gap-3">
                 <div className="text-blue-500"><CheckCircle2 size={16} /></div>
                 <div className="flex-1 flex justify-between items-center">
                    <span className="text-sm text-[var(--text-secondary)]">Solutions</span>
                    <span className="text-sm font-medium text-[var(--text-primary)]">{data.solutions || 0}</span>
                 </div>
              </div>
              <div className="flex items-center gap-3">
                 <div className="text-green-500"><Github size={16} /></div>
                 <div className="flex-1 flex justify-between items-center">
                    <span className="text-sm text-[var(--text-secondary)]">Discuss</span>
                    <span className="text-sm font-medium text-[var(--text-primary)]">{data.discuss || 0}</span>
                 </div>
              </div>
              <div className="flex items-center gap-3">
                 <div className="text-yellow-500"><Award size={16} /></div>
                 <div className="flex-1 flex justify-between items-center">
                    <span className="text-sm text-[var(--text-secondary)]">Reputation</span>
                    <span className="text-sm font-medium text-[var(--text-primary)]">{data.reputation || 0}</span>
                 </div>
              </div>
            </div>
          </div>

          {/* Subjects (styled like Languages) */}
          <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-primary)] p-4 shadow-sm">
             <h3 className="text-xs font-bold text-[var(--text-secondary)] mb-4 uppercase tracking-wider">Subjects</h3>
             <div className="space-y-2">
                {data.subjectStats && Object.entries(data.subjectStats).length > 0 ? (
                   Object.entries(data.subjectStats).map(([subject, stats]) => (
                      <div key={subject} className="flex justify-between items-center px-3 py-2 rounded-lg bg-[var(--bg-tertiary)]/50 hover:bg-[var(--bg-tertiary)] transition-colors cursor-pointer">
                         <span className="text-xs font-medium text-[var(--text-primary)]">
                            {subject}
                         </span>
                         <span className="text-xs text-[var(--text-secondary)]">
                            <span className="font-bold text-[var(--text-primary)] mr-1">{stats.correct}</span>
                            problems solved
                         </span>
                      </div>
                   ))
                ) : (
                   <div className="text-xs text-[var(--text-tertiary)]">No subject data available</div>
                )}
             </div>
          </div>

          {/* Strong Topics (styled like Skills) */}
          <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-primary)] p-4 shadow-sm">
             <h3 className="text-xs font-bold text-[var(--text-secondary)] mb-4 uppercase tracking-wider">Strong Topics</h3>
             <div className="flex flex-col gap-2">
                {data.topicStats && Object.entries(data.topicStats).length > 0 ? (
                   Object.entries(data.topicStats)
                     .sort(([, a], [, b]) => b.correct - a.correct) // Sort by most solved
                     .slice(0, 5) // Show top 5
                     .map(([topic, stats]) => (
                      <div key={topic} className="flex items-center gap-2">
                         <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-tertiary)]"></span>
                         <span className="text-xs text-[var(--text-secondary)]">{topic}</span>
                         <span className="text-xs text-[var(--text-tertiary)] ml-auto">x{stats.correct}</span>
                      </div>
                   ))
                ) : (
                   <div className="text-xs text-[var(--text-tertiary)]">No topics mastered yet</div>
                )}
             </div>
          </div>

        </aside>

        {/* ================= RIGHT COLUMN (Stats & Activity) ================= */}
        <main className="lg:col-span-8 space-y-6">
           
           {/* Row 1: Mock Test Rating & Top % */}
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Link to="/contests" className="lg:col-span-2 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-primary)] p-6 shadow-sm h-[280px] hover:border-[var(--brand-orange)] transition-colors block">
                  <ContestRatingGraph 
                     title="Mock Test Rating"
                     rating={data.contestRating} 
                     globalRank={data.globalRank} 
                     attended={data.attended} 
                  />
              </Link>
              <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-primary)] p-6 shadow-sm h-auto md:h-[280px] flex flex-col justify-center items-center relative overflow-hidden">
                  <div className="absolute top-4 left-4 text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">Top</div>
                  <div className="text-4xl font-black text-[var(--text-primary)] z-10">
                     {data.percentile ? data.percentile : "0"}%
                  </div>
                  
                  {/* Background Bar Chart Effect */}
                  <div className="absolute bottom-0 left-0 right-0 h-40 flex items-end justify-between px-6 opacity-30">
                     {[10, 25, 40, 60, 80, 100, 70, 40, 20, 10, 5, 20, 40, 60, 30, 10].map((h, i) => (
                        <div key={i} className={`w-1.5 rounded-t-sm ${i === 5 ? 'bg-[var(--brand-orange)]' : 'bg-[var(--text-secondary)]'}`} style={{ height: `${h}%` }} />
                     ))}
                  </div>
               </div>
           </div>

           {/* Row 2: Solved Problems & Badges */}
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Solved Problems (Circular) */}
              <Link to="/problems" className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-primary)] p-6 shadow-sm hover:border-[var(--brand-orange)] transition-colors group">
                 <div className="flex items-center gap-8">
                    <div className="shrink-0 group-hover:scale-105 transition-transform">
                       <SolvedProblemsChart 
                          easy={data.easySolved || 0} 
                          medium={data.mediumSolved || 0} 
                          hard={data.hardSolved || 0} 
                          total={data.totalSolved || 0} 
                       />
                    </div>
                    <div className="flex-1 space-y-4">
                       <div className="flex justify-between items-center p-2 rounded bg-[var(--bg-tertiary)]/30">
                          <span className="text-xs font-bold text-[var(--color-easy)] w-12">Easy</span>
                           <span className="text-sm font-bold text-[var(--text-primary)]">
                              {data.easySolved || 0}<span className="text-[var(--text-tertiary)] font-normal text-xs ml-1">/{data.totalEasy || 0}</span>
                           </span>
                       </div>

                       <div className="flex justify-between items-center p-2 rounded bg-[var(--bg-tertiary)]/30">
                          <span className="text-xs font-bold text-[var(--color-medium)] w-12">Med.</span>
                           <span className="text-sm font-bold text-[var(--text-primary)]">
                              {data.mediumSolved || 0}<span className="text-[var(--text-tertiary)] font-normal text-xs ml-1">/{data.totalMedium || 0}</span>
                           </span>
                       </div>

                       <div className="flex justify-between items-center p-2 rounded bg-[var(--bg-tertiary)]/30">
                          <span className="text-xs font-bold text-[var(--color-hard)] w-12">Hard</span>
                           <span className="text-sm font-bold text-[var(--text-primary)]">
                              {data.hardSolved || 0}<span className="text-[var(--text-tertiary)] font-normal text-xs ml-1">/{data.totalHard || 0}</span>
                           </span>
                       </div>
                    </div>
                 </div>
              </Link>

              {/* Badges */}
              <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-primary)] p-6 shadow-sm flex flex-col relative">
                 <div className="flex justify-between items-start mb-4">
                    <div>
                       <div className="text-xs text-[var(--text-secondary)] font-bold uppercase tracking-wider">Badges</div>
                       <div className="text-3xl font-black text-[var(--text-primary)]">{data.badges ? data.badges.length : 0}</div>
                    </div>
                    <div className="text-[var(--text-tertiary)] cursor-pointer hover:text-[var(--text-primary)]">
                        <span className="text-xl">→</span>
                    </div>
                 </div>
                 
                 <div className="flex-1 flex items-center gap-4">
                    {data.badges && data.badges.length > 0 ? (
                       data.badges.slice(0, 2).map((badge, idx) => (
                          <div key={idx} className="w-20 h-20 bg-[var(--bg-tertiary)]/50 rounded-xl flex items-center justify-center border border-[var(--border-secondary)] relative group cursor-pointer hover:bg-[var(--bg-tertiary)] transition-colors">
                             <img src={badge.icon || "https://assets.leetcode.com/static_assets/marketing/2024-100-days-badge.png"} alt={badge.name} className="w-16 h-16 object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
                          </div>
                       ))
                    ) : (
                       <div className="text-sm text-[var(--text-tertiary)]">No badges earned yet</div>
                    )}
                 </div>

                 <div className="mt-4">
                    <div className="text-xs text-[var(--text-secondary)] font-medium">Most Recent Badge</div>
                    <div className="text-sm font-bold text-[var(--text-primary)]">
                       {data.badges && data.badges.length > 0 ? data.badges[0].name : "None"}
                    </div>
                 </div>
              </div>

           </div>



           {/* Row 3: Activity Heatmap */}
           <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-primary)] p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                 <h3 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                    {data.totalSolved || 0} <span className="text-[var(--text-secondary)] font-normal text-sm">submissions in the past one year</span>
                    <Info size={14} className="text-[var(--text-tertiary)] cursor-pointer hover:text-[var(--text-secondary)]" />
                 </h3>
                 <div className="flex gap-6 text-xs text-[var(--text-secondary)]">
                    <div>Total active days: <span className="text-[var(--text-primary)] font-bold">{streak?.history?.length || 0}</span></div>
                    <div>Max streak: <span className="text-[var(--text-primary)] font-bold">{streak?.maxStreak || 0}</span></div>
                 </div>
              </div>
              {hasSolvedProblems && hasValidDates ? (
                <ActivityHeatmap submissions={data.solvedProblems} />
              ) : (
                <div className="h-32 flex items-center justify-center text-[var(--text-tertiary)] text-sm">
                   No activity data available
                </div>
              )}
           </div>

           {/* Row 4: Recent Activity */}
           <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-primary)] overflow-hidden shadow-sm">
              <div className="p-4 border-b border-[var(--border-secondary)] flex items-center gap-6">
                 <button className="flex items-center gap-2 px-3 py-1.5 rounded bg-[var(--bg-tertiary)] text-[var(--text-primary)] text-xs font-bold">
                    <CheckCircle2 size={14} /> Recent AC
                 </button>
                 <button className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs font-medium transition-colors">List</button>
                 <button className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs font-medium transition-colors">Solutions</button>
                 <button className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs font-medium transition-colors">Discuss</button>
                 <div className="flex-1 text-right">
                    <button className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs font-medium transition-colors">View all submissions &gt;</button>
                 </div>
              </div>
              <div className="divide-y divide-[var(--border-secondary)]">
                 {data.solvedProblems && data.solvedProblems.length > 0 ? (
                    data.solvedProblems.slice(0, 5).map((problem) => (
                       <div key={problem._id} className="p-4 flex items-center justify-between hover:bg-[var(--bg-tertiary)]/50 transition-colors cursor-pointer">
                          <div className="font-medium text-sm text-[var(--text-primary)]">{problem.title}</div>
                          <div className="text-xs text-[var(--text-tertiary)]">
                             {new Date(problem.solvedAt).toLocaleDateString()}
                          </div>
                       </div>
                    ))
                 ) : (
                    <div className="p-8 text-center text-[var(--text-tertiary)] text-sm">No recent submissions</div>
                 )}
              </div>
           </div>

        </main>
      </div>

      {/* Edit Profile Modal */}
      {showEdit && (
        <EditProfileModal
          user={data}
          onClose={() => setShowEdit(false)}
          onUpdated={(updated) => setData((prev) => ({ ...prev, ...updated }))}
        />
      )}
    </div>
  );
}
