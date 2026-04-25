import { useState } from 'react';
import { Logo } from '../components/common/Logo';
import { loginAdmin } from '../api';

export function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('atshri_admin');
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      const data = await loginAdmin(username.trim(), pw);
      onLogin(data.access_token);
    } catch {
      setErr('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      paddingTop: 64, minHeight: '100vh', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      background: 'var(--sfp)', padding: '80px 20px',
    }}>
      <div className="card" style={{ padding: 42, width: '100%', maxWidth: 390 }}>
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 13 }}>
            <Logo size={64} />
          </div>
          <h2 style={{ fontWeight: 800, fontSize: 23 }}>Admin Panel</h2>
          <p style={{ color: 'var(--mid)', fontSize: 13, marginTop: 3 }}>Restricted access</p>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
          <input
            type="text"
            value={username}
            onChange={e => { setUsername(e.target.value); setErr(''); }}
            placeholder="Username"
            autoComplete="username"
            required
          />
          <input
            type="password"
            value={pw}
            onChange={e => { setPw(e.target.value); setErr(''); }}
            placeholder="Password"
            autoComplete="current-password"
            required
          />
          {err && <p style={{ color: '#EF4444', fontSize: 13 }}>❌ {err}</p>}
          <button type="submit" className="bsf" style={{ padding: 13, fontSize: 16 }} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
