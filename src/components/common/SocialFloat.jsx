import { Icon } from './Icon';

export function SocialFloat({ social = {} }) {
  const { youtube, instagram } = social;
  if (!youtube && !instagram) return null;

  return (
    <div className="sfloat">
      {youtube && (
        <a href={youtube} target="_blank" rel="noopener noreferrer" className="sfloat-btn" aria-label="Atshri on YouTube (opens in new tab)">
          <span className="sfloat-icon"><Icon name="youtube" /></span>
          <span className="sfloat-label">YouTube</span>
        </a>
      )}
      {instagram && (
        <a href={instagram} target="_blank" rel="noopener noreferrer" className="sfloat-btn" aria-label="Atshri on Instagram (opens in new tab)">
          <span className="sfloat-icon"><Icon name="instagram" /></span>
          <span className="sfloat-label">Instagram</span>
        </a>
      )}
    </div>
  );
}
