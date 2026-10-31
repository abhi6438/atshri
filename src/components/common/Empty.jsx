import { Icon } from './Icon';

export function Empty({ lang, children }) {
  return (
    <div className="empty" role="status">
      <Icon name="search" />
      <p>
        {children || (lang === 'en' ? 'Nothing found for this filter.' : 'इस फ़िल्टर के लिए कुछ नहीं मिला।')}
      </p>
    </div>
  );
}
