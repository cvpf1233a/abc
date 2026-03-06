export function mockFindCompanies(profession, country) {
  return [
    { name: `${profession || 'Tech'} Talent GmbH`, website: 'https://example-gmbh.com', email: 'jobs@example-gmbh.com', location: country || 'Germany' },
    { name: `Global ${profession || 'Career'} SARL`, website: 'https://example-sarl.com', email: 'careers@example-sarl.com', location: country || 'France' },
    { name: `${profession || 'Digital'} Nordic AB`, website: 'https://example-ab.com', email: 'hr@example-ab.com', location: country || 'Sweden' }
  ];
}

export function exportEmails(companies, format = 'json') {
  if (format === 'csv') {
    const rows = ['name,email,website,location', ...companies.map((c) => `${c.name},${c.email},${c.website},${c.location}`)];
    return rows.join('\n');
  }
  return JSON.stringify(companies, null, 2);
}
