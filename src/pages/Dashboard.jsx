import React, { useEffect, useState } from "react";
import api from "../api";
import ActivityHeatmap from "../components/ActivityHeatmap";
import EditProfileModal from "../components/EditProfileModal";

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
        });
        setStreak(streak.data);
      } catch (err) {
        console.error("❌ Dashboard fetch error:", err);
      }
    };
    fetchData();
  }, []);
  console.log(data);


  if (!data)
    return (
      <div className="flex justify-center items-center h-64 text-[var(--white)]/50">
        Loading dashboard...
      </div>
    );

  const hasSolvedProblems =
    data.solvedProblems && data.solvedProblems.length > 0;
  const hasValidDates =
    hasSolvedProblems && data.solvedProblems.some((p) => p.solvedAt);

  return (
    <div className="min-h-screen bg-[var(--raisin-)] text-[var(--white)]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">
        {/* ---------- Sidebar ---------- */}
        <aside className="lg:col-span-1 space-y-6">
          {/* Profile */}
          <div className="bg-[var(--dark-slate-gray)]/80 rounded-2xl border border-[var(--dark-pastel-green)]/15 p-5 shadow-md backdrop-blur-md">
            <div className="flex items-center space-x-3">
              <img
                src={data.avatar || "https://via.placeholder.com/80"}
                alt="avatar"
                className="w-16 h-16 rounded-full border border-[var(--dark-pastel-green)]/30 shadow-sm"
              />
              <div>
                <h2 className="font-semibold text-[var(--white)]">
                  {data.username}
                </h2>
                <p className="text-sm text-[var(--white)]/60">
                  Rating: {data.rating || 0}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowEdit(true)}
              className="
                w-full mt-4 py-2 
                 bg-[var(--dark-pastel-green)]/40
                hover:opacity-90 rounded-lg font-medium text-[var(--dark-pastel-green)]
                transition shadow-[0_0_10px_rgba(44,188,93,0.25)]
              "
            >
              Edit Profile
            </button>
            <p className="mt-3 text-[var(--white)]/50 text-sm">
              📍 {data.location || "Unknown"}
            </p>
          </div>

          {/* Streak Section */}
          {streak && (
            <div className="bg-[var(--dark-slate-gray)]/80 rounded-2xl border border-[var(--dark-pastel-green)]/15 p-5 shadow-md backdrop-blur-md">
              <h3 className="text-[var(--white)]/80 font-medium mb-3 flex items-center">
                Streak
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[var(--white)]/60">
                    Current Streak
                  </span>
                  <span className="text-2xl font-bold text-[var(--spanish-orange)]">
                    {streak.currentStreak}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[var(--white)]/60">
                    Longest Streak
                  </span>
                  <span className="text-lg font-semibold text-[var(--orange-peel)]">
                    {streak.longestStreak}
                  </span>
                </div>
                {streak.lastSolvedAt && (
                  <div className="text-xs text-[var(--white)]/40 mt-2">
                    Last solved:{" "}
                    {new Date(streak.lastSolvedAt).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Community Stats */}
          <div className="bg-[var(--dark-slate-gray)]/80 rounded-2xl border border-[var(--dark-pastel-green)]/15 p-5 shadow-md backdrop-blur-md">
            <h3 className="text-[var(--white)]/80 font-medium mb-3">
              Community Stats
            </h3>
            {["Views", "Solution", "Discuss", "Reputation"].map((stat) => (
              <div key={stat} className="flex justify-between text-sm py-1">
                <span className="text-[var(--white)]/70">{stat}</span>
                <span className="text-[var(--white)]/50">0</span>
              </div>
            ))}
          </div>

          {/* Topic Performance */}
          {data.topicStats && Object.keys(data.topicStats).length > 0 && (
            <div className="bg-[var(--dark-slate-gray)]/80 rounded-2xl border border-[var(--dark-pastel-green)]/15 p-5 shadow-md backdrop-blur-md">
              <h3 className="text-[var(--white)]/80 font-medium mb-4">
                Topic Performance
              </h3>
              <div className="space-y-3">
                {Object.entries(data.topicStats)
                  .sort((a, b) => b[1].accuracy - a[1].accuracy)
                  .slice(0, 8)
                  .map(([topic, stats]) => (
                    <div
                      key={topic}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm text-[var(--white)]/70">
                        {topic}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-[var(--white)]/50">
                          {stats.correct}/{stats.attempts}
                        </span>
                        <span className="text-sm font-semibold text-[var(--dark-pastel-green)] w-12 text-right">
                          {stats.accuracy}%
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </aside>

        {/* ---------- Main Section ---------- */}
        <main className="lg:col-span-3 space-y-6">
          {/* Problems Solved */}
          <div className="bg-[var(--dark-slate-gray)]/80 rounded-2xl border border-[var(--dark-pastel-green)]/15 p-5 shadow-md backdrop-blur-md">
            <h3 className="text-[var(--white)]/80 font-medium mb-4 text-xl">
              Problems Solved
            </h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-4xl font-bold text-[var(--dark-pastel-green)]">
                  {data.totalSolved}
                </p>
                <p className="text-sm text-[var(--white)]/60 mt-1">
                  Total Problems
                </p>
              </div>
              <div className="text-right space-y-2">
                {[
                  ["Easy", data.easySolved || 0, "text-[var(--dark-pastel-green)]"],
                  ["Medium", data.mediumSolved || 0, "text-[var(--orange-peel)]"],
                  ["Hard", data.hardSolved || 0, "text-[var(--spanish-orange)]"],
                ].map(([label, value, color]) => (
                  <div
                    key={label}
                    className="flex items-center justify-end space-x-2"
                  >
                    <span className="text-sm text-[var(--white)]/60">
                      {label}:
                    </span>
                    <span className={`text-lg font-semibold ${color}`}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {data.accuracy !== undefined && (
              <div className="mt-4 pt-4 border-t border-[var(--dark-pastel-green)]/15">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--white)]/60">Accuracy</span>
                  <span className="text-lg font-semibold text-[var(--aqua)]">
                    {data.accuracy.toFixed(1)}%
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Activity Heatmap */}
          <div className="bg-[var(--dark-slate-gray)]/80 rounded-2xl border border-[var(--dark-pastel-green)]/15 p-5 shadow-md backdrop-blur-md">
            {hasSolvedProblems && hasValidDates ? (
              <ActivityHeatmap submissions={data.solvedProblems} />
            ) : (
              <div className="text-center py-8">
                <div className="text-[var(--white)]/50 mb-2">
                  {!hasSolvedProblems
                    ? "No problems solved yet. Start solving to see your activity!"
                    : "No valid date information found for solved problems."}
                </div>
                <div className="text-xs text-[var(--white)]/40">
                  Solve your first problem to start building your streak!
                </div>
              </div>
            )}
          </div>

          {/* Contest Rating */}
          {data.contestRating !== undefined && (
            <div className="bg-[var(--dark-slate-gray)]/80 rounded-2xl border border-[var(--dark-pastel-green)]/15 p-5 shadow-md backdrop-blur-md">
              <h3 className="text-[var(--white)]/80 font-medium mb-4">
                Contest Rating
              </h3>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold text-[var(--white)]">
                    {data.contestRating}
                  </p>
                  <p className="text-sm text-[var(--white)]/60">
                    Global Rank: {data.globalRank}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-[var(--white)]/60">
                    Attended: {data.attended}
                  </p>
                  <p className="text-sm text-[var(--white)]/60">
                    Top {data.percentile || "—"}%
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Recently Solved */}
          <div className="bg-[var(--dark-slate-gray)]/80 rounded-2xl border border-[var(--dark-pastel-green)]/15 p-5 shadow-md backdrop-blur-md">
            <h3 className="text-[var(--white)]/80 font-medium mb-4">
              Recently Solved
            </h3>
            <div className="space-y-2">
              {data.solvedProblems && data.solvedProblems.length > 0 ? (
                data.solvedProblems
                  .sort((a, b) => new Date(b.solvedAt) - new Date(a.solvedAt))
                  .slice(0, 10)
                  .map((problem) => (
                    <div
                      key={problem._id}
                      className="
                        flex justify-between items-center 
                        bg-[var(--raisin-black)]/60 p-3 rounded-lg 
                        hover:bg-[var(--dark-slate-gray)]/70 transition
                      "
                    >
                      <div className="flex-1">
                        <span className="text-[var(--white)]">
                          {problem.title}
                        </span>
                        {problem.topics && problem.topics.length > 0 && (
                          <div className="flex gap-2 mt-1">
                            {problem.topics.slice(0, 3).map((topic, idx) => (
                              <span
                                key={idx}
                                className="text-xs text-[var(--white)]/50 bg-[var(--dark-slate-gray)]/70 px-2 py-0.5 rounded"
                              >
                                {topic}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        {problem.solvedAt && (
                          <span className="text-xs text-[var(--white)]/40">
                            {new Date(problem.solvedAt).toLocaleDateString()}
                          </span>
                        )}
                        <span
                          className={`text-sm font-medium ${
                            problem.difficulty === "easy"
                              ? "text-[var(--dark-pastel-green)]"
                              : problem.difficulty === "medium"
                              ? "text-[var(--orange-peel)]"
                              : "text-[var(--spanish-orange)]"
                          }`}
                        >
                          {problem.difficulty}
                        </span>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-[var(--white)]/40 text-center py-6">
                  No problems solved yet.
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* ✅ Profile Edit Modal */}
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
