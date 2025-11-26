import { useState } from "react";
import api from "../api";
import { BookOpen, Save, Plus, Trash2, Tag, Hash, Award, Link as LinkIcon, HelpCircle } from "lucide-react";

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

  const removeOption = (index) => {
    const updated = [...form.options];
    updated.splice(index, 1);
    updated.forEach((opt, i) => {
      opt.id = String.fromCharCode(65 + i);
    });
    setForm({ ...form, options: updated });
  };

  const addHint = () => {
    const updated = [...form.hints];
    updated.push({ level: updated.length + 1, text: "" });
    setForm({ ...form, hints: updated });
  };

  const removeHint = (index) => {
    const updated = [...form.hints];
    updated.splice(index, 1);
    updated.forEach((h, i) => {
      h.level = i + 1;
    });
    setForm({ ...form, hints: updated });
  };

  const submit = async () => {
    try {
      await api.post("/problems/create-problem", form);
      setMessage("🎉 Practice problem created successfully!");

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
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Error creating problem.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-[#1e2022]/40 backdrop-blur-md border border-white/5 p-8 rounded-2xl shadow-xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Add Practice Problem</h2>
          <p className="text-white/50 text-sm">Create a standalone problem for the practice library.</p>
        </div>
        <div className="p-3 rounded-xl bg-[var(--dark-pastel-green)]/10 text-[var(--dark-pastel-green)]">
          <BookOpen className="w-6 h-6" />
        </div>
      </div>

      <div className="space-y-6">
        {/* Title & Difficulty */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-bold text-white/60 uppercase tracking-wider">Problem Title</label>
            <input
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[var(--dark-pastel-green)]/50 transition-colors"
              name="title"
              value={form.title}
              placeholder="e.g. Rotational Dynamics"
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-white/60 uppercase tracking-wider">Difficulty</label>
            <select
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--dark-pastel-green)]/50 transition-colors appearance-none"
              name="difficulty"
              value={form.difficulty}
              onChange={handleChange}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>

        {/* Statement */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-white/60 uppercase tracking-wider">Problem Statement (Markdown)</label>
          <textarea
            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[var(--dark-pastel-green)]/50 transition-colors min-h-[150px]"
            name="statement"
            value={form.statement}
            placeholder="Describe the problem here..."
            onChange={handleChange}
          />
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-white/60 uppercase tracking-wider flex items-center gap-2">
              <Hash className="w-3 h-3" /> Topics
            </label>
            <input
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[var(--dark-pastel-green)]/50 transition-colors"
              name="topics"
              placeholder="Mechanics, Kinematics..."
              value={form.topics.join(",")}
              onChange={(e) => setForm({ ...form, topics: e.target.value.split(",") })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-white/60 uppercase tracking-wider flex items-center gap-2">
              <Tag className="w-3 h-3" /> Tags
            </label>
            <input
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[var(--dark-pastel-green)]/50 transition-colors"
              name="tags"
              placeholder="Important, JEE 2024..."
              value={form.tags.join(",")}
              onChange={(e) => setForm({ ...form, tags: e.target.value.split(",") })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-white/60 uppercase tracking-wider flex items-center gap-2">
              <Award className="w-3 h-3" /> Badges
            </label>
            <input
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[var(--dark-pastel-green)]/50 transition-colors"
              name="badges"
              placeholder="Gold, New..."
              value={form.badges.join(",")}
              onChange={(e) => setForm({ ...form, badges: e.target.value.split(",") })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-white/60 uppercase tracking-wider flex items-center gap-2">
              <LinkIcon className="w-3 h-3" /> Sources
            </label>
            <input
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[var(--dark-pastel-green)]/50 transition-colors"
              name="sources"
              placeholder="HC Verma, Irodov..."
              value={form.sources.join(",")}
              onChange={(e) => setForm({ ...form, sources: e.target.value.split(",") })}
            />
          </div>
        </div>

        {/* Input Type & Points */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-white/60 uppercase tracking-wider">Input Type</label>
            <select
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--dark-pastel-green)]/50 transition-colors appearance-none"
              name="inputType"
              value={form.inputType}
              onChange={handleChange}
            >
              <option value="mcq_single">MCQ (Single Correct)</option>
              <option value="numeric">Numeric</option>
              <option value="manual">Manual Grading</option>
              <option value="expression">Expression</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-white/60 uppercase tracking-wider">Points</label>
            <input
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[var(--dark-pastel-green)]/50 transition-colors"
              name="points"
              type="number"
              value={form.points}
              placeholder="1"
              onChange={handleChange}
            />
          </div>
        </div>

        {/* MCQ Options */}
        {form.inputType === "mcq_single" && (
          <div className="space-y-4 p-6 rounded-xl bg-white/5 border border-white/5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-white/60 uppercase tracking-wider">Options</label>
              <button
                onClick={addOption}
                className="text-xs font-bold text-[var(--dark-pastel-green)] hover:underline flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> Add Option
              </button>
            </div>
            
            <div className="space-y-3">
              {form.options.map((opt, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center font-bold text-white/50 shrink-0">
                    {opt.id}
                  </div>
                  <input
                    className="flex-1 bg-black/20 border border-white/10 rounded-lg px-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[var(--dark-pastel-green)]/50 transition-colors"
                    placeholder={`Option ${opt.id} text`}
                    value={opt.text}
                    onChange={(e) => {
                      const updated = [...form.options];
                      updated[i].text = e.target.value;
                      setForm({ ...form, options: updated });
                    }}
                  />
                  <button 
                    onClick={() => removeOption(i)}
                    className="w-10 h-10 rounded-lg bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Correct Answer & Tolerance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-white/60 uppercase tracking-wider">Correct Answer</label>
            <input
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[var(--dark-pastel-green)]/50 transition-colors"
              name="correctAnswer"
              value={form.correctAnswer}
              placeholder={form.inputType === 'mcq_single' ? 'e.g. A' : 'e.g. 42'}
              onChange={handleChange}
            />
          </div>

          {form.inputType === "numeric" && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/60 uppercase tracking-wider">Tolerance (+/-)</label>
              <input
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[var(--dark-pastel-green)]/50 transition-colors"
                name="numericTolerance"
                type="number"
                value={form.numericTolerance}
                placeholder="0.001"
                onChange={handleChange}
              />
            </div>
          )}
        </div>

        {/* Hints */}
        <div className="space-y-4 p-6 rounded-xl bg-white/5 border border-white/5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-white/60 uppercase tracking-wider flex items-center gap-2">
              <HelpCircle className="w-3 h-3" /> Hints
            </label>
            <button
              onClick={addHint}
              className="text-xs font-bold text-[var(--dark-pastel-green)] hover:underline flex items-center gap-1"
            >
              <Plus className="w-3 h-3" /> Add Hint
            </button>
          </div>
          
          <div className="space-y-3">
            {form.hints.map((hint, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-20 h-10 rounded-lg bg-white/10 flex items-center justify-center font-bold text-white/50 text-xs shrink-0">
                  Level {hint.level}
                </div>
                <input
                  className="flex-1 bg-black/20 border border-white/10 rounded-lg px-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[var(--dark-pastel-green)]/50 transition-colors"
                  placeholder="Enter hint text..."
                  value={hint.text}
                  onChange={(e) => {
                    const updated = [...form.hints];
                    updated[i].text = e.target.value;
                    setForm({ ...form, hints: updated });
                  }}
                />
                <button 
                  onClick={() => removeHint(i)}
                  className="w-10 h-10 rounded-lg bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            {form.hints.length === 0 && (
              <div className="text-center py-4 text-white/30 text-sm italic">No hints added yet.</div>
            )}
          </div>
        </div>

        {/* Solution */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-white/60 uppercase tracking-wider">Solution / Explanation</label>
          <textarea
            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[var(--dark-pastel-green)]/50 transition-colors"
            name="solution"
            rows={3}
            value={form.solution}
            placeholder="Explain the solution..."
            onChange={handleChange}
          />
        </div>

        {/* Submit Button */}
        <button
          className="w-full mt-4 bg-[var(--dark-pastel-green)] hover:bg-[var(--dark-pastel-green)]/90 text-black p-4 rounded-xl font-bold shadow-[0_0_20px_rgba(44,188,93,0.3)] hover:shadow-[0_0_30px_rgba(44,188,93,0.5)] transition-all flex items-center justify-center gap-2"
          onClick={submit}
        >
          <Save className="w-5 h-5" />
          Create Practice Problem
        </button>

        {message && (
          <div className={`p-4 rounded-xl text-center font-bold ${message.includes("Error") ? "bg-red-500/10 text-red-400 border border-red-500/20" : "bg-green-500/10 text-green-400 border border-green-500/20"}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
