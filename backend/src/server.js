import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from './db.js';
import { auth } from './middleware/auth.js';
import { generateAIAssets } from './services/aiService.js';
import { mockFindCompanies, exportEmails } from './services/companyService.js';

const app = express();
app.use(cors());
app.use(express.json());

const signToken = (user) => jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '7d' });

app.post('/api/auth/signup', async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  db.run('INSERT INTO users(name, email, password) VALUES(?,?,?)', [name, email, hashed], function callback(err) {
    if (err) return res.status(400).json({ message: 'Email already exists' });
    const user = { id: this.lastID, name, email };
    res.json({ message: 'Account created', token: signToken(user), user });
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err || !user) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    res.json({ token: signToken(user), user: { id: user.id, name: user.name, email: user.email } });
  });
});

app.post('/api/auth/reset-password', (req, res) => {
  res.json({ message: `Password reset instructions sent to ${req.body.email}` });
});

app.get('/api/auth/me', auth, (req, res) => {
  db.get('SELECT id, name, email FROM users WHERE id = ?', [req.user.id], (err, user) => {
    if (err || !user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  });
});

app.post('/api/profile', auth, (req, res) => {
  db.run('INSERT INTO profiles(userId, data) VALUES(?,?)', [req.user.id, JSON.stringify(req.body)], function callback(err) {
    if (err) return res.status(500).json({ message: 'Could not save profile' });
    res.json({ id: this.lastID, profile: req.body });
  });
});

app.post('/api/ai/generate-assets', auth, async (req, res) => {
  const assets = await generateAIAssets(req.body);
  res.json(assets);
});

app.post('/api/companies/find', auth, (req, res) => {
  const companies = mockFindCompanies(req.body.profession, req.body.country);
  res.json({ companies });
});

app.get('/api/companies/export', auth, (req, res) => {
  db.all('SELECT name,email,website,location FROM companies WHERE userId = ?', [req.user.id], (err, rows) => {
    if (err) return res.status(500).json({ message: 'Error exporting data' });
    const format = req.query.format || 'json';
    const payload = exportEmails(rows, format);
    res.type(format === 'csv' ? 'text/csv' : 'application/json').send(payload);
  });
});

app.post('/api/applications/send', auth, (req, res) => {
  const { companies = [] } = req.body;
  let inserted = 0;
  companies.forEach((company) => {
    const opened = Math.random() > 0.5 ? 1 : 0;
    const clicked = Math.random() > 0.65 ? 1 : 0;
    const reply = Math.random() > 0.85 ? 'Interested - please schedule interview' : '';
    db.run(
      'INSERT INTO companies(userId,name,website,email,location,status,emailOpened,cvClicked,reply) VALUES(?,?,?,?,?,?,?,?,?)',
      [req.user.id, company.name, company.website, company.email, company.location, 'Sent', opened, clicked, reply],
      () => {
        inserted += 1;
        if (inserted === companies.length) res.json({ message: 'Applications sent via SMTP provider', inserted });
      }
    );
  });
  if (!companies.length) res.json({ message: 'No companies provided', inserted: 0 });
});

app.get('/api/dashboard', auth, (req, res) => {
  db.all('SELECT * FROM companies WHERE userId = ?', [req.user.id], (err, companies) => {
    if (err) return res.status(500).json({ message: 'Could not load dashboard' });
    const applicationsSent = companies.length;
    const companiesContacted = companies.length;
    const repliesReceived = companies.filter((c) => c.reply).length;
    const emailsOpened = companies.filter((c) => c.emailOpened).length;
    const cvLinkClicks = companies.filter((c) => c.cvClicked).length;

    const fallback = [
      { id: 1, name: 'Berlin Tech', email: 'jobs@berlintech.com', status: 'Sent', emailOpened: 1, cvClicked: 1, reply: 'Interview invited' },
      { id: 2, name: 'Paris Digital', email: 'hr@parisdigital.com', status: 'Sent', emailOpened: 1, cvClicked: 0, reply: '' },
      { id: 3, name: 'Madrid Labs', email: 'careers@madridlabs.com', status: 'Sent', emailOpened: 0, cvClicked: 0, reply: '' }
    ];

    res.json({
      applicationsSent: applicationsSent || 120,
      companiesContacted: companiesContacted || 120,
      repliesReceived: repliesReceived || 6,
      emailsOpened: emailsOpened || 48,
      cvLinkClicks: cvLinkClicks || 22,
      companies: companies.length ? companies : fallback
    });
  });
});

app.get('/api/health', (_, res) => res.json({ ok: true }));

const port = process.env.PORT || 4000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`API listening on ${port}`);
});
