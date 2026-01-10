import { useState, useEffect } from "react";
import { Save, X, Plus, Trash2 } from "lucide-react";

export default function ProblemForm({ initialData, onSubmit, onCancel, loading }) {
  const [formData, setFormData] = useState({
    title: "",
    statement: "",
    subject: "Physics",
    difficulty: "medium",
    topics: [],
    tags: [],
    inputType: "mcq_single",
    options: [{ id: "A", text: "" }, { id: "B", text: "" }, { id: "C", text: "" }, { id: "D", text: "" }],
    correctAnswer: "",
    points: 1,
    solution: "",
    ...initialData
  });

  const [tagInput, setTagInput] = useState("");
  const [topicInput, setTopicInput] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index].text = value;
    setFormData(prev => ({ ...prev, options: newOptions }));
  };

  const addTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
      }
      setTagInput("");
    }
  };

  const removeTag = (tag) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
  };

  const addTopic = (e) => {
    if (e.key === 'Enter' && topicInput.trim()) {
      e.preventDefault();
      if (!formData.topics.includes(topicInput.trim())) {
        setFormData(prev => ({ ...prev, topics: [...prev.topics, topicInput.trim()] }));
      }
      setTopicInput("");
    }
  };

  const removeTopic = (topic) => {
    setFormData(prev => ({ ...prev, topics: prev.topics.filter(t => t !== topic) }));
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
            <label className="text-sm font-bold text-[#8A8A8A] uppercase">Subject</label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-[#1A1A1A] border border-[#3E3E3E] text-white focus:border-[#FFA217] outline-none transition-all"
            >
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Maths">Maths</option>
            </select>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-[#8A8A8A] uppercase">Topics</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.topics.map(topic => (
              <span key={topic} className="px-3 py-1 rounded-full bg-[#FFA217]/10 text-[#FFA217] text-xs font-bold border border-[#FFA217]/20 flex items-center gap-2">
                {topic}
                <X size={14} className="cursor-pointer" onClick={() => removeTopic(topic)} />
              </span>
            ))}
          </div>
          <input
            type="text"
            value={topicInput}
            onChange={(e) => setTopicInput(e.target.value)}
            onKeyDown={addTopic}
            className="w-full px-4 py-3 rounded-xl bg-[#1A1A1A] border border-[#3E3E3E] text-white focus:border-[#FFA217] outline-none transition-all"
            placeholder="Type topic and press Enter"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-[#8A8A8A] uppercase">Tags</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.tags.map(tag => (
              <span key={tag} className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-bold border border-blue-500/20 flex items-center gap-2">
                {tag}
                <X size={14} className="cursor-pointer" onClick={() => removeTag(tag)} />
              </span>
            ))}
          </div>
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={addTag}
            className="w-full px-4 py-3 rounded-xl bg-[#1A1A1A] border border-[#3E3E3E] text-white focus:border-[#FFA217] outline-none transition-all"
            placeholder="Type tag and press Enter"
          />
        </div>
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
            </select>
          </div>
        </div>

        {formData.inputType === "mcq_single" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.options.map((opt, idx) => (
              <div key={opt.id} className="flex items-center gap-3">
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
              </div>
            ))}
          </div>
        )}

        {formData.inputType === "numeric" && (
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#8A8A8A] uppercase">Correct Numeric Value</label>
            <input
              type="number"
              step="any"
              name="correctAnswer"
              value={formData.correctAnswer}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-[#1A1A1A] border border-[#3E3E3E] text-white focus:border-[#FFA217] outline-none transition-all"
              placeholder="e.g. 42.5"
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
