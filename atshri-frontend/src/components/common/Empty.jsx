export function Empty({ lang }) {
  return (
    <div style={{ textAlign: 'center', padding: '56px 20px', color: 'var(--mid)' }}>
      <div style={{ fontSize: 48, marginBottom: 14 }}>🔍</div>
      <p style={{ fontSize: 16 }}>
        {lang === 'en' ? 'Nothing found for this filter.' : 'इस फ़िल्टर के लिए कुछ नहीं मिला।'}
      </p>
    </div>
  );
}
