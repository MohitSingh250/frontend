import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api";
import ActivityHeatmap from "../components/ActivityHeatmap";
import SolvedProblemsChart from "../components/Dashboard/SolvedProblemsChart";
import ContestRatingGraph from "../components/Dashboard/ContestRatingGraph";
import { MapPin, Github, Linkedin, Globe, Award, CheckCircle2, Info, MessageSquare } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { id } = useParams();
  const { user: currentUser } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/users/${id}/profile`);
        setData(res.data);
      } catch (err) {
        console.error("❌ Profile fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-[var(--text-secondary)]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[var(--brand-orange)]"></div>
      </div>
    );

  if (!data)
    return (
      <div className="flex flex-col justify-center items-center h-screen text-[var(--text-secondary)] space-y-4">
        <MessageSquare size={64} className="opacity-10" />
        <p className="text-xl font-bold">User not found</p>
        <Link to="/" className="px-6 py-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--bg-tertiary)]/80 transition-all">Go Home</Link>
      </div>
    );

  const isOwnProfile = currentUser?.id === data._id;

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

             {isOwnProfile && (
               <Link
                 to="/dashboard"
                 className="w-full mt-6 py-2 rounded-lg bg-[var(--color-success)]/10 text-[var(--color-success)] hover:bg-[var(--color-success)]/20 text-sm font-bold transition-colors flex items-center justify-center gap-2"
               >
                 Go to Dashboard
               </Link>
             )}
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
        </aside>

        {/* ================= RIGHT COLUMN (Stats & Activity) ================= */}
        <main className="lg:col-span-8 space-y-6">
           
           {/* Row 1: Mock Test Rating & Top % */}
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-primary)] p-6 shadow-sm h-[280px]">
                  <ContestRatingGraph 
                     title="Mock Test Rating"
                     rating={data.rating} 
                     globalRank={data.globalRank} 
                     attended={data.attended} 
                  />
              </div>
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
              <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-primary)] p-6 shadow-sm">
                 <div className="flex items-center gap-8">
                    <div className="shrink-0">
                       <SolvedProblemsChart 
                          easy={data.easySolved || 0} 
                          medium={data.mediumSolved || 0} 
                          hard={data.hardSolved || 0} 
                          total={data.totalSolved || 0} 
                          totalEasy={data.totalEasy || 0}
                          totalMedium={data.totalMedium || 0}
                          totalHard={data.totalHard || 0}
                       />
                    </div>
                    <div className="flex-1 space-y-5">
                       <div className="space-y-2">
                          <div className="flex justify-between items-center text-xs font-bold">
                             <span className="text-[var(--color-easy)]">Easy</span>
                             <span className="text-[var(--text-primary)]">
                                {data.easySolved || 0}<span className="text-[var(--text-tertiary)] font-normal ml-1">/{data.totalEasy || 0}</span>
                             </span>
                          </div>
                          <div className="h-2 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                             <div 
                                className="h-full bg-[var(--color-easy)] rounded-full transition-all duration-1000" 
                                style={{ width: `${Math.min(100, ((data.easySolved || 0) / (data.totalEasy || 1)) * 100)}%` }}
                             ></div>
                          </div>
                       </div>

                       <div className="space-y-2">
                          <div className="flex justify-between items-center text-xs font-bold">
                             <span className="text-[var(--color-medium)]">Med.</span>
                             <span className="text-[var(--text-primary)]">
                                {data.mediumSolved || 0}<span className="text-[var(--text-tertiary)] font-normal ml-1">/{data.totalMedium || 0}</span>
                             </span>
                          </div>
                          <div className="h-2 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                             <div 
                                className="h-full bg-[var(--color-medium)] rounded-full transition-all duration-1000" 
                                style={{ width: `${Math.min(100, ((data.mediumSolved || 0) / (data.totalMedium || 1)) * 100)}%` }}
                             ></div>
                          </div>
                       </div>

                       <div className="space-y-2">
                          <div className="flex justify-between items-center text-xs font-bold">
                             <span className="text-[var(--color-hard)]">Hard</span>
                             <span className="text-[var(--text-primary)]">
                                {data.hardSolved || 0}<span className="text-[var(--text-tertiary)] font-normal ml-1">/{data.totalHard || 0}</span>
                             </span>
                          </div>
                          <div className="h-2 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                             <div 
                                className="h-full bg-[var(--color-hard)] rounded-full transition-all duration-1000" 
                                style={{ width: `${Math.min(100, ((data.hardSolved || 0) / (data.totalHard || 1)) * 100)}%` }}
                             ></div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Badges */}
              <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-primary)] p-6 shadow-sm flex flex-col relative">
                 <div className="flex justify-between items-start mb-4">
                    <div>
                       <div className="text-xs text-[var(--text-secondary)] font-bold uppercase tracking-wider">Badges</div>
                       <div className="text-3xl font-black text-[var(--text-primary)]">{data.badges ? data.badges.length : 0}</div>
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
              </div>
           </div>

           {/* Row 3: Activity Heatmap */}
           <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-primary)] p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                 <h3 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                    {data.totalSolved || 0} <span className="text-[var(--text-secondary)] font-normal text-sm">submissions in the past one year</span>
                    <Info size={14} className="text-[var(--text-tertiary)] cursor-pointer hover:text-[var(--text-secondary)]" />
                 </h3>
              </div>
              {data.solvedProblems && data.solvedProblems.length > 0 ? (
                <ActivityHeatmap submissions={data.solvedProblems} />
              ) : (
                <div className="h-32 flex items-center justify-center text-[var(--text-tertiary)] text-sm">
                   No activity data available
                </div>
              )}
           </div>

           {/* Row 4: Recent Activity */}
           <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-primary)] overflow-hidden shadow-sm">
              <div className="p-4 border-b border-[var(--border-secondary)]">
                 <h3 className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">Recent Submissions</h3>
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
    </div>
  );
}
