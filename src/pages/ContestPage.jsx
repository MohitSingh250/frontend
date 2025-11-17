// Updated contest page with rich UI like ProblemDetail, minus hints and replacing submissions with navigator.

import React, { useEffect, useState } from "react";

export default function ContestPage() {
  const questions = [
    {
      id: 1,
      title: "Electrostatics Logic – Field Between Equal Charges",
      level: "Easy",
      topic: "Electrostatics",
      statement:
        "Two equal positive charges +Q are fixed at x = +a and x = −a. Find where the net electric field on the x-axis is zero.",
      options: ["At x = 0", "At x = ±a/2", "At x > a or x < −a", "No such point"],
    },
    {
      id: 1,
      title: "Electrostatics Logic – Field Between Equal Charges",
      level: "Easy",
      topic: "Electrostatics",
      statement:
        "Two equal positive charges +Q are fixed at x = +a and x = −a. Find where the net electric field on the x-axis is zero.",
      options: ["At x = 0", "At x = ±a/2", "At x > a or x < −a", "No such point"],
    },
    {
      id: 1,
      title: "Electrostatics Logic – Field Between Equal Charges",
      level: "Easy",
      topic: "Electrostatics",
      statement:
        "Two equal positive charges +Q are fixed at x = +a and x = −a. Find where the net electric field on the x-axis is zero.",
      options: ["At x = 0", "At x = ±a/2", "At x > a or x < −a", "No such point"],
    },
    {
      id: 1,
      title: "Electrostatics Logic – Field Between Equal Charges",
      level: "Easy",
      topic: "Electrostatics",
      statement:
        "Two equal positive charges +Q are fixed at x = +a and x = −a. Find where the net electric field on the x-axis is zero.",
      options: ["At x = 0", "At x = ±a/2", "At x > a or x < −a", "No such point"],
    },
  ];

  const totalQuestions = 10;
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [marked, setMarked] = useState({});
  const [timeLeft, setTimeLeft] = useState(45 * 60);

  useEffect(() => {
    const t = setInterval(() => setTimeLeft((s) => Math.max(s - 1, 0)), 1000);
    return () => clearInterval(t);
  }, []);

  const formatTime = (t) => `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[var(--raisin-black)] text-[var(--white)]">
      {/* LEFT PANEL */}
      <div className="w-full lg:w-1/2 border-r border-[var(--orange-peel)]/20 p-6 overflow-y-auto bg-[var(--dark-slate-gray)]/40 backdrop-blur-md">
        <h1 className="text-2xl font-bold mb-3">{questions[current].title}</h1>

        <div className="flex gap-2 mb-4 text-sm">
          <span className="px-2 py-[3px] rounded-md bg-[var(--dark-pastel-green)]/20 text-[var(--dark-pastel-green)] border border-[var(--dark-pastel-green)]/40 font-semibold text-xs">
            {questions[current].level}
          </span>
          <span className="px-2 py-[3px] rounded-md bg-[var(--orange-peel)]/20 text-[var(--orange-peel)] border border-[var(--orange-peel)]/30 text-xs">
            {questions[current].topic}
          </span>
        </div>

        <div className="bg-[var(--dark-slate-gray)]/70 border border-[var(--orange-peel)]/20 rounded-xl p-5 leading-relaxed text-[var(--white)]/90">
          {questions[current].statement}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full lg:w-1/2 flex flex-col bg-[var(--raisin-black)]">
        {/* ANSWER SECTION */}
        <div className="p-6 border-b border-[var(--orange-peel)]/20 bg-[var(--dark-slate-gray)]/40 backdrop-blur-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Your Solution</h3>
            <div className="font-bold text-red-400 text-xl">{formatTime(timeLeft)}</div>
          </div>

          <div className="space-y-3">
            {questions[current].options.map((opt, i) => (
              <label
                key={i}
                className={`block cursor-pointer rounded-lg border p-3 transition text-sm ${
                  answers[current] === i
                    ? "border-[var(--orange-peel)] bg-[var(--orange-peel)]/20 text-[var(--orange-peel)]"
                    : "border-[var(--orange-peel)]/20 hover:border-[var(--orange-peel)]/40 bg-[var(--dark-slate-gray)]/40"
                }`}
              >
                <input
                  type="radio"
                  name="opt"
                  value={i}
                  checked={answers[current] === i}
                  onChange={() => setAnswers({ ...answers, [current]: i })}
                  className="accent-[var(--orange-peel)] mr-2"
                />
                {opt}
              </label>
            ))}
          </div>

          <div className="mt-5 flex gap-3">
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium border transition ${
                marked[current]
                  ? "bg-purple-800/40 border-purple-500 text-purple-300"
                  : "bg-[var(--raisin-black)]/50 border-[var(--orange-peel)]/30 text-[var(--orange-peel)]"
              }`}
              onClick={() => setMarked({ ...marked, [current]: !marked[current] })}
            >
              {marked[current] ? "Unmark Review" : "Mark for Review"}
            </button>

            <button
              className="px-5 py-2 bg-[var(--spanish-orange)] hover:bg-[var(--orange-peel)] transition text-white rounded-md shadow"
              onClick={() => setCurrent((c) => Math.min(c + 1, totalQuestions - 1))}
            >
              Save & Next
            </button>
          </div>
        </div>

        {/* NAVIGATOR SECTION (REPLACES SUBMISSIONS) */}
        <div className="p-6 bg-[var(--dark-slate-gray)]/30 flex-1 overflow-y-auto">
          <h3 className="text-lg font-semibold mb-3">Question Navigator</h3>
          <div className="grid grid-cols-5 gap-3">
            {Array.from({ length: totalQuestions }).map((_, i) => {
              const isCurrent = current === i;
              const isAnswered = answers[i] !== undefined;
              const isMarked = marked[i];

              return (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`p-3 rounded-lg text-sm font-bold border transition ${
                    isCurrent
                      ? "bg-blue-500 border-blue-300 text-white"
                      : isAnswered
                      ? "bg-green-600/60 border-green-400 text-white"
                      : isMarked
                      ? "bg-purple-700/60 border-purple-400 text-white"
                      : "bg-[var(--raisin-black)]/60 border-[var(--orange-peel)]/30 text-[var(--white)]/70"
                  }`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>

          <button className="w-full mt-6 px-5 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold shadow">
            Submit Test
          </button>
        </div>
      </div>
    </div>
  );
}