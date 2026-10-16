const sizesApparel = ['XS', 'S', 'M', 'L', 'XL', '2XL'];
const oneSize = ['One size'];

export const categories = [
  { id: 'hoodies', label: 'Hoodies', kind: 'hoodie' },
  { id: 'tees', label: 'Tees', kind: 'tee' },
  { id: 'headwear', label: 'Headwear', kind: 'beanie' },
  { id: 'bags', label: 'Bags', kind: 'tote' },
];

// price: null renders the "[PRICE] TZS" placeholder. Put real numbers in when known.
export const products = [
  {
    slug: 'duality-hoodie',
    title: 'Duality Hoodie',
    kind: 'hoodie',
    category: 'hoodies',
    price: null,
    sizes: sizesApparel,
    variants: { black: 'Tonal black', white: 'Visible white logo' },
    description:
      'A hoodie in one deep black. The chest logo is worked tonally, black thread on black cloth, seen when the light moves rather than shouted. Choose the white version when you want it seen.',
    details: [
      'Tonal or white chest logo',
      'Red A on the inner neck label',
      'Matte black drawcords and hardware',
      '[FABRIC SPEC AFTER SAMPLING]',
      '[FIT NOTES]',
    ],
  },
  {
    slug: 'core-tee',
    title: 'Core Tee',
    kind: 'tee',
    category: 'tees',
    price: null,
    sizes: sizesApparel,
    variants: { black: 'Tonal black', white: 'Visible white logo' },
    description:
      'The everyday piece. Dense black jersey with a chest logo that is either tonal or white. Built to sit under everything and hold its colour.',
    details: ['Tonal or white chest logo', 'Red A on the woven neck label', '[FABRIC SPEC AFTER SAMPLING]', '[FIT NOTES]'],
  },
  {
    slug: 'shadow-beanie',
    title: 'Shadow Beanie',
    kind: 'beanie',
    category: 'headwear',
    price: null,
    sizes: oneSize,
    variants: { black: 'Tonal patch', white: 'Visible patch' },
    description:
      'A ribbed black beanie with a woven FLAME patch, tonal for quiet days, white for the ones that should be seen.',
    details: ['Woven logo patch', 'Ribbed knit, folded cuff', '[FABRIC SPEC AFTER SAMPLING]'],
  },
  {
    slug: 'voyage-tote',
    title: 'Voyage Tote',
    kind: 'tote',
    category: 'bags',
    price: null,
    sizes: oneSize,
    variants: { black: 'Tonal print', white: 'Visible print' },
    description:
      'A structured black tote for the daily carry. Reinforced handles, a quiet printed logo, and a single red A on the inner label.',
    details: ['Tonal or white printed logo', 'Reinforced handles', 'Inner pocket', '[DIMENSIONS AFTER SAMPLING]'],
  },
];

export const getProduct = (slug) => products.find((p) => p.slug === slug);

// Flat list for the shop grid: every product in both logo variants.
export const catalogue = products.flatMap((p) =>
  ['black', 'white'].map((v) => ({
    key: `${p.slug}:${v}`,
    slug: p.slug,
    logo: v,
    title: p.title,
    kind: p.kind,
    category: p.category,
    variantLabel: p.variants[v],
    price: p.price,
  })),
);

export const formatPrice = (price) =>
  price == null ? '[PRICE] TZS' : `${new Intl.NumberFormat('en-US').format(price)} TZS`;
