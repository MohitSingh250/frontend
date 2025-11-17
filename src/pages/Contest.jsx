import React from "react";

export default function LeetCodeContestPage() {
  return (
    <div className="min-h-screen bg-[#1c1f26] text-white p-6">
      {/* Header */}
      <div className="flex flex-col items-center mt-10">
        <div className="text-6xl mb-4">🏆</div>
        <h1 className="text-4xl font-semibold">LeetCode Contest</h1>
        <p className="text-gray-300 mt-2">
          Contest every week. Compete and see your ranking!
        </p>
      </div>

      {/* Upcoming Contests */}
      <div className="flex flex-col md:flex-row justify-center gap-6 mt-12">
        <div className="bg-[#223043] rounded-2xl overflow-hidden w-full max-w-md p-5">
          <div className="h-40 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl mb-4" />
          <p className="text-sm text-gray-300 flex items-center gap-2">⏱ Starts in 20h 57m 41s</p>
          <h2 className="text-xl font-semibold mt-2">Weekly Contest 476</h2>
          <p className="text-gray-400 text-sm">Sunday 8:00 AM GMT+5:30</p>
        </div>

        <div className="bg-[#223043] rounded-2xl overflow-hidden w-full max-w-md p-5">
          <div className="h-40 bg-gradient-to-br from-green-600 to-green-400 rounded-xl mb-4" />
          <p className="text-sm text-gray-300 flex items-center gap-2">⏱ Starts in 7d 8h 57m 41s</p>
          <h2 className="text-xl font-semibold mt-2">Biweekly Contest 170</h2>
          <p className="text-gray-400 text-sm">Saturday 8:00 PM GMT+5:30</p>
        </div>
      </div>

      {/* Mid Section */}
      <div className="flex flex-col md:flex-row gap-8 mt-14 justify-center">
        {/* Past Contests */}
        <div className="bg-[#23272f] rounded-2xl p-6 w-full max-w-lg">
          <div className="flex gap-6 border-b border-gray-700 pb-3 mb-4">
            <button className="font-semibold">Past Contests</button>
            <button className="text-gray-400">My Contests</button>
          </div>

          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between mb-4 p-3 rounded-xl bg-[#1f2229]"
            >
              <div className="flex items-center gap-3">
                <div className="h-14 w-14 bg-blue-500 rounded-xl" />
                <div>
                  <h3 className="font-semibold">Weekly Contest {475 - i}</h3>
                  <p className="text-gray-400 text-sm">Nov {9 - i}, 2025</p>
                </div>
              </div>
              <span className="bg-purple-700 text-white px-3 py-1 rounded-lg text-sm">
                Virtual
              </span>
            </div>
          ))}
        </div>

        {/* Global Ranking */}
        <div className="bg-[#23272f] rounded-2xl p-6 w-full max-w-sm">
          <h2 className="text-xl font-semibold mb-4">Global Ranking</h2>
          <div className="space-y-4">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="text-2xl">{i + 1}</div>
                <div className="h-12 w-12 rounded-full bg-pink-400" />
                <div>
                  <p className="font-semibold">User {i + 1}</p>
                  <p className="text-gray-400 text-sm">Rating: {3600 - i * 30}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
