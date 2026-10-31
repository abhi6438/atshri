import { useState } from 'react';
import { Logo } from '../components/common/Logo';
import { Icon } from '../components/common/Icon';

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
    <div className="admin-login pat">
      <div className="card" style={{ padding: 'clamp(28px, 5vw, 44px)', width: '100%', maxWidth: 420, boxShadow: 'var(--shadow-lg)' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <Logo size={60} />
          </div>
          <p className="eyebrow eyebrow--center">Atshri Trust</p>
          <h1 className="h-lg">Admin Panel</h1>
          <p className="muted" style={{ fontSize: 'var(--fs-sm)', marginTop: 6 }}>Restricted access</p>
        </div>
        <form onSubmit={handleSubmit} className="form-stack">
          <div className="field">
            <label htmlFor="admin-pw">Password</label>
            <input
              id="admin-pw"
              type="password"
              value={pw}
              onChange={e => { setPw(e.target.value); setErr(false); }}
              autoComplete="current-password"
              aria-invalid={err}
              aria-describedby={err ? 'admin-err' : undefined}
              autoFocus
            />
          </div>
          {err && <p id="admin-err" role="alert" style={{ color: 'var(--danger)', fontSize: 'var(--fs-sm)' }}>Incorrect password</p>}
          <button type="submit" className="btn btn-primary btn-block">
            <Icon name="lock" /> Login
          </button>
        </form>
      </div>
    </div>
  );
}
