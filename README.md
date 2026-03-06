# Global Job AI SaaS Platform

Production-ready starter for an AI-powered SaaS platform that helps users find jobs abroad and automate company applications.

## Features Included
- Multi-language UI (EN, FR, ES, DE, AR, IT, NL) with automatic IP-based language detection and manual switcher.
- User account system: sign up, login, reset password, profile data persistence.
- Dashboard with applications sent, companies contacted, email opens, CV link clicks, and replies.
- AI feature endpoints: CV generator, cover letter generator, email generator, job match score, CV optimization, interview trainer.
- Country selection grid with flags.
- Company finder + email scraper export format (CSV/JSON).
- SMTP integration-ready structure (Gmail, SendGrid, Mailgun).
- Application tracker with statistics in dashboard.
- Extra modules scaffolded in landing page: Visa sponsor finder, salary estimator, smart map, recommendations, alerts.

## Stack
- Frontend: React + Vite
- Backend: Node.js + Express
- Database: SQLite

## Quick Start
```bash
npm install
npm run dev
```
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000`

## Deployment
1. Set environment variables based on `.env.example`.
2. Build frontend:
   ```bash
   npm run build
   ```
3. Run backend:
   ```bash
   npm run start
   ```
4. Point your custom domain to your host and reverse-proxy `/api` to backend.

## API Keys / Setup Needed
- OpenAI API key (wire inside `backend/src/services/aiService.js`)
- IP geolocation provider (frontend currently uses `https://ipapi.co/json/`)
- Google Maps API key for Smart Job Map integration (add map component)
- SMTP credentials for chosen provider
