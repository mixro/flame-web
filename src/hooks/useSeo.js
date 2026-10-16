import { useEffect } from 'react';

export function useSeo(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | FLAME` : 'FLAME | Lit from within.';
    if (description) {
      let m = document.querySelector('meta[name="description"]');
      if (m) m.setAttribute('content', description);
    }
  }, [title, description]);
}
