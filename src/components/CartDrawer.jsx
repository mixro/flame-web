import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ProductArt from './ProductArt';
import { formatPrice } from '../data/products';
import { site, whatsappLink } from '../data/site';
import { useOverlay } from '../hooks/useOverlay';

function orderMessage(items, total) {
  const lines = items.map(
    (i) => `• ${i.qty} × ${i.title} (${i.variantLabel}, ${i.size})${i.price != null ? ` – ${formatPrice(i.price * i.qty)}` : ''}`,
  );
  return [`Hi FLAME, I'd like to order:`, ...lines, total != null ? `Subtotal: ${formatPrice(total)}` : ''].filter(Boolean).join('\n');
}

export default function CartDrawer() {
  const { items, count, max, open, closeCart, changeQty, remove } = useCart();
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  useOverlay(open, closeCart, panelRef, closeRef);

  const priced = items.length > 0 && items.every((i) => i.price != null);
  const total = priced ? items.reduce((n, i) => n + i.price * i.qty, 0) : null;
  const wa = !site.checkoutUrl && items.length > 0 ? whatsappLink(orderMessage(items, total)) : null;
  const tab = open ? 0 : -1;

  return (
    <div className={`cart ${open ? 'is-open' : ''}`} aria-hidden={!open}>
      <button type="button" className="cart__scrim" aria-label="Close cart" onClick={closeCart} tabIndex={-1} />
      <aside className="cart__panel" role="dialog" aria-modal="true" aria-labelledby="cart-title" ref={panelRef}>
        <div className="cart__head">
          <h2 id="cart-title">
            Cart <span className="cart__count">({count})</span>
          </h2>
          <button ref={closeRef} type="button" className="icon-btn" aria-label="Close cart" onClick={closeCart} tabIndex={tab}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart__empty">
            <p className="cart__empty-title">Your cart is empty.</p>
            <p>The first drop is four pieces in one deep black.</p>
            <Link to="/shop" className="btn btn--solid" onClick={closeCart} tabIndex={tab}>
              Shop the drop
            </Link>
          </div>
        ) : (
          <>
            <ul className="cart__list">
              {items.map((i) => (
                <li key={i.key} className="cart__item">
                  <Link to={`/product/${i.slug}?v=${i.logo}`} className="cart__thumb" onClick={closeCart} tabIndex={tab} aria-label={`${i.title}, ${i.variantLabel}`}>
                    <ProductArt kind={i.kind} logo={i.logo} />
                  </Link>
                  <div className="cart__info">
                    <div className="cart__row">
                      <span className="cart__name">{i.title}</span>
                      <span className="cart__price">{i.price != null ? formatPrice(i.price * i.qty) : ''}</span>
                    </div>
                    <span className="cart__sub">
                      {i.variantLabel} · {i.size}
                    </span>
                    <div className="cart__row cart__row--end">
                      <div className="qty" role="group" aria-label={`Quantity for ${i.title}`}>
                        <button type="button" aria-label="Decrease quantity" onClick={() => changeQty(i.key, -1)} tabIndex={tab}>−</button>
                        <span aria-live="polite">{i.qty}</span>
                        <button type="button" aria-label="Increase quantity" onClick={() => changeQty(i.key, 1)} disabled={i.qty >= max} tabIndex={tab}>+</button>
                      </div>
                      <button type="button" className="cart__remove" onClick={() => remove(i.key)} tabIndex={tab}>
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="cart__foot">
              <div className="cart__total">
                <span>Subtotal</span>
                <span>{total != null ? formatPrice(total) : 'Confirmed at launch'}</span>
              </div>
              {site.checkoutUrl ? (
                <a className="btn btn--solid btn--block btn--tall" href={site.checkoutUrl} tabIndex={tab}>Checkout</a>
              ) : wa ? (
                <a className="btn btn--solid btn--block btn--tall" href={wa} target="_blank" rel="noopener noreferrer" tabIndex={tab}>
                  Order on WhatsApp
                </a>
              ) : (
                <>
                  <button type="button" className="btn btn--solid btn--block btn--tall" disabled>Checkout opens at launch</button>
                  <p className="cart__note">Your cart is saved on this device until then.</p>
                </>
              )}
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
