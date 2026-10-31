export function Divider({ children, count }) {
  return (
    <div className="sub-head">
      <h2>{children}</h2>
      {count != null && <span className="count">{count}</span>}
    </div>
  );
}
