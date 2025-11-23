import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";

export default function ContestLeaderboard() {
  const { contestId } = useParams();
  const navigate = useNavigate();
  const [board, setBoard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/leaderboard/${contestId}`)
      .then((res) => {
        const data = res.data?.leaderboard ?? [];
        setBoard(Array.isArray(data) ? data : []);
      })
      .finally(() => setLoading(false));
  }, [contestId]);

  const medal = (i) => ["🥇", "🥈", "🥉"][i] ?? i + 1;

  return (
    <div className="min-h-screen px-4 md:px-8 pt-10 pb-16 max-w-5xl mx-auto">
      
      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-1 tracking-wide">
          Leaderboard
        </h1>
        <p className="opacity-70 text-sm mb-4">
          Live rankings — solve problems to climb!
        </p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-1 rounded border border-gray-600 hover:bg-white/10 transition text-sm"
        >
          ← Back
        </button>
      </div>

      {/* TOP 3 PODIUM */}
      {!loading && board.length >= 1 && (
        <div className="flex justify-center gap-6 mb-12 text-center">
          {board.slice(0, 3).map((u, i) => (
            <div key={i} className="flex flex-col items-center">
              <div
                className={`rounded-full flex items-center justify-center text-3xl font-bold w-20 h-20 
                ${i === 0 ? "bg-yellow-400 text-black" : i === 1 ? 
                "bg-gray-300 text-black" : "bg-amber-700 text-white"}`}
              >
                {medal(i)}
              </div>
              <p className="font-semibold mt-2">{u.user?.username || "User"}</p>
              <p className="text-sm opacity-70">{u.score} pts</p>
            </div>
          ))}
        </div>
      )}

      {/* TABLE CONTAINER */}
      <div className="card overflow-hidden border border-gray-800 bg-[#171717]/70 backdrop-blur-xl rounded-xl shadow-xl">
        
        <table className="w-full text-left text-sm">
          <thead className="bg-[#1f1f1f] border-b border-gray-700">
            <tr>
              <th className="p-3">Rank</th>
              <th className="p-3">User</th>
              <th className="p-3">Score</th>
              <th className="p-3">Solved</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan="4" className="p-4 text-center animate-pulse opacity-80">
                  Loading…
                </td>
              </tr>
            )}

            {!loading && board.length === 0 && (
              <tr>
                <td colSpan="4" className="p-4 text-center opacity-70">
                  No one has solved anything yet. Be the first!
                </td>
              </tr>
            )}

            {!loading &&
              board.map((r, i) => (
                <tr
                  key={i}
                  className="border-t border-gray-700 hover:bg-white/10 transition"
                >
                  <td className="p-3 font-semibold">{medal(i)}</td>

                  <td className="p-3 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                      {String(r.user?.username || "U")[0].toUpperCase()}
                    </div>
                    {r.user?.username || r.user?.name || "User"}
                  </td>

                  <td className="p-3 font-medium">{r.score}</td>
                  <td className="p-3">{r.solved ?? "-"}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
