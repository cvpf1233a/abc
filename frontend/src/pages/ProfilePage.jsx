import { useState } from 'react';
import api from '../api';

const fields = [
  'fullName', 'age', 'currentCountry', 'city', 'email', 'phoneNumber', 'profession', 'education', 'yearsOfExperience', 'previousCompanies', 'languages', 'skills', 'preferredJobPosition'
];

export default function ProfilePage({ t }) {
  const [form, setForm] = useState({});
  const [output, setOutput] = useState(null);

  const save = async (e) => {
    e.preventDefault();
    const { data } = await api.post('/profile', form);
    const ai = await api.post('/ai/generate-assets', form);
    setOutput({ profile: data.profile, ...ai.data });
  };

  return (
    <main className="container card">
      <h2>{t.profile.title}</h2>
      <form className="stack" onSubmit={save}>
        {fields.map((field) => (
          <input
            key={field}
            placeholder={field}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            required
          />
        ))}
        <button type="submit">{t.profile.generateCv}</button>
      </form>
      {output && (
        <section className="card nested">
          <h3>AI Output</h3>
          <p><strong>Job Match Score:</strong> {output.jobMatchScore}%</p>
          <pre>{JSON.stringify(output, null, 2)}</pre>
        </section>
      )}
    </main>
  );
}
