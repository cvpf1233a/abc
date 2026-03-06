import { useState } from 'react';
import api from '../api';

export default function AuthPage({ t, onAuth }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    const endpoint = isSignUp ? '/auth/signup' : '/auth/login';
    const { data } = await api.post(endpoint, form);
    if (data.token) onAuth(data);
    setMessage(data.message || 'Success');
  };

  const resetPassword = async () => {
    const { data } = await api.post('/auth/reset-password', { email: form.email });
    setMessage(data.message);
  };

  return (
    <main className="container card">
      <h2>{isSignUp ? t.signup : t.login}</h2>
      <form onSubmit={submit} className="stack">
        {isSignUp && <input placeholder="Full name" onChange={(e) => setForm({ ...form, name: e.target.value })} required />}
        <input type="email" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <button type="submit">{isSignUp ? t.signup : t.login}</button>
      </form>
      <button onClick={() => setIsSignUp(!isSignUp)}>{isSignUp ? t.login : t.signup}</button>
      <button onClick={resetPassword}>Password reset</button>
      {message && <p>{message}</p>}
    </main>
  );
}
