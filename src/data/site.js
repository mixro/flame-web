// Central switches. Flip these when real content is ready.
export const site = {
  name: 'FLAME',
  tagline: 'Lit from within.',
  currency: 'TZS',
  // Show the slim "preview" bar until real data is filled in.
  showPlaceholderNotice: true,
  // Set to a real checkout URL to enable the checkout button.
  checkoutUrl: '',
  // International format, digits only (e.g. '255712345678'). When set and there is no
  // checkoutUrl, the cart offers "Order on WhatsApp" with the order typed in.
  whatsapp: '[WHATSAPP]',
  email: '[EMAIL]',
  // Handle without the @, e.g. 'flame.tz'
  instagram: '[INSTAGRAM]',
  location: 'Dar es Salaam, Tanzania',
};

export const nav = [
  { label: 'NEW', to: '/shop' },
  { label: 'HOODIES', to: '/shop?c=hoodies' },
  { label: 'TEES', to: '/shop?c=tees' },
  { label: 'HEADWEAR', to: '/shop?c=headwear' },
  { label: 'BAGS', to: '/shop?c=bags' },
  { label: 'JOURNAL', to: '/journal' },
];

/**
 * True when a content value has been filled in. Anything still written as a
 * [BRACKET] placeholder (or empty) is treated as missing and is not shown to
 * customers, so the site never displays raw placeholders.
 */
export const isFilled = (v) => {
  if (v == null) return false;
  const s = String(v).trim();
  return s !== '' && !/\[[^\]]*\]/.test(s);
};

export const filled = (list) => list.filter(isFilled);

const digits = (v) => String(v).replace(/\D/g, '');
export const whatsappLink = (text = '') =>
  isFilled(site.whatsapp)
    ? `https://wa.me/${digits(site.whatsapp)}${text ? `?text=${encodeURIComponent(text)}` : ''}`
    : null;
export const instagramLink = () =>
  isFilled(site.instagram) ? `https://instagram.com/${site.instagram.replace(/^@/, '')}` : null;
