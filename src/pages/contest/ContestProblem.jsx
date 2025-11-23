import { useEffect, useState, useRef, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";
import { AuthContext } from "../../context/AuthContext";

export default function ContestProblem() {
  const { contestId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext ?? {});

  const [contest, setContest] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const autosaveKey = `contest_${contestId}_answers`;
  const autosaveRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    api.get(`/contests/${contestId}`)
      .then((res) => {
        const c = res.data.contest;
        setContest(c);

        try {
          const stored = JSON.parse(localStorage.getItem(autosaveKey) || "{}");
          setAnswer(stored.answers?.[0] || "");
        } catch (e) {
          setAnswer("");
        }
      })
      .catch(() => navigate("/contests"))
      .finally(() => setLoading(false));
  }, [contestId]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(autosaveKey) || "{}");
      const answers = stored.answers || [];
      setAnswer(answers[activeIndex] || "");
    } catch (e) {
      setAnswer("");
    }
  }, [activeIndex]);

  useEffect(() => {
    autosaveRef.current = setInterval(() => {
      const stored = JSON.parse(localStorage.getItem(autosaveKey) || "{}");
      const answers = stored.answers || [];
      answers[activeIndex] = answer;
      localStorage.setItem(autosaveKey, JSON.stringify({ answers }));

      setSaving(true);
      setTimeout(() => setSaving(false), 600);
    }, 3000);

    return () => clearInterval(autosaveRef.current);
  }, [answer, activeIndex]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!contest) return <div className="p-6">Contest not found.</div>;

  const problems = contest.problems;
  const problem = problems[activeIndex];

  const handleSubmit = async () => {
    setMessage("");
    try {
      await api.post("/submissions", {
        contestId,
        problemId: problem._id,
        answer,
      });
      setMessage("Submitted successfully!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Submission failed");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 border-r border-[var(--orbit-border)] bg-[var(--dark-slate-gray)]/40 backdrop-blur-xl p-4">
        <h3 className="text-lg font-bold mb-4">Problems</h3>

        <div className="flex flex-col gap-2">
          {problems.map((p, i) => (
            <button
              key={p._id}
              onClick={() => setActiveIndex(i)}
              className={`rounded-lg text-left px-3 py-2 transition ${
                activeIndex === i
                  ? "bg-[var(--dark-pastel-green)] text-white shadow-md animate-shuffle-pulse"
                  : "hover:bg-[var(--dark-pastel-green)]/20"
              }`}
            >
              Problem {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Main Section */}
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-[var(--orbit-border)]">
          <button
            className="md:hidden btn-outline px-3 py-1"
            onClick={() => setSidebarOpen(true)}
          >
            ☰ Problems
          </button>

          <h1 className="text-xl font-bold">{contest.title} — Q{activeIndex + 1}</h1>

          <button
            className="btn-outline px-3 py-1"
            onClick={() => navigate(`/contest/${contestId}/leaderboard`)}
          >
            Leaderboard
          </button>
        </div>

        <div className="p-6 overflow-auto space-y-4">
          <div className="card space-y-5">
            <h2 className="text-2xl font-bold">{problem.title}</h2>

            <div className="whitespace-pre-wrap leading-relaxed opacity-90">
              {problem.statement}
            </div>

            <div className="space-y-3">
              {problem.inputType === "mcq_single" &&
                problem.options.map((opt) => (
                  <label key={opt.id} className="flex gap-3 items-center">
                    <input
                      type="radio"
                      name={`ans-${problem._id}`}
                      value={opt.id}
                      checked={answer === opt.id}
                      onChange={(e) => setAnswer(e.target.value)}
                    />
                    {opt.text}
                  </label>
                ))}

              {problem.inputType === "numeric" && (
                <input
                  type="number"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="card p-3 w-full"
                />
              )}

              {problem.inputType === "expression" && (
                <input
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="card p-3 w-full"
                />
              )}

              {problem.inputType === "manual" && (
                <textarea
                  rows={6}
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="card p-3 w-full"
                />
              )}
            </div>

            <div className="flex gap-4 items-center">
              <button className="btn-primary px-6 py-2" onClick={handleSubmit}>
                Submit
              </button>

              <button
                className="btn-outline px-6 py-2"
                onClick={() => setMessage("Saved locally")}
              >
                Save
              </button>

              <span className="text-sm opacity-70">{saving ? "Saving..." : "Autosaved"}</span>
              {message && <span className="text-green-500 text-sm">{message}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-50" onClick={() => setSidebarOpen(false)}>
          <div
            className="absolute left-0 top-0 h-full w-64 bg-[var(--dark-slate-gray)] p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-bold text-lg mb-4">Problems</h3>
            {problems.map((p, i) => (
              <button
                key={p._id}
                onClick={() => {
                  setActiveIndex(i);
                  setSidebarOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded mb-2 ${
                  activeIndex === i
                    ? "bg-[var(--dark-pastel-green)] text-white"
                    : "hover:bg-[var(--dark-pastel-green)]/20"
                }`}
              >
                Problem {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
