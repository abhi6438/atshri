export function Toggle({ on, onChange }) {
  return (
    <div
      role="switch"
      aria-checked={on}
      tabIndex={0}
      onClick={onChange}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onChange()}
      title={on ? 'Visible (click to hide)' : 'Hidden (click to show)'}
      style={{
        width: 44, height: 24, borderRadius: 12, cursor: 'pointer', flexShrink: 0,
        background: on ? '#F4831F' : '#D1D5DB', position: 'relative', transition: 'background .2s',
      }}
    >
      <div style={{
        position: 'absolute', top: 2, left: on ? 22 : 2, width: 20, height: 20,
        borderRadius: '50%', background: 'var(--surface)', boxShadow: '0 1px 4px rgba(0,0,0,.2)',
        transition: 'left .2s',
      }} />
    </div>
  );
}
