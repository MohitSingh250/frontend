import { useState } from "react";
import { Save, X, Calendar, Clock } from "lucide-react";

export default function ContestForm({ initialData, onSubmit, onCancel, loading }) {
  const [formData, setFormData] = useState({
    title: "",
    contestNumber: "",
    type: "weekly",
    startTime: "",
    endTime: "",
    difficulty: "medium",
    bannerImage: "",
    ...initialData,
    // Format dates for input[type="datetime-local"]
    startTime: initialData?.startTime ? new Date(initialData.startTime).toISOString().slice(0, 16) : "",
    endTime: initialData?.endTime ? new Date(initialData.endTime).toISOString().slice(0, 16) : "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-[#282828] p-8 rounded-2xl border border-[#3E3E3E]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-[#8A8A8A] uppercase">Contest Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-[#1A1A1A] border border-[#3E3E3E] text-white focus:border-[#FFA217] outline-none transition-all"
            placeholder="e.g. Weekly Contest 42"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-[#8A8A8A] uppercase">Contest Number</label>
          <input
            type="number"
            name="contestNumber"
            value={formData.contestNumber}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-[#1A1A1A] border border-[#3E3E3E] text-white focus:border-[#FFA217] outline-none transition-all"
            placeholder="e.g. 42"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-[#8A8A8A] uppercase">Contest Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-[#1A1A1A] border border-[#3E3E3E] text-white focus:border-[#FFA217] outline-none transition-all"
          >
            <option value="weekly">Weekly</option>
            <option value="biweekly">Biweekly</option>
            <option value="mock-jee">Mock JEE</option>
            <option value="special">Special</option>
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
            <option value="jee-mains">JEE Mains</option>
            <option value="jee-advanced">JEE Advanced</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-[#8A8A8A] uppercase flex items-center gap-2">
            <Calendar size={14} /> Start Time
          </label>
          <input
            type="datetime-local"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-[#1A1A1A] border border-[#3E3E3E] text-white focus:border-[#FFA217] outline-none transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-[#8A8A8A] uppercase flex items-center gap-2">
            <Clock size={14} /> End Time
          </label>
          <input
            type="datetime-local"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-[#1A1A1A] border border-[#3E3E3E] text-white focus:border-[#FFA217] outline-none transition-all"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-[#8A8A8A] uppercase">Banner Image URL</label>
        <input
          type="text"
          name="bannerImage"
          value={formData.bannerImage}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-[#1A1A1A] border border-[#3E3E3E] text-white focus:border-[#FFA217] outline-none transition-all"
          placeholder="https://example.com/banner.jpg"
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
          {loading ? "Saving..." : "Save Contest"}
        </button>
      </div>
    </form>
  );
}
