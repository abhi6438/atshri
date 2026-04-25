export function Divider({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '0 0 18px' }}>
      <div style={{ flex: 1, height: 1, background: 'var(--bd)' }} />
      <span style={{ fontWeight: 700, fontSize: 12, color: 'var(--mid)', letterSpacing: 1.5 }}>
        {children}
      </span>
      <div style={{ flex: 1, height: 1, background: 'var(--bd)' }} />
    </div>
  );
}
