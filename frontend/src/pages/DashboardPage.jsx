import { useEffect, useState } from 'react';
import api from '../api';

export default function DashboardPage({ t }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/dashboard').then((res) => setData(res.data));
  }, []);

  if (!data) return <main className="container">Loading...</main>;

  const stats = [
    [t.dashboard.applicationsSent, data.applicationsSent],
    [t.dashboard.companiesContacted, data.companiesContacted],
    [t.dashboard.replies, data.repliesReceived],
    [t.dashboard.emailsOpened, data.emailsOpened],
    [t.dashboard.cvClicks, data.cvLinkClicks]
  ];

  return (
    <main className="container">
      <section className="card">
        <h2>{t.dashboard.title}</h2>
        <div className="stat-grid">
          {stats.map(([label, value]) => <article key={label}><h4>{label}</h4><p>{value}</p></article>)}
        </div>
      </section>

      <section className="card">
        <h3>Companies Contacted</h3>
        <table>
          <thead><tr><th>Name</th><th>Email</th><th>Status</th><th>Opened</th><th>Clicked CV</th><th>Reply</th></tr></thead>
          <tbody>
            {data.companies.map((company) => (
              <tr key={company.id}>
                <td>{company.name}</td>
                <td>{company.email}</td>
                <td>{company.status}</td>
                <td>{company.emailOpened ? 'Yes' : 'No'}</td>
                <td>{company.cvClicked ? 'Yes' : 'No'}</td>
                <td>{company.reply || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
