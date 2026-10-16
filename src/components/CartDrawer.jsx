import { useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import ProductArt from './ProductArt';
import { formatPrice } from '../data/products';
import { site } from '../data/site';

export default function CartDrawer() {
  const { items, open, closeCart, changeQty, remove } = useCart();
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    closeRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && closeCart();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, closeCart]);

  const priced = items.length > 0 && items.every((i) => i.price != null);
  const total = priced ? items.reduce((n, i) => n + i.price * i.qty, 0) : null;

  return (
    <div className={`cart ${open ? 'is-open' : ''}`} aria-hidden={!open}>
      <button type="button" className="cart__scrim" aria-label="Close cart" onClick={closeCart} tabIndex={open ? 0 : -1} />
      <aside className="cart__panel" role="dialog" aria-modal="true" aria-label="Shopping cart">
        <div className="cart__head">
          <h2>CART</h2>
          <button ref={closeRef} type="button" className="icon-btn" aria-label="Close cart" onClick={closeCart}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <p className="cart__empty">Your cart is empty.</p>
        ) : (
          <ul className="cart__list">
            {items.map((i) => (
              <li key={i.key} className="cart__item">
                <div className="cart__thumb">
                  <ProductArt kind={i.kind} logo={i.logo} />
                </div>
                <div className="cart__info">
                  <span className="cart__name">{i.title}</span>
                  <span className="cart__sub">{i.variantLabel} · {i.size}</span>
                  <span className="cart__sub">{formatPrice(i.price)}</span>
                  <div className="cart__qty">
                    <button type="button" aria-label="Decrease quantity" onClick={() => changeQty(i.key, -1)}>−</button>
                    <span aria-live="polite">{i.qty}</span>
                    <button type="button" aria-label="Increase quantity" onClick={() => changeQty(i.key, 1)}>+</button>
                    <button type="button" className="cart__remove" onClick={() => remove(i.key)}>REMOVE</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="cart__foot">
          <div className="cart__total">
            <span>SUBTOTAL</span>
            <span>{total != null ? formatPrice(total) : '[PRICE] TZS'}</span>
          </div>
          {site.checkoutUrl ? (
            <a className="btn btn--solid btn--block" href={site.checkoutUrl}>CHECKOUT</a>
          ) : (
            <>
              <button type="button" className="btn btn--solid btn--block" disabled>CHECKOUT</button>
              <p className="cart__note">Checkout opens at launch. Set checkoutUrl in src/data/site.js.</p>
            </>
          )}
        </div>
      </aside>
    </div>
  );
}
