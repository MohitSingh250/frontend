import { useState, useEffect } from "react";
import api from "../api";
import { Calendar, Clock, Trophy, Image as ImageIcon, Save, AlertCircle } from "lucide-react";

export default function CreateContest() {
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [duration, setDuration] = useState(null);
  const [bannerPreview, setBannerPreview] = useState("");

  const [form, setForm] = useState({
    contestNumber: "",
    title: "",
    type: "weekly",
    difficulty: "medium",
    startTime: "",
    endTime: "",
    isVirtual: false,
    bannerImage: "",
  });

  const handleChange = (e) => {
    let { name, value, type, checked } = e.target;
    value = type === "checkbox" ? checked : value;

    setForm({ ...form, [name]: value });
  };

  // Live banner preview
  useEffect(() => {
    setBannerPreview(form.bannerImage);
  }, [form.bannerImage]);

  // Auto-duration calculation
  useEffect(() => {
    if (form.startTime && form.endTime) {
      const s = new Date(form.startTime);
      const e = new Date(form.endTime);

      const diffMs = e - s;
      if (diffMs > 0) {
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
        setDuration(`${hours}h ${minutes}m`);
      } else {
        setDuration("Invalid Range");
      }
    }
  }, [form.startTime, form.endTime]);

  const validateForm = () => {
    const e = {};

    if (!form.contestNumber) e.contestNumber = "Contest number is required.";
    if (!form.title) e.title = "Title is required.";
    if (!form.startTime) e.startTime = "Start time required.";
    if (!form.endTime) e.endTime = "End time required.";

    if (form.startTime && form.endTime) {
      if (new Date(form.endTime) <= new Date(form.startTime)) {
        e.time = "End time must be greater than start time.";
      }
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async () => {
    if (!validateForm()) return;

    try {
      await api.post("/contests", form);
      setMessage("🎉 Contest created successfully!");

      // Reset form
      setForm({
        contestNumber: "",
        title: "",
        type: "weekly",
        difficulty: "medium",
        startTime: "",
        endTime: "",
        isVirtual: false,
        bannerImage: "",
      });
      setErrors({});
      setDuration(null);
      setBannerPreview("");
      
      setTimeout(() => setMessage(""), 3000);

    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Error creating contest.");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* FORM COLUMN */}
      <div className="lg:col-span-2 bg-[#1e2022]/40 backdrop-blur-md border border-white/5 p-8 rounded-2xl shadow-xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Contest Details</h2>
            <p className="text-white/50 text-sm">Configure the basic settings for the new contest.</p>
          </div>
          <div className="p-3 rounded-xl bg-[var(--dark-pastel-green)]/10 text-[var(--dark-pastel-green)]">
            <Trophy className="w-6 h-6" />
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contest Number */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/60 uppercase tracking-wider">Contest Number</label>
              <input
                className={`w-full bg-black/20 border ${errors.contestNumber ? "border-red-500/50" : "border-white/10"} rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[var(--dark-pastel-green)]/50 transition-colors`}
                name="contestNumber"
                value={form.contestNumber}
                placeholder="e.g. 101"
                onChange={handleChange}
              />
              {errors.contestNumber && <p className="text-red-400 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.contestNumber}</p>}
            </div>

            {/* Title */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/60 uppercase tracking-wider">Title</label>
              <input
                className={`w-full bg-black/20 border ${errors.title ? "border-red-500/50" : "border-white/10"} rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[var(--dark-pastel-green)]/50 transition-colors`}
                name="title"
                value={form.title}
                placeholder="e.g. Weekly Contest 101"
                onChange={handleChange}
              />
              {errors.title && <p className="text-red-400 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.title}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Type */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/60 uppercase tracking-wider">Type</label>
              <select 
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--dark-pastel-green)]/50 transition-colors appearance-none"
                name="type" 
                value={form.type} 
                onChange={handleChange}
              >
                <option value="weekly">Weekly</option>
                <option value="biweekly">Biweekly</option>
                <option value="mock-jee">Mock JEE</option>
                <option value="special">Special</option>
              </select>
            </div>

            {/* Difficulty */}
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
                <option value="jee-mains">JEE Mains</option>
                <option value="jee-advanced">JEE Advanced</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Start Time */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/60 uppercase tracking-wider">Start Time</label>
              <input
                type="datetime-local"
                className={`w-full bg-black/20 border ${errors.startTime ? "border-red-500/50" : "border-white/10"} rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[var(--dark-pastel-green)]/50 transition-colors [color-scheme:dark]`}
                name="startTime"
                value={form.startTime}
                onChange={handleChange}
              />
              {errors.startTime && <p className="text-red-400 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.startTime}</p>}
            </div>

            {/* End Time */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/60 uppercase tracking-wider">End Time</label>
              <input
                type="datetime-local"
                className={`w-full bg-black/20 border ${errors.endTime ? "border-red-500/50" : "border-white/10"} rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[var(--dark-pastel-green)]/50 transition-colors [color-scheme:dark]`}
                name="endTime"
                value={form.endTime}
                onChange={handleChange}
              />
              {errors.endTime && <p className="text-red-400 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.endTime}</p>}
            </div>
          </div>

          {/* Banner Image */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-white/60 uppercase tracking-wider">Banner Image URL</label>
            <div className="relative">
              <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              <input
                className="w-full bg-black/20 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[var(--dark-pastel-green)]/50 transition-colors"
                name="bannerImage"
                value={form.bannerImage}
                placeholder="https://example.com/image.jpg"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Virtual Toggle */}
          <div className="flex items-center gap-3 pt-2">
            <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                <input 
                  type="checkbox" 
                  name="isVirtual" 
                  id="toggle" 
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                  checked={form.isVirtual}
                  onChange={handleChange}
                  style={{ right: form.isVirtual ? '0' : 'auto', left: form.isVirtual ? 'auto' : '0', borderColor: form.isVirtual ? '#2cbc5d' : '#ccc' }}
                />
                <label htmlFor="toggle" className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${form.isVirtual ? 'bg-[var(--dark-pastel-green)]' : 'bg-gray-600'}`}></label>
            </div>
            <label className="text-white font-medium cursor-pointer" onClick={() => setForm({...form, isVirtual: !form.isVirtual})}>
              Enable Virtual Participation
            </label>
          </div>

          {/* Submit Button */}
          <button
            onClick={submit}
            className="w-full mt-4 bg-[var(--dark-pastel-green)] hover:bg-[var(--dark-pastel-green)]/90 text-black p-4 rounded-xl font-bold shadow-[0_0_20px_rgba(44,188,93,0.3)] hover:shadow-[0_0_30px_rgba(44,188,93,0.5)] transition-all flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            Create Contest
          </button>

          {message && (
            <div className={`p-4 rounded-xl text-center font-bold ${message.includes("Error") ? "bg-red-500/10 text-red-400 border border-red-500/20" : "bg-green-500/10 text-green-400 border border-green-500/20"}`}>
              {message}
            </div>
          )}
        </div>
      </div>

      {/* PREVIEW COLUMN */}
      <div className="space-y-6">
        <h3 className="text-lg font-bold text-white/80">Live Preview</h3>
        
        {/* Card Preview */}
        <div className="relative group rounded-3xl overflow-hidden bg-[#1e2022] border border-white/10 shadow-2xl">
          <div className="h-56 overflow-hidden relative">
            {bannerPreview ? (
              <img src={bannerPreview} alt="Preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <ImageIcon className="w-12 h-12 text-white/10" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1e2022] to-transparent" />
            
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-bold text-white uppercase tracking-wider">
              {form.type}
            </div>
          </div>

          <div className="p-6 relative">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-white mb-1 line-clamp-1">{form.title || "Contest Title"}</h3>
              <div className="flex items-center gap-2 text-xs font-medium text-white/40 uppercase tracking-widest">
                <span>#{form.contestNumber || "000"}</span>
                <span>•</span>
                <span className={form.difficulty === 'hard' ? 'text-red-400' : form.difficulty === 'medium' ? 'text-yellow-400' : 'text-green-400'}>
                  {form.difficulty}
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm text-white/60">
                <Calendar className="w-4 h-4 text-[var(--dark-pastel-green)]" />
                <span>{form.startTime ? new Date(form.startTime).toLocaleDateString() : "Date"}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/60">
                <Clock className="w-4 h-4 text-[var(--dark-pastel-green)]" />
                <span>{duration || "Duration"}</span>
              </div>
            </div>

            <button className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm">
              View Details
            </button>
          </div>
        </div>

        {/* Info Box */}
        <div className="p-6 rounded-2xl bg-blue-500/10 border border-blue-500/20">
          <h4 className="text-blue-400 font-bold mb-2 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Tip
          </h4>
          <p className="text-sm text-blue-200/70 leading-relaxed">
            Ensure the banner image is high resolution (1200x600 recommended) for the best appearance on the contest list page.
          </p>
        </div>
      </div>
    </div>
  );
}
