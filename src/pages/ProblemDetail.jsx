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
      api.get(`/problems/${id}/me`).then(r => {
      }).catch(()=>{});
      api.get(`/submissions/user/${user._id}`).then(r => setSubmissions(r.data)).catch(()=>{});
    }
  }, [id, user]);

  if (!problem) return <div>Loading...</div>;

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
    <div className="space-y-4">
      <h1 className="text-xl font-bold">{problem.title}</h1>
      <div className="text-sm text-gray-700">
        <span className="mr-3">Difficulty: {problem.difficulty}</span>
        {problem.topics?.map(t => <span key={t} className="mr-2 text-xs bg-gray-100 px-2 py-1 rounded">{t}</span>)}
      </div>

      <div className="bg-white p-4 rounded shadow">
        <ReactMarkdown>{problem.statement}</ReactMarkdown>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Submit</h3>

        {problem.inputType === 'mcq_single' && (
          <div className="space-y-2">
            {problem.options?.map(o => (
              <label key={o.id} className="block">
                <input type="radio" name="opt" value={o.id} onChange={e => setAnswer(e.target.value)} />
                <span className="ml-2">{o.id}. {o.text}</span>
              </label>
            ))}
          </div>
        )}

        {problem.inputType === 'numeric' && (
          <input value={answer} onChange={e => setAnswer(e.target.value)} placeholder="Enter numeric answer" className="border px-3 py-2 w-full" />
        )}

        {problem.inputType === 'manual' && (
          <textarea value={answer} onChange={e => setAnswer(e.target.value)} className="border w-full p-2" rows={6} />
        )}

        <div className="mt-3">
          <button onClick={submit} className="px-4 py-2 bg-indigo-600 text-white rounded">Submit</button>
          {msg && <span className={`ml-3 ${msg.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>{msg.text}</span>}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold">Your submissions</h3>
        <div className="space-y-2 mt-2">
          {submissions.filter(s => s.problemId === id).map(s => (
            <div key={s._id} className="bg-white p-3 rounded shadow-sm flex justify-between">
              <div>
                <div className="text-sm">Verdict: {s.isCorrect ? 'Accepted' : s.verdict || 'Pending'}</div>
                <div className="text-xs text-gray-500">At: {new Date(s.createdAt || s.createdAt).toLocaleString()}</div>
              </div>
              <div className="text-xs text-gray-600">{s.score ?? 0} pts</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
