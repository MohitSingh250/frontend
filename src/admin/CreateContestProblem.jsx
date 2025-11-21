import { useEffect, useState } from "react";
import api from "../api";

export default function CreateContestProblem() {
  const [contests, setContests] = useState([]);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    contestId: "",
    title: "",
    statement: "",
    inputType: "mcq_single",
    options: [],
    correctAnswer: "",
    numericTolerance: 0.001,
    points: 1,
    difficulty: "medium",
    solution: "",
  });

  useEffect(() => {
    api.get("/contests").then((res) => setContests(res.data.contests));
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const addOption = () => {
    const updated = [...form.options];
    updated.push({
      id: String.fromCharCode(65 + updated.length),
      text: "",
    });
    setForm({ ...form, options: updated });
  };

  const submit = async () => {
    try {
      await api.post(`/contests/${form.contestId}/problems`, form);
      setMessage("Contest problem created!");
      setForm({
        contestId: "",
        title: "",
        statement: "",
        inputType: "mcq_single",
        options: [],
        correctAnswer: "",
        numericTolerance: 0.001,
        points: 1,
        difficulty: "medium",
        solution: "",
      });
    } catch (err) {
      setMessage(err.response?.data?.message || "Error adding problem.");
    }
  };

  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-2xl bg-white shadow-lg p-8 rounded-lg space-y-6">

        <h1 className="text-3xl font-bold text-center">Add Contest Problem</h1>

        <select
          className="border p-3 w-full rounded"
          name="contestId"
          value={form.contestId}
          onChange={handleChange}
        >
          <option value="">Select Contest</option>
          {contests.map((c) => (
            <option key={c._id} value={c._id}>
              {c.title} (#{c.contestNumber})
            </option>
          ))}
        </select>

        <input
          className="border p-3 w-full rounded"
          name="title"
          value={form.title}
          placeholder="Problem Title"
          onChange={handleChange}
        />

        <textarea
          className="border p-3 w-full rounded"
          name="statement"
          rows={4}
          value={form.statement}
          placeholder="Problem Statement"
          onChange={handleChange}
        />

        <select
          className="border p-3 w-full rounded"
          name="inputType"
          value={form.inputType}
          onChange={handleChange}
        >
          <option value="mcq_single">MCQ</option>
          <option value="numeric">Numeric</option>
          <option value="manual">Manual</option>
          <option value="expression">Expression</option>
        </select>

        {form.inputType === "mcq_single" && (
          <div className="space-y-3">
            {form.options.map((opt, i) => (
              <input
                key={i}
                className="border p-3 w-full rounded"
                placeholder={`Option ${opt.id}`}
                value={opt.text}
                onChange={(e) => {
                  const updated = [...form.options];
                  updated[i].text = e.target.value;
                  setForm({ ...form, options: updated });
                }}
              />
            ))}
            <button
              onClick={addOption}
              className="bg-gray-900 text-white px-4 py-2 rounded w-full"
            >
              Add Option
            </button>
          </div>
        )}

        <input
          className="border p-3 w-full rounded"
          name="correctAnswer"
          value={form.correctAnswer}
          placeholder="Correct Answer"
          onChange={handleChange}
        />

        {form.inputType === "numeric" && (
          <input
            className="border p-3 w-full rounded"
            name="numericTolerance"
            type="number"
            value={form.numericTolerance}
            placeholder="Numeric Tolerance"
            onChange={handleChange}
          />
        )}

        <input
          className="border p-3 w-full rounded"
          name="points"
          type="number"
          value={form.points}
          placeholder="Points"
          onChange={handleChange}
        />

        <select
          className="border p-3 w-full rounded"
          name="difficulty"
          value={form.difficulty}
          onChange={handleChange}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <textarea
          className="border p-3 w-full rounded"
          name="solution"
          rows={3}
          value={form.solution}
          placeholder="Solution (optional)"
          onChange={handleChange}
        />

        <button
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700"
          onClick={submit}
        >
          Add Problem
        </button>

        {message && (
          <p className="text-center text-green-600 font-semibold">{message}</p>
        )}
      </div>
    </div>
  );
}
