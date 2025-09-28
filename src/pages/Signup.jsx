import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Signup() {
  const { signup } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      await signup(username, email, password);
    } catch (err) {
      alert(err?.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      <form onSubmit={submit} className="space-y-3">
        <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" className="w-full border p-2" />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full border p-2" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full border p-2" />
        <button className="px-4 py-2 bg-indigo-600 text-white rounded">Signup</button>
      </form>
    </div>
  );
}
