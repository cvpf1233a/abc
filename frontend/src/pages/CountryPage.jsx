const countries = [
  { name: 'Germany', flag: '🇩🇪' },
  { name: 'France', flag: '🇫🇷' },
  { name: 'Canada', flag: '🇨🇦' },
  { name: 'Netherlands', flag: '🇳🇱' },
  { name: 'Belgium', flag: '🇧🇪' },
  { name: 'Spain', flag: '🇪🇸' },
  { name: 'Italy', flag: '🇮🇹' },
  { name: 'Sweden', flag: '🇸🇪' }
];

export default function CountryPage() {
  return (
    <main className="container card">
      <h2>Select destination country</h2>
      <div className="country-grid">
        {countries.map((country) => (
          <article key={country.name} className="country-card">
            <span>{country.flag}</span>
            <p>{country.name}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
