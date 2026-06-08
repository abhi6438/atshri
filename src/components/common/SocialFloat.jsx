const IG_GRAD = 'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)';

export function SocialFloat({ social = {} }) {
  const { youtube, instagram } = social;
  if (!youtube && !instagram) return null;

  return (
    <div className="sfloat">
      {youtube && (
        <a href={youtube} target="_blank" rel="noopener noreferrer"
          className="sfloat-btn" style={{ background: '#FF0000' }} title="Subscribe on YouTube">
          <span className="sfloat-icon">
            <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
              <rect width="22" height="16" rx="4" fill="white" fillOpacity="0.25" />
              <polygon points="9,4 9,12 16,8" fill="white" />
            </svg>
          </span>
          <span className="sfloat-label">Subscribe</span>
        </a>
      )}
      {instagram && (
        <a href={instagram} target="_blank" rel="noopener noreferrer"
          className="sfloat-btn" style={{ background: IG_GRAD }} title="Follow on Instagram">
          <span className="sfloat-icon">
            <svg width="22" height="22" viewBox="0 0 48 48" fill="none">
              <rect x="4" y="4" width="40" height="40" rx="11" stroke="white" strokeWidth="4" fill="none" />
              <circle cx="24" cy="24" r="9" stroke="white" strokeWidth="4" fill="none" />
              <circle cx="36" cy="12" r="3" fill="white" />
            </svg>
          </span>
          <span className="sfloat-label">Follow</span>
        </a>
      )}
    </div>
  );
}
