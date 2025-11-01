import React, { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

export default function Contests() {
  const [contests, setContests] = useState([]);

  useEffect(() => {
    api
      .get("/contests")
      .then((r) => setContests(r.data))
      .catch(() => {});
  }, []);

  // countdown logic
  const getTimeLeft = (startTime) => {
    const diff = new Date(startTime) - new Date();
    if (diff <= 0) return "Started";
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);
    return `Starts in ${days}d ${hours}h ${mins}m ${secs}s`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F111A] to-[#12141F] text-gray-100 py-12 px-6">
      {/* Header Trophy Section */}
      <div className="flex flex-col items-center mb-12 text-center">
        <div className="text-6xl mb-3">🏆</div>
        <h1 className="text-3xl font-bold text-white mb-2">LeetCode Contest</h1>
        <p className="text-gray-400 text-sm">
          Contest every week. Compete and see your ranking!
        </p>
      </div>

      {/* Contest Cards Section */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
        {contests.map((c) => (
          <div
            key={c._id}
            className="bg-[#1A1C24] rounded-2xl overflow-hidden border border-[#2C2E3A] hover:border-[#3B3D4A] transition-all shadow-lg"
          >
            {/* Image placeholder */}
            <div className="relative h-44 bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center">
              <div className="absolute bottom-3 left-4 bg-black/60 text-xs px-3 py-1 rounded-full flex items-center space-x-1">
                <span>⏰</span>
                <span>{getTimeLeft(c.startTime)}</span>
              </div>
            </div>

            {/* Info section */}
            <div className="p-5">
              <h2 className="text-lg font-semibold mb-1">{c.title}</h2>
              <p className="text-gray-400 text-sm">
                {new Date(c.startTime).toLocaleString()}
              </p>

              <div className="mt-4">
                <Link
                  to={`/contests/${c._id}`}
                  className="inline-block px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-black font-medium rounded-md transition"
                >
                  View Contest →
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {contests.length === 0 && (
          <div className="col-span-2 text-center text-gray-400 py-20">
            No contests available yet.
          </div>
        )}
      </div>
    </div>
  );
}
