export default function LandingPage({ t }) {
  return (
    <main className="container">
      <section className="hero card">
        <h1>{t.heroTitle}</h1>
        <p>{t.heroSubtitle}</p>
        <button>{t.startNow}</button>
      </section>

      <section className="card">
        <h3>{t.howItWorks}</h3>
        <ol>{t.steps.map((step) => <li key={step}>{step}</li>)}</ol>
      </section>

      <section className="card">
        <h3>{t.pricing}</h3>
        <div className="pricing-grid">
          <article><h4>Basic</h4><p>$20</p></article>
          <article><h4>Pro</h4><p>$39</p></article>
          <article><h4>Premium</h4><p>$79</p></article>
        </div>
      </section>

      <section className="card">
        <h3>AI Features</h3>
        <ul className="feature-list">
          <li>AI CV Generator (PDF)</li>
          <li>AI Cover Letter Generator</li>
          <li>AI Email Generator</li>
          <li>Job Match Score</li>
          <li>CV Optimization</li>
          <li>Interview Trainer</li>
          <li>Visa Sponsor Company Finder</li>
          <li>Salary Estimator</li>
          <li>Smart Job Map</li>
          <li>AI Job Recommendations</li>
          <li>Job Alerts by Email/Telegram</li>
        </ul>
      </section>
    </main>
  );
}
