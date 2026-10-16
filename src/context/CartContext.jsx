import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react';

const CartContext = createContext(null);
const KEY = 'flame.cart.v1';

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function reducer(items, action) {
  switch (action.type) {
    case 'add': {
      const i = items.findIndex((x) => x.key === action.item.key);
      if (i === -1) return [...items, { ...action.item, qty: 1 }];
      return items.map((x, n) => (n === i ? { ...x, qty: Math.min(x.qty + 1, 9) } : x));
    }
    case 'qty':
      return items
        .map((x) => (x.key === action.key ? { ...x, qty: Math.max(0, Math.min(9, x.qty + action.delta)) } : x))
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
  const [items, dispatch] = useReducer(reducer, undefined, load);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable: cart still works for this visit */
    }
  }, [items]);

  const add = useCallback((item) => {
    dispatch({ type: 'add', item });
    setOpen(true);
  }, []);

  const value = useMemo(
    () => ({
      items,
      count: items.reduce((n, x) => n + x.qty, 0),
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
