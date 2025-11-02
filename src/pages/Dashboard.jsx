import React, { useEffect, useState } from "react";
import api from "../api";
import ActivityHeatmap from "../components/ActivityHeatmap";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [streak, setStreak] = useState(null);

  useEffect(() => {
    // Fetch dashboard data
    api
      .get("/users/me/dashboard")
      .then((r) => {

        setData(r.data);
      })
      .catch((err) => {
        console.error("❌ Dashboard error:", err);
      });

    // Fetch streak data
    api
      .get("/users/me/streak")
      .then((r) => {
        setStreak(r.data);
      })
      .catch((err) => {
        console.error("❌ Streak error:", err);
      });
  }, []);

  if (!data)
    return (
      <div className="flex justify-center items-center h-64 text-gray-400">
        Loading dashboard...
      </div>
    );

  // Check if we have solved problems with dates
  const hasSolvedProblems = data.solvedProblems && data.solvedProblems.length > 0;
  const hasValidDates = hasSolvedProblems && data.solvedProblems.some(p => p.solvedAt);

  console.log("🔍 hasSolvedProblems:", hasSolvedProblems);
  console.log("🔍 hasValidDates:", hasValidDates);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-gray-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">
        {/* ---------------- Sidebar ---------------- */}
        <aside className="lg:col-span-1 space-y-6">
          {/* Profile */}
          <div className="bg-[#1a1a1a] rounded-xl border border-[#2f2f2f] p-5">
            <div className="flex items-center space-x-3">
              <img
                src={data.avatar || "https://via.placeholder.com/80"}
                alt="avatar"
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h2 className="font-semibold text-white">{data.username}</h2>
                <p className="text-sm text-gray-400">Rating: {data.rating || 0}</p>
              </div>
            </div>
            <button className="w-full mt-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg font-medium text-white">
              Edit Profile
            </button>
            <p className="mt-3 text-gray-400 text-sm">📍 {data.country || "Unknown"}</p>
          </div>

          {/* Streak Section */}
          {streak && (
            <div className="bg-[#1a1a1a] rounded-xl border border-[#2f2f2f] p-5">
              <h3 className="text-gray-300 font-medium mb-3 flex items-center">
                <span className="mr-2">🔥</span> Streak
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Current Streak</span>
                  <span className="text-2xl font-bold text-orange-500">
                    {streak.currentStreak}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Longest Streak</span>
                  <span className="text-lg font-semibold text-yellow-500">
                    {streak.longestStreak}
                  </span>
                </div>
                {streak.lastSolvedAt && (
                  <div className="text-xs text-gray-500 mt-2">
                    Last solved: {new Date(streak.lastSolvedAt).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Community Stats */}
          <div className="bg-[#1a1a1a] rounded-xl border border-[#2f2f2f] p-5">
            <h3 className="text-gray-300 font-medium mb-3">Community Stats</h3>
            {["Views", "Solution", "Discuss", "Reputation"].map((stat) => (
              <div key={stat} className="flex justify-between text-sm py-1">
                <span>{stat}</span>
                <span className="text-gray-400">0</span>
              </div>
            ))}
          </div>

          {/* Topic Performance */}
          {data.topicStats && Object.keys(data.topicStats).length > 0 && (
            <div className="bg-[#1a1a1a] rounded-xl border border-[#2f2f2f] p-5">
              <h3 className="text-gray-300 font-medium mb-4">Topic Performance</h3>
              <div className="space-y-3">
                {Object.entries(data.topicStats)
                  .sort((a, b) => b[1].accuracy - a[1].accuracy)
                  .slice(0, 8)
                  .map(([topic, stats]) => (
                    <div key={topic} className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">{topic}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500">
                          {stats.correct}/{stats.attempts}
                        </span>
                        <span className="text-sm font-semibold text-blue-400 w-12 text-right">
                          {stats.accuracy}%
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
          
        </aside>

        <main className="lg:col-span-3 space-y-6">
          {/* Problems Solved */}
          <div className="bg-[#1a1a1a] rounded-xl border border-[#2f2f2f] p-5">
            <h3 className="text-gray-300 font-medium mb-4 text-xl">Problems Solved</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-4xl font-bold text-green-400">
                  {data.totalSolved}
                </p>
                <p className="text-sm text-gray-400 mt-1">Total Problems</p>
              </div>
              <div className="text-right space-y-2">
                <div className="flex items-center justify-end space-x-2">
                  <span className="text-sm text-gray-400">Easy:</span>
                  <span className="text-lg font-semibold text-green-400">
                    {data.easySolved || 0}
                  </span>
                </div>
                <div className="flex items-center justify-end space-x-2">
                  <span className="text-sm text-gray-400">Medium:</span>
                  <span className="text-lg font-semibold text-yellow-400">
                    {data.mediumSolved || 0}
                  </span>
                </div>
                <div className="flex items-center justify-end space-x-2">
                  <span className="text-sm text-gray-400">Hard:</span>
                  <span className="text-lg font-semibold text-red-400">
                    {data.hardSolved || 0}
                  </span>
                </div>
              </div>
            </div>
            {data.accuracy !== undefined && (
              <div className="mt-4 pt-4 border-t border-[#2f2f2f]">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Accuracy</span>
                  <span className="text-lg font-semibold text-blue-400">
                    {data.accuracy.toFixed(1)}%
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* 🔥 Activity Heatmap - DEBUG VERSION */}
          <div className="bg-[#1a1a1a] rounded-xl border border-[#2f2f2f] p-5">
            <h3 className="text-gray-300 font-medium mb-4 text-xl">Activity Heatmap</h3>
            {hasSolvedProblems && hasValidDates ? (
              <ActivityHeatmap submissions={data.solvedProblems} />
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-2">
                  {!hasSolvedProblems 
                    ? "No problems solved yet. Start solving to see your activity!" 
                    : "No valid date information found for solved problems."}
                </div>
                <div className="text-xs text-gray-500">
                  Solve your first problem to start building your streak!
                </div>
              </div>
            )}
          </div>

          {/* Contest Rating */}
          {data.contestRating !== undefined && (
            <div className="bg-[#1a1a1a] rounded-xl border border-[#2f2f2f] p-5">
              <h3 className="text-gray-300 font-medium mb-4">Contest Rating</h3>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold text-white">{data.contestRating}</p>
                  <p className="text-sm text-gray-400">
                    Global Rank: {data.globalRank}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Attended: {data.attended}</p>
                  <p className="text-sm text-gray-400">
                    Top {data.percentile || "—"}%
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Recently Solved */}
          <div className="bg-[#1a1a1a] rounded-xl border border-[#2f2f2f] p-5">
            <h3 className="text-gray-300 font-medium mb-4">Recently Solved</h3>
            <div className="space-y-2">
              {data.solvedProblems && data.solvedProblems.length > 0 ? (
                data.solvedProblems
                  .sort((a, b) => new Date(b.solvedAt) - new Date(a.solvedAt))
                  .slice(0, 10)
                  .map((problem) => (
                    <div
                      key={problem._id}
                      className="flex justify-between items-center bg-[#242633] p-3 rounded-lg hover:bg-[#2B2E3B] transition"
                    >
                      <div className="flex-1">
                        <span className="text-gray-200">{problem.title}</span>
                        {problem.topics && problem.topics.length > 0 && (
                          <div className="flex gap-2 mt-1">
                            {problem.topics.slice(0, 3).map((topic, idx) => (
                              <span
                                key={idx}
                                className="text-xs text-gray-500 bg-[#1a1a1a] px-2 py-0.5 rounded"
                              >
                                {topic}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        {problem.solvedAt && (
                          <span className="text-xs text-gray-500">
                            {new Date(problem.solvedAt).toLocaleDateString()}
                          </span>
                        )}
                        <span
                          className={`text-sm font-medium ${
                            problem.difficulty === "easy"
                              ? "text-green-400"
                              : problem.difficulty === "medium"
                              ? "text-yellow-400"
                              : "text-red-400"
                          }`}
                        >
                          {problem.difficulty}
                        </span>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-gray-500 text-center py-6">
                  No problems solved yet.
                </div>
              )}
            </div>
          </div>


        </main>
      </div>
    </div>
  );
}