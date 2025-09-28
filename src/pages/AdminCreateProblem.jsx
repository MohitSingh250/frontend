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
        title, statement, topics: topics.split(',').map(s=>s.trim()), difficulty
      };
      await api.post('/problems', payload);
      alert('Created');
      navigate('/');
    } catch (err) {
      alert(err?.response?.data?.message || 'Create problem failed');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Problem (Admin)</h1>
      <form onSubmit={submit} className="space-y-3">
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="w-full border p-2" />
        <textarea value={statement} onChange={e=>setStatement(e.target.value)} rows={8} className="w-full border p-2" placeholder="Statement (Markdown allowed)"/>
        <input value={topics} onChange={e=>setTopics(e.target.value)} placeholder="topics comma separated" className="w-full border p-2" />
        <select value={difficulty} onChange={e=>setDifficulty(e.target.value)} className="border p-2">
          <option value="easy">easy</option>
          <option value="medium">medium</option>
          <option value="hard">hard</option>
        </select>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded">Create</button>
      </form>
    </div>
  );
}
