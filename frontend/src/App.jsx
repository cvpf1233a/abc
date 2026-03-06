import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import api from './api';
import DashboardPage from './pages/DashboardPage';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import CountryPage from './pages/CountryPage';
import ProfilePage from './pages/ProfilePage';
import { countryLangMap, supportedLanguages, translations } from './i18n/translations';

const getTextDir = (lang) => (lang === 'ar' ? 'rtl' : 'ltr');

export default function App() {
  const [lang, setLang] = useState('en');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const detectLanguage = async () => {
      const saved = localStorage.getItem('lang');
      if (saved && supportedLanguages.includes(saved)) return setLang(saved);
      try {
        const { data } = await fetch('https://ipapi.co/json/').then((res) => res.json());
        const countryCode = data?.country_code;
        const detected = countryLangMap[countryCode] || navigator.language.slice(0, 2) || 'en';
        setLang(supportedLanguages.includes(detected) ? detected : 'en');
      } catch {
        setLang('en');
      }
    };
    detectLanguage();
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = getTextDir(lang);
    localStorage.setItem('lang', lang);
  }, [lang]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    api.get('/auth/me').then((res) => setUser(res.data.user)).catch(() => localStorage.removeItem('token'));
  }, []);

  const t = useMemo(() => translations[lang] || translations.en, [lang]);

  const onAuth = ({ token, user: authenticatedUser }) => {
    localStorage.setItem('token', token);
    setUser(authenticatedUser);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <div>
      <header className="nav">
        <h2>{t.appName}</h2>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/countries">{t.nav.countries}</Link>
          {user && <Link to="/dashboard">{t.nav.dashboard}</Link>}
          {user && <Link to="/profile">{t.nav.profile}</Link>}
          {!user ? <Link to="/auth">{t.nav.login}</Link> : <button onClick={logout}>{t.nav.logout}</button>}
        </nav>
        <select value={lang} onChange={(e) => setLang(e.target.value)}>
          {supportedLanguages.map((l) => (
            <option key={l} value={l}>{l.toUpperCase()}</option>
          ))}
        </select>
      </header>

      <Routes>
        <Route path="/" element={<LandingPage t={t} />} />
        <Route path="/auth" element={<AuthPage t={t} onAuth={onAuth} />} />
        <Route path="/countries" element={<CountryPage />} />
        <Route path="/profile" element={user ? <ProfilePage t={t} /> : <Navigate to="/auth" />} />
        <Route path="/dashboard" element={user ? <DashboardPage t={t} /> : <Navigate to="/auth" />} />
      </Routes>
    </div>
  );
}
