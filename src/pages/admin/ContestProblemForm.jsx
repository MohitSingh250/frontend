import { useState } from "react";
import { Save, X, Plus, Trash2 } from "lucide-react";

export default function ContestProblemForm({ initialData, onSubmit, onCancel, loading }) {
  const [formData, setFormData] = useState({
    title: "",
    statement: "",
    inputType: "mcq_single",
    options: initialData?.options || [{ id: "A", text: "" }, { id: "B", text: "" }, { id: "C", text: "" }, { id: "D", text: "" }],
    correctAnswer: "",
    points: 1,
    difficulty: "medium",
    solution: "",
    numericTolerance: 0.001,
    ...initialData
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index].text = value;
    setFormData(prev => ({ ...prev, options: newOptions }));
  };

  const addOption = () => {
    const newOptions = [...formData.options];
    newOptions.push({
      id: String.fromCharCode(65 + newOptions.length),
      text: "",
    });
    setFormData(prev => ({ ...prev, options: newOptions }));
  };

  const removeOption = (index) => {
    const newOptions = [...formData.options];
    newOptions.splice(index, 1);
    // Re-index
    newOptions.forEach((opt, i) => {
      opt.id = String.fromCharCode(65 + i);
    });
    setFormData(prev => ({ ...prev, options: newOptions }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-[#282828] p-8 rounded-2xl border border-[#3E3E3E]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-[#8A8A8A] uppercase">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-[#1A1A1A] border border-[#3E3E3E] text-white focus:border-[#FFA217] outline-none transition-all"
            placeholder="Problem Title"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#8A8A8A] uppercase">Points</label>
            <input
              type="number"
              name="points"
              value={formData.points}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#1A1A1A] border border-[#3E3E3E] text-white focus:border-[#FFA217] outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#8A8A8A] uppercase">Difficulty</label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-[#1A1A1A] border border-[#3E3E3E] text-white focus:border-[#FFA217] outline-none transition-all"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-[#8A8A8A] uppercase">Problem Statement (Markdown)</label>
        <textarea
          name="statement"
          value={formData.statement}
          onChange={handleChange}
          required
          rows={6}
          className="w-full px-4 py-3 rounded-xl bg-[#1A1A1A] border border-[#3E3E3E] text-white focus:border-[#FFA217] outline-none transition-all font-mono"
          placeholder="Describe the problem..."
        />
      </div>

      <div className="space-y-6 border-t border-[#3E3E3E] pt-8">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Answer Configuration</h3>
          <div className="flex items-center gap-4">
            <label className="text-sm font-bold text-[#8A8A8A] uppercase">Input Type</label>
            <select
              name="inputType"
              value={formData.inputType}
              onChange={handleChange}
              className="px-4 py-2 rounded-lg bg-[#1A1A1A] border border-[#3E3E3E] text-white focus:border-[#FFA217] outline-none transition-all text-sm"
            >
              <option value="mcq_single">MCQ (Single Correct)</option>
              <option value="numeric">Numeric</option>
              <option value="manual">Manual Grading</option>
              <option value="expression">Expression</option>
            </select>
          </div>
        </div>

        {formData.inputType === "mcq_single" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#8A8A8A] uppercase">Options</label>
              <button
                type="button"
                onClick={addOption}
                className="text-xs font-bold text-[#FFA217] hover:underline flex items-center gap-1"
              >
                <Plus size={14} /> Add Option
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.options.map((opt, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#3E3E3E] flex items-center justify-center font-bold text-white shrink-0">
                    {opt.id}
                  </div>
                  <input
                    type="text"
                    value={opt.text}
                    onChange={(e) => handleOptionChange(idx, e.target.value)}
                    className="flex-1 px-4 py-2 rounded-xl bg-[#1A1A1A] border border-[#3E3E3E] text-white focus:border-[#FFA217] outline-none transition-all"
                    placeholder={`Option ${opt.id}`}
                  />
                  <input 
                    type="radio" 
                    name="correctAnswer" 
                    value={opt.id}
                    checked={formData.correctAnswer === opt.id}
                    onChange={handleChange}
                    className="w-5 h-5 accent-[#FFA217]"
                  />
                  <button 
                    type="button"
                    onClick={() => removeOption(idx)}
                    className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {formData.inputType === "numeric" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#8A8A8A] uppercase">Correct Numeric Value</label>
              <input
                type="text"
                name="correctAnswer"
                value={formData.correctAnswer}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-[#1A1A1A] border border-[#3E3E3E] text-white focus:border-[#FFA217] outline-none transition-all"
                placeholder="e.g. 42.5"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#8A8A8A] uppercase">Tolerance (+/-)</label>
              <input
                type="number"
                step="any"
                name="numericTolerance"
                value={formData.numericTolerance}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-[#1A1A1A] border border-[#3E3E3E] text-white focus:border-[#FFA217] outline-none transition-all"
                placeholder="0.001"
              />
            </div>
          </div>
        )}

        {(formData.inputType === "manual" || formData.inputType === "expression") && (
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#8A8A8A] uppercase">Correct Answer / Pattern</label>
            <input
              type="text"
              name="correctAnswer"
              value={formData.correctAnswer}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-[#1A1A1A] border border-[#3E3E3E] text-white focus:border-[#FFA217] outline-none transition-all"
              placeholder={formData.inputType === 'expression' ? "e.g. x^2 + 2x + 1" : "Expected answer description"}
            />
          </div>
        )}
      </div>

      <div className="space-y-2 border-t border-[#3E3E3E] pt-8">
        <label className="text-sm font-bold text-[#8A8A8A] uppercase">Solution / Editorial (Markdown)</label>
        <textarea
          name="solution"
          value={formData.solution}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 rounded-xl bg-[#1A1A1A] border border-[#3E3E3E] text-white focus:border-[#FFA217] outline-none transition-all font-mono"
          placeholder="Explain the solution..."
        />
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 rounded-xl bg-[#3E3E3E] text-white font-bold hover:bg-[#4E4E4E] transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3 rounded-xl bg-[#FFA217] text-black font-bold hover:bg-[#ffb347] transition-all shadow-lg shadow-orange-500/20 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Problem"}
        </button>
      </div>
    </form>
  );
}
