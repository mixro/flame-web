import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { getProduct } from '../data/products';

const CartContext = createContext(null);
const KEY = 'flame.cart.v2';
const MAX_QTY = 9;

// Only the choice is stored (slug, logo, size, qty). Title, price and labels are
// always read from products.js, so a saved cart never shows an old price.
function isValid(x) {
  return (
    x &&
    typeof x === 'object' &&
    getProduct(x.slug) &&
    (x.logo === 'black' || x.logo === 'white') &&
    getProduct(x.slug).sizes.includes(x.size) &&
    Number.isInteger(x.qty) &&
    x.qty > 0
  );
}

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || '[]');
    if (!Array.isArray(raw)) return [];
    return raw
      .filter(isValid)
      .map(({ slug, logo, size, qty }) => ({ key: `${slug}:${logo}:${size}`, slug, logo, size, qty: Math.min(qty, MAX_QTY) }));
  } catch {
    return [];
  }
}

function reducer(items, action) {
  switch (action.type) {
    case 'add': {
      const { slug, logo, size } = action.item;
      const key = `${slug}:${logo}:${size}`;
      const i = items.findIndex((x) => x.key === key);
      if (i === -1) return [...items, { key, slug, logo, size, qty: 1 }];
      return items.map((x, n) => (n === i ? { ...x, qty: Math.min(x.qty + 1, MAX_QTY) } : x));
    }
    case 'qty':
      return items
        .map((x) => (x.key === action.key ? { ...x, qty: Math.max(0, Math.min(MAX_QTY, x.qty + action.delta)) } : x))
        .filter((x) => x.qty > 0);
    case 'remove':
      return items.filter((x) => x.key !== action.key);
    case 'clear':
      return [];
    default:
      return items;
  }
}

export function CartProvider({ children }) {
  const [stored, dispatch] = useReducer(reducer, undefined, load);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(stored.map(({ slug, logo, size, qty }) => ({ slug, logo, size, qty }))));
    } catch {
      /* storage unavailable: cart still works for this visit */
    }
  }, [stored]);

  const items = useMemo(
    () =>
      stored.map((x) => {
        const p = getProduct(x.slug);
        return { ...x, title: p.title, kind: p.kind, price: p.price, variantLabel: p.variants[x.logo] };
      }),
    [stored],
  );

  const add = useCallback((item) => {
    dispatch({ type: 'add', item });
    setOpen(true);
  }, []);

  const value = useMemo(
    () => ({
      items,
      count: items.reduce((n, x) => n + x.qty, 0),
      max: MAX_QTY,
      open,
      openCart: () => setOpen(true),
      closeCart: () => setOpen(false),
      add,
      changeQty: (key, delta) => dispatch({ type: 'qty', key, delta }),
      remove: (key) => dispatch({ type: 'remove', key }),
      clear: () => dispatch({ type: 'clear' }),
    }),
    [items, open, add],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
};
