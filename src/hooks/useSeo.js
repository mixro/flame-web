import { useEffect } from 'react';

const DEFAULT_TITLE = 'FLAME | Lit from within.';
const DEFAULT_DESCRIPTION =
  'FLAME is an all-black premium streetwear label from Tanzania. One black, real texture, a quiet logo and a single red A.';

function setMeta(selector, attr, value) {
  const m = document.querySelector(selector);
  if (m) m.setAttribute(attr, value);
}

export function useSeo(title, description) {
  useEffect(() => {
    const t = title ? `${title} | FLAME` : DEFAULT_TITLE;
    const d = description || DEFAULT_DESCRIPTION;
    document.title = t;
    setMeta('meta[name="description"]', 'content', d);
    setMeta('meta[property="og:title"]', 'content', t);
    setMeta('meta[property="og:description"]', 'content', d);
  }, [title, description]);
}
