import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../api/index";
import { AuthContext } from "../context/AuthContext";
import ReactMarkdown from "react-markdown";

export default function ProblemDetail() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [problem, setProblem] = useState(null);
  const [answer, setAnswer] = useState("");
  const [msg, setMsg] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [shownHints, setShownHints] = useState(0); 
  useEffect(() => {
    api
      .get(`/problems/${id}`)
      .then((r) => setProblem(r.data))
      .catch(() => {});

    if (user) {
      api
        .get(`/submissions/user/${user._id}`)
        .then((r) => setSubmissions(r.data))
        .catch(() => {});
    }
  }, [id, user]);

  if (!problem)
    return (
      <div className="flex items-center justify-center min-h-screen text-[var(--white)]/60">
        Loading problem...
      </div>
    );

  const submit = async () => {
    setMsg(null);
    try {
      const res = await api.post("/submissions", { problemId: id, answer });
      setMsg({
        type: res.data.correct ? "success" : "error",
        text: res.data.message || (res.data.correct ? "✅ Correct!" : "❌ Wrong"),
      });
      if (user) {
        const s = await api.get(`/submissions/user/${user._id}`);
        setSubmissions(s.data);
      }
    } catch (err) {
      setMsg({
        type: "error",
        text: err?.response?.data?.message || "Submit failed",
      });
    }
  };

  const showNextHint = () => {
    if (problem.hints && shownHints < problem.hints.length) {
      setShownHints(shownHints + 1);
    }
  };

  const hideLastHint = () => {
    if (shownHints > 0) {
      setShownHints(shownHints - 1);
    }
  };

  return (
    <div
      className="
        min-h-screen flex flex-col lg:flex-row
        bg-[var(--raisin-black)] text-[var(--white)]
        transition-colors duration-300
      "
    >
      {/* -------- Left Panel (Problem Statement) -------- */}
      <div
        className="
          w-full lg:w-1/2
          border-b lg:border-b-0 lg:border-r border-[var(--orange-peel)]/15
          p-5 sm:p-6 overflow-y-auto
          bg-[var(--dark-slate-gray)]/50 backdrop-blur-md
        "
      >
        <h1 className="text-2xl font-bold mb-3 text-[var(--white)]">
          {problem.title}
        </h1>

        {/* Difficulty + Topics */}
        <div className="flex flex-wrap items-center gap-2 text-sm mb-4">
          <span
            className={`px-2 py-[3px] rounded-md text-xs font-semibold capitalize ${
              problem.difficulty === "Easy"
                ? "bg-[var(--dark-pastel-green)]/15 text-[var(--dark-pastel-green)] border border-[var(--dark-pastel-green)]/30"
                : problem.difficulty === "Medium"
                ? "bg-[var(--orange-peel)]/15 text-[var(--orange-peel)] border border-[var(--orange-peel)]/30"
                : "bg-[var(--spanish-orange)]/15 text-[var(--spanish-orange)] border border-[var(--spanish-orange)]/40"
            }`}
          >
            {problem.difficulty}
          </span>

          {problem.topics?.map((t) => (
            <span
              key={t}
              className="
                px-2 py-[3px] text-xs rounded-md
                bg-[var(--raisin-black)]/60 border border-[var(--orange-peel)]/20
                text-[var(--white)]/70
              "
            >
              {t}
            </span>
          ))}
        </div>

        {/* Problem Statement */}
        <div
          className="
            bg-[var(--dark-slate-gray)]/70 border border-[var(--orange-peel)]/15
            rounded-2xl p-5 prose prose-invert max-w-none
          "
        >
          <ReactMarkdown>{problem.statement}</ReactMarkdown>
        </div>

        {/* 💡 Multi-level Hints with Show/Hide */}
        {problem.hints && problem.hints.length > 0 && (
          <div className="mt-5">
            {/* Revealed hints */}
            {problem.hints.slice(0, shownHints).map((hint, i) => (
              <div
                key={hint._id}
                className="
                  mt-3 p-4 rounded-xl border border-[var(--orange-peel)]/20
                  bg-[var(--raisin-black)]/60 text-[var(--white)]/85 text-sm
                  shadow-sm transition-all duration-300
                "
              >
                <h4 className="font-semibold text-[var(--orange-peel)] mb-1">
                  Hint {hint.level}:
                </h4>
                <ReactMarkdown>{hint.text}</ReactMarkdown>
              </div>
            ))}

            {/* Buttons */}
            <div className="flex gap-3 mt-4">
              {shownHints < problem.hints.length && (
                <button
                  onClick={showNextHint}
                  className="
                    text-sm font-medium px-4 py-2 rounded-md
                    bg-[var(--dark-slate-gray)]/60 border border-[var(--orange-peel)]/30
                    text-[var(--orange-peel)] hover:bg-[var(--orange-peel)]/10
                    transition-colors duration-200
                  "
                >
                  💡 Show Hint {shownHints + 1}
                </button>
              )}

              {shownHints > 0 && (
                <button
                  onClick={hideLastHint}
                  className="
                    text-sm font-medium px-4 py-2 rounded-md
                    bg-[var(--raisin-black)]/60 border border-[var(--alert-red)]/30
                    text-[var(--alert-red)] hover:bg-[var(--alert-red)]/10
                    transition-colors duration-200
                  "
                >
                  Hide Hint {shownHints}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* -------- Right Panel (Answer / Submissions) -------- */}
      <div className="w-full lg:w-1/2 flex flex-col bg-[var(--raisin-black)]">
        {/* Editor Section */}
        <div
          className="
            flex-1 p-6 border-b border-[var(--orange-peel)]/15
            bg-[var(--dark-slate-gray)]/50 backdrop-blur-md
          "
        >
          <h3 className="font-semibold text-[var(--white)] mb-3 text-lg">
            Your Solution
          </h3>

          {/* MCQ */}
          {problem.inputType === "mcq_single" && (
            <div className="space-y-2">
              {problem.options?.map((o) => (
                <label
                  key={o.id}
                  className="
                    block cursor-pointer rounded-lg border border-[var(--orange-peel)]/20
                    hover:border-[var(--orange-peel)]/40
                    hover:bg-[var(--dark-slate-gray)]/60
                    p-2 transition
                  "
                >
                  <input
                    type="radio"
                    name="opt"
                    value={o.id}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="accent-[var(--orange-peel)]"
                  />
                  <span className="ml-2 text-[var(--white)]/85">
                    {o.id}. {o.text}
                  </span>
                </label>
              ))}
            </div>
          )}

          {/* Numeric Input */}
          {problem.inputType === "numeric" && (
            <input
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter numeric answer..."
              className="
                bg-[var(--dark-slate-gray)]/60
                border border-[var(--orange-peel)]/20
                rounded-lg w-full px-3 py-2 text-[var(--white)]
                focus:outline-none focus:border-[var(--orange-peel)]
              "
            />
          )}

          {/* Manual Input */}
          {problem.inputType === "manual" && (
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Write your solution here..."
              className="
                bg-[var(--dark-slate-gray)]/60
                border border-[var(--orange-peel)]/20
                rounded-lg w-full p-3 text-[var(--white)] font-mono text-sm
                focus:outline-none focus:border-[var(--orange-peel)]
                h-64 resize-none
              "
            />
          )}

          {/* Submit Button + Feedback */}
          <div className="mt-5 flex items-center gap-3">
            <button
              onClick={submit}
              className="
                px-5 py-2.5 bg-[var(--spanish-orange)]
                hover:bg-[var(--orange-peel)]
                text-white rounded-lg font-medium
                shadow-[0_0_10px_rgba(233,111,30,0.3)]
                transition-all duration-200
              "
            >
              Submit
            </button>
            {msg && (
              <span
                className={`text-sm font-medium ${
                  msg.type === "error"
                    ? "text-[var(--alert-red)]"
                    : "text-[var(--dark-pastel-green)]"
                }`}
              >
                {msg.text}
              </span>
            )}
          </div>
        </div>

        {/* Submissions Section */}
        <div
          className="
            p-6 flex-1 overflow-y-auto
            bg-[var(--dark-slate-gray)]/40 border-t border-[var(--orange-peel)]/15
          "
        >
          <h3 className="text-lg font-semibold mb-3 text-[var(--white)]">
            Your Submissions
          </h3>
          <div className="space-y-3">
            {submissions.filter((s) => s.problemId === id).length === 0 && (
              <p className="text-[var(--white)]/60 text-sm">
                No submissions yet.
              </p>
            )}
            {submissions
              .filter((s) => s.problemId === id)
              .map((s) => (
                <div
                  key={s._id}
                  className="
                    bg-[var(--dark-slate-gray)]/60
                    p-4 rounded-xl border border-[var(--orange-peel)]/20
                    flex justify-between items-center
                    hover:bg-[var(--dark-slate-gray)]/70 transition
                  "
                >
                  <div>
                    <div className="text-sm font-medium">
                      Result:{" "}
                      <span
                        className={
                          s.isCorrect
                            ? "text-[var(--dark-pastel-green)]"
                            : "text-[var(--orange-peel)]"
                        }
                      >
                        {s.isCorrect
                          ? "Accepted"
                          : s.manual
                          ? "Pending Review"
                          : "Wrong Answer"}
                      </span>
                    </div>
                    <div className="text-xs text-[var(--white)]/50">
                      {new Date(s.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="text-xs text-[var(--white)]/60">
                    {s.score ?? 0} pts
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
