import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function AdminCreateProblem() {
  const [title, setTitle] = useState('');
  const [statement, setStatement] = useState('');
  const [topics, setTopics] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title,
        statement,
        topics: topics.split(',').map((s) => s.trim()),
        difficulty,
      };
      await api.post('/problems', payload);
      alert('Created');
      navigate('/');
    } catch (err) {
      alert(err?.response?.data?.message || 'Create problem failed');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl p-8 mt-8 shadow-sm">
      <h1 className="text-2xl font-semibold text-gray-100 mb-6 tracking-tight">
        🧩 Create Problem (Admin)
      </h1>

      <form onSubmit={submit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm text-gray-400 mb-1">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter problem title"
            className="w-full bg-[#2A2A2A] text-gray-200 placeholder-gray-500 border border-[#3A3A3A] rounded-md px-3 py-2 focus:outline-none focus:border-[#EAB308] transition"
          />
        </div>

        {/* Statement */}
        <div>
          <label className="block text-sm text-gray-400 mb-1">Statement</label>
          <textarea
            value={statement}
            onChange={(e) => setStatement(e.target.value)}
            rows={8}
            placeholder="Problem statement (Markdown allowed)"
            className="w-full bg-[#2A2A2A] text-gray-200 placeholder-gray-500 border border-[#3A3A3A] rounded-md px-3 py-2 focus:outline-none focus:border-[#EAB308] transition"
          />
        </div>

        {/* Topics */}
        <div>
          <label className="block text-sm text-gray-400 mb-1">Topics</label>
          <input
            value={topics}
            onChange={(e) => setTopics(e.target.value)}
            placeholder="Comma separated topics (e.g., Array, Greedy)"
            className="w-full bg-[#2A2A2A] text-gray-200 placeholder-gray-500 border border-[#3A3A3A] rounded-md px-3 py-2 focus:outline-none focus:border-[#EAB308] transition"
          />
        </div>

        {/* Difficulty */}
        <div>
          <label className="block text-sm text-gray-400 mb-1">Difficulty</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full bg-[#2A2A2A] text-gray-200 border border-[#3A3A3A] rounded-md px-3 py-2 focus:outline-none focus:border-[#EAB308] transition"
          >
            <option value="easy">Easy 🟢</option>
            <option value="medium">Medium 🟡</option>
            <option value="hard">Hard 🔴</option>
          </select>
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button
            type="submit"
            className="px-5 py-2.5 bg-[#EAB308] text-black font-medium rounded-md hover:bg-[#FACC15] transition"
          >
            Create Problem
          </button>
        </div>
      </form>
    </div>
  );
}
