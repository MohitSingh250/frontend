import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api";
import CountdownTimer from "../../components/CountdownTimer";

export default function ContestList() {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/contests")
      .then((res) => setContests(res.data?.contests ?? []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen pt-10">
      <h1 className="text-4xl font-bold text-center mb-10">Contests</h1>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-4 pb-12">
        {loading && [1, 2].map((i) => (
          <div key={i} className="card h-48 animate-pulse bg-gray-700/40" />
        ))}

        {!loading &&
          contests.map((c) => {
            const target = new Date(c.startTime).getTime();
            return (
              <Link
                key={c._id}
                to={`/contest/${c._id}`}
                className="card p-0 overflow-hidden hover:-translate-y-1 hover:shadow-xl transition cursor-pointer"
              >
                <div className="h-40 bg-gradient-to-br from-green-700/30 to-blue-600/30 p-4 flex items-end">
                  <CountdownTimer target={target} />
                </div>

                <div className="p-5">
                  <h2 className="text-xl font-bold">{c.title}</h2>
                  <p className="opacity-70 text-sm">
                    #{c.contestNumber} • {c.type} • {c.difficulty}
                  </p>
                </div>
              </Link>
            );
          })}

        {!loading && contests.length === 0 && (
          <p>No contests available.</p>
        )}
      </div>
    </div>
  );
}
