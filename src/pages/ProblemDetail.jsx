import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import { AuthContext } from '../context/AuthContext';
import ReactMarkdown from 'react-markdown';

export default function ProblemDetail() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [problem, setProblem] = useState(null);
  const [answer, setAnswer] = useState('');
  const [msg, setMsg] = useState(null);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    api.get(`/problems/${id}`).then(r => setProblem(r.data)).catch(() => {});
    if (user) {
      api.get(`/problems/${id}/me`).catch(()=>{});
      api.get(`/submissions/user/${user._id}`).then(r => setSubmissions(r.data)).catch(()=>{});
    }
  }, [id, user]);

  if (!problem) return <div className="text-gray-300">Loading...</div>;

  const submit = async () => {
    setMsg(null);
    try {
      const res = await api.post('/submissions', { problemId: id, answer });
      setMsg({ type: 'success', text: res.data.message || (res.data.correct ? 'Correct' : 'Wrong') });
      if (user) { const s = await api.get(`/submissions/user/${user._id}`); setSubmissions(s.data); }
    } catch (err) {
      setMsg({ type: 'error', text: err?.response?.data?.message || 'Submit failed' });
    }
  };

  return (
    <div className="space-y-6 bg-[#0f0f0f] text-gray-200 min-h-screen p-6">
      {/* Title */}
      <h1 className="text-2xl font-bold text-white">{problem.title}</h1>

      {/* Difficulty + tags */}
      <div className="text-sm text-gray-400 flex items-center flex-wrap gap-2">
        <span
          className={`px-2 py-1 rounded text-xs font-medium
            ${problem.difficulty === 'Easy' ? 'bg-green-800 text-green-300' :
              problem.difficulty === 'Medium' ? 'bg-yellow-700 text-yellow-300' :
              'bg-red-800 text-red-300'}`}
        >
          {problem.difficulty}
        </span>
        {problem.topics?.map(t => (
          <span
            key={t}
            className="px-2 py-1 text-xs rounded bg-[#1f1f1f] border border-[#2f2f2f] text-gray-300"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Problem Statement */}
      <div className="bg-[#1a1a1a] p-5 rounded-xl border border-[#2f2f2f] shadow">
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown>{problem.statement}</ReactMarkdown>
        </div>
      </div>

      {/* Submit Section */}
      <div className="bg-[#1a1a1a] p-5 rounded-xl border border-[#2f2f2f] shadow">
        <h3 className="font-semibold mb-3 text-white">Submit</h3>

        {problem.inputType === 'mcq_single' && (
          <div className="space-y-2">
            {problem.options?.map(o => (
              <label
                key={o.id}
                className="block cursor-pointer hover:bg-[#2a2a2a] p-2 rounded transition"
              >
                <input
                  type="radio"
                  name="opt"
                  value={o.id}
                  onChange={e => setAnswer(e.target.value)}
                  className="accent-indigo-500"
                />
                <span className="ml-2">{o.id}. {o.text}</span>
              </label>
            ))}
          </div>
        )}

        {problem.inputType === 'numeric' && (
          <input
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            placeholder="Enter numeric answer"
            className="bg-[#0f0f0f] border border-[#2f2f2f] rounded w-full px-3 py-2 text-gray-200 focus:outline-none focus:border-indigo-500"
          />
        )}

        {problem.inputType === 'manual' && (
          <textarea
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            className="bg-[#0f0f0f] border border-[#2f2f2f] rounded w-full p-3 text-gray-200 focus:outline-none focus:border-indigo-500"
            rows={6}
          />
        )}

        <div className="mt-4 flex items-center">
          <button
            onClick={submit}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition"
          >
            Submit
          </button>
          {msg && (
            <span
              className={`ml-4 text-sm font-medium ${
                msg.type === 'error' ? 'text-red-400' : 'text-green-400'
              }`}
            >
              {msg.text}
            </span>
          )}
        </div>
      </div>

      {/* Submissions */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-white">Your submissions</h3>
        <div className="space-y-3">
          {submissions.filter(s => s.problemId === id).map(s => (
            <div
              key={s._id}
              className="bg-[#1a1a1a] p-4 rounded-xl border border-[#2f2f2f] shadow flex justify-between items-center"
            >
              <div>
                <div className="text-sm font-medium">
                  Verdict:{' '}
                  <span className={s.isCorrect ? 'text-green-400' : 'text-yellow-400'}>
                    {s.isCorrect ? 'Accepted' : s.verdict || 'Pending'}
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  At: {new Date(s.createdAt).toLocaleString()}
                </div>
              </div>
              <div className="text-xs text-gray-400">{s.score ?? 0} pts</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
