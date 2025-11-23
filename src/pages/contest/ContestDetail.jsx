import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";
import CountdownTimer from "../../components/CountdownTimer";

export default function ContestDetail() {
  const { contestId } = useParams();
  const navigate = useNavigate();
  const [contest, setContest] = useState(null);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    api.get(`/contests/${contestId}`).then((res) => setContest(res.data.contest));
  }, [contestId]);

  if (!contest) return <div className="p-6">Loading…</div>;

  const targetTime = new Date(contest.startTime).getTime();

  const handleJoin = async () => {
    setJoining(true);
    await api.post(`/contests/${contestId}/register`);
    setJoining(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-6">
      <button className="btn-outline" onClick={() => navigate(-1)}>← Back</button>

      <h1 className="text-4xl font-bold">{contest.title}</h1>

      <CountdownTimer target={targetTime} />

      {Date.now() >= targetTime && (
        <button
          className="btn-primary mt-4"
          onClick={() => navigate(`/contest/${contestId}/arena`)}
        >
          Enter Arena
        </button>
      )}

      <button
        className={`btn-accent mt-4 ${joining && "opacity-50"}`}
        onClick={handleJoin}
      >
        {joining ? "Joining…" : "Register"}
      </button>

      <button
        className="btn-outline mt-2"
        onClick={() => navigate(`/contest/${contestId}/leaderboard`)}
      >
        Leaderboard
      </button>

      <div className="card p-5 space-y-1">
        <h3 className="text-lg font-bold">Contest Info</h3>
        <p><b>Type:</b> {contest.type}</p>
        <p><b>Difficulty:</b> {contest.difficulty}</p>
        <p><b>Start:</b> {new Date(contest.startTime).toLocaleString()}</p>
        <p><b>Participants:</b> {contest.participants?.length}</p>
      </div>
    </div>
  );
}
