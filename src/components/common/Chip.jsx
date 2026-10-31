export function Chip({ active, onClick, children }) {
  return (
    <button type="button" onClick={onClick} className={`chip${active ? ' is-active' : ''}`} aria-pressed={!!active}>
      {children}
    </button>
  );
}
