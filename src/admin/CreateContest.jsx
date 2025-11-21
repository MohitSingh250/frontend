import { useState, useEffect } from "react";
import api from "../api";

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
        setDuration(`${hours} hrs ${minutes} mins`);
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

    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Error creating contest.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg p-8 rounded-xl mt-8 border border-gray-200">

      <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
        Create Contest
      </h1>

      {/* GRID FORM */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Contest Number */}
        <div>
          <label className="block text-gray-700 font-semibold">Contest Number *</label>
          <input
            className={`border p-3 rounded w-full ${errors.contestNumber && "border-red-500"}`}
            name="contestNumber"
            value={form.contestNumber}
            placeholder="Eg: 101"
            onChange={handleChange}
          />
          {errors.contestNumber && <p className="text-red-600 text-sm">{errors.contestNumber}</p>}
        </div>

        {/* Title */}
        <div>
          <label className="block text-gray-700 font-semibold">Title *</label>
          <input
            className={`border p-3 rounded w-full ${errors.title && "border-red-500"}`}
            name="title"
            value={form.title}
            placeholder="Weekly Contest 101"
            onChange={handleChange}
          />
          {errors.title && <p className="text-red-600 text-sm">{errors.title}</p>}
        </div>

        {/* Type */}
        <div>
          <label className="block text-gray-700 font-semibold">Contest Type</label>
          <select className="border p-3 rounded w-full" name="type" value={form.type} onChange={handleChange}>
            <option value="weekly">Weekly</option>
            <option value="biweekly">Biweekly</option>
            <option value="mock-jee">Mock JEE</option>
            <option value="special">Special</option>
          </select>
        </div>

        {/* Difficulty */}
        <div>
          <label className="block text-gray-700 font-semibold">Difficulty</label>
          <select className="border p-3 rounded w-full" name="difficulty" value={form.difficulty} onChange={handleChange}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
            <option value="jee-mains">JEE Mains</option>
            <option value="jee-advanced">JEE Advanced</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold">Start Time *</label>
          <input
            type="datetime-local"
            className={`border p-3 rounded w-full ${errors.startTime && "border-red-500"}`}
            name="startTime"
            value={form.startTime}
            onChange={handleChange}
          />
          {errors.startTime && <p className="text-red-600 text-sm">{errors.startTime}</p>}
        </div>

        {/* End Time */}
        <div>
          <label className="block text-gray-700 font-semibold">End Time *</label>
          <input
            type="datetime-local"
            className={`border p-3 rounded w-full ${errors.endTime && "border-red-500"}`}
            name="endTime"
            value={form.endTime}
            onChange={handleChange}
          />
          {errors.endTime && <p className="text-red-600 text-sm">{errors.endTime}</p>}
        </div>

        {/* Virtual Toggle */}
        <div className="flex items-center gap-3 mt-3">
          <input type="checkbox" name="isVirtual" checked={form.isVirtual} onChange={handleChange} />
          <label className="text-gray-700 font-semibold">Virtual Contest</label>
        </div>

        {/* Banner Image */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-gray-700 font-semibold">Banner Image URL</label>
          <input
            className="border p-3 rounded w-full"
            name="bannerImage"
            value={form.bannerImage}
            placeholder="https://image-link.jpg"
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Banner Image Preview */}
      {bannerPreview && (
        <div className="mt-6">
          <p className="text-gray-700 font-semibold mb-2">Preview:</p>
          <img src={bannerPreview} alt="banner" className="rounded-lg shadow-md max-h-48 object-cover" />
        </div>
      )}

      {/* Duration */}
      {duration && (
        <div className="mt-4 p-3 bg-gray-50 rounded border">
          <p className="text-gray-600 font-semibold">
            Contest Duration: <span className="text-blue-600">{duration}</span>
          </p>
        </div>
      )}

      {/* Submit */}
      <button
        onClick={submit}
        className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold shadow"
      >
        Create Contest
      </button>

      {/* Message */}
      {message && (
        <p className="text-center mt-4 text-lg font-semibold text-green-600">
          {message}
        </p>
      )}

    </div>
  );
}
