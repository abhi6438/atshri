import { useState } from 'react';
import { Logo } from '../components/common/Logo';

const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASS || 'atshri@2024';

export function AdminLogin({ setAdmin }) {
  const [pw, setPw] = useState('');
  const [err, setErr] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    if (pw === ADMIN_PASS) {
      setAdmin(true);
    } else {
      setErr(true);
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
            type="password"
            value={pw}
            onChange={e => { setPw(e.target.value); setErr(false); }}
            placeholder="Password"
            autoComplete="current-password"
          />
          {err && <p style={{ color: '#EF4444', fontSize: 13 }}>❌ Incorrect password</p>}
          <button type="submit" className="bsf" style={{ padding: 13, fontSize: 16 }}>Login</button>
        </form>
      </div>
    </div>
  );
}
