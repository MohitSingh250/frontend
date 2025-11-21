import { useState } from "react";
import api from "../api";

export default function CreatePracticeProblem() {
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    title: "",
    statement: "",
    topics: [],
    tags: [],
    difficulty: "medium",
    inputType: "mcq_single",
    options: [],
    correctAnswer: "",
    numericTolerance: 0.001,
    points: 1,
    badges: [],
    sources: [],
    hints: [],
    solution: "",
  });

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

  const addHint = () => {
    const updated = [...form.hints];
    updated.push({ level: updated.length + 1, text: "" });
    setForm({ ...form, hints: updated });
  };

  const submit = async () => {
    try {
      await api.post("/problems/create-problem", form);
      setMessage("Practice problem created!");

      setForm({
        title: "",
        statement: "",
        topics: [],
        tags: [],
        difficulty: "medium",
        inputType: "mcq_single",
        options: [],
        correctAnswer: "",
        numericTolerance: 0.001,
        points: 1,
        badges: [],
        sources: [],
        hints: [],
        solution: "",
      });
    } catch (err) {
      setMessage(err.response?.data?.message || "Error creating problem.");
    }
  };

  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-2xl bg-white shadow-lg p-8 rounded-lg space-y-6">

        <h1 className="text-3xl font-bold text-center">Create Practice Problem</h1>

        <input
          className="border p-3 w-full rounded"
          name="title"
          value={form.title}
          placeholder="Title"
          onChange={handleChange}
        />

        <textarea
          className="border p-3 w-full rounded"
          name="statement"
          rows={4}
          value={form.statement}
          placeholder="Statement"
          onChange={handleChange}
        />

        <input
          className="border p-3 w-full rounded"
          name="topics"
          placeholder="Topics (comma separated)"
          value={form.topics.join(",")}
          onChange={(e) =>
            setForm({ ...form, topics: e.target.value.split(",") })
          }
        />

        <input
          className="border p-3 w-full rounded"
          name="tags"
          placeholder="Tags (comma separated)"
          value={form.tags.join(",")}
          onChange={(e) =>
            setForm({ ...form, tags: e.target.value.split(",") })
          }
        />

        <input
          className="border p-3 w-full rounded"
          name="badges"
          placeholder="Badges (comma separated)"
          value={form.badges.join(",")}
          onChange={(e) =>
            setForm({ ...form, badges: e.target.value.split(",") })
          }
        />

        <input
          className="border p-3 w-full rounded"
          name="sources"
          placeholder="Sources (comma separated)"
          value={form.sources.join(",")}
          onChange={(e) =>
            setForm({ ...form, sources: e.target.value.split(",") })
          }
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

        <div className="space-y-3">
          {form.hints.map((hint, i) => (
            <input
              key={i}
              className="border p-3 w-full rounded"
              value={form.hints[i].text}
              placeholder={`Hint Level ${hint.level}`}
              onChange={(e) => {
                const updated = [...form.hints];
                updated[i].text = e.target.value;
                setForm({ ...form, hints: updated });
              }}
            />
          ))}

          <button
            onClick={addHint}
            className="bg-gray-700 text-white px-4 py-2 rounded w-full"
          >
            Add Hint
          </button>
        </div>

        <textarea
          className="border p-3 w-full rounded"
          name="solution"
          rows={3}
          value={form.solution}
          placeholder="Solution"
          onChange={handleChange}
        />

        <button
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700"
          onClick={submit}
        >
          Create Problem
        </button>

        {message && (
          <p className="text-center text-green-600 font-semibold">{message}</p>
        )}
      </div>
    </div>
  );
}
