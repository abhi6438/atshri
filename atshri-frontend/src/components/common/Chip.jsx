export function Chip({ active, onClick, color, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '7px 17px', borderRadius: 28, fontFamily: 'inherit', fontWeight: 700,
        fontSize: 13.5, cursor: 'pointer',
        background: active ? color : 'var(--surface)',
        color: active ? '#fff' : 'var(--tx)',
        border: `1.5px solid ${active ? color : 'var(--bd)'}`,
        transition: 'all .15s',
      }}
    >
      {children}
    </button>
  );
}
