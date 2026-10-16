import { useState } from 'react';
import { photos } from '../data/images';

const WIDTHS = [480, 800, 1200, 1800];
const src = (id, w) => `https://images.unsplash.com/${id}?auto=format&fm=webp&fit=crop&q=55&w=${w}`;

/**
 * Responsive, lazy, layout-stable photo.
 * - srcset + sizes so phones never download desktop files
 * - fixed aspect ratio so nothing shifts while loading
 * - dark placeholder, fades in on load
 * - toned to the FLAME black (greyscale + darken) in CSS
 * - falls back to the placeholder if the host is unreachable
 */
export default function SmartImage({ name, sizes = '100vw', priority = false, ratio, className = '', alt }) {
  const photo = photos[name];
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  if (!photo) return null;
  const r = ratio || photo.ratio;
  const w = 1200;
  return (
    <div className={`smart-img ${loaded ? 'is-loaded' : ''} ${className}`} style={{ aspectRatio: r }}>
      {!failed && (
        <img
          src={src(photo.id, 800)}
          srcSet={WIDTHS.map((x) => `${src(photo.id, x)} ${x}w`).join(', ')}
          sizes={sizes}
          width={w}
          height={Math.round(w / r)}
          alt={alt ?? photo.alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchpriority={priority ? 'high' : 'auto'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      )}
      <span className="smart-img__shade" aria-hidden="true" />
    </div>
  );
}
