import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { nav, site } from '../data/site';
import { useCart } from '../context/CartContext';
import { useOverlay } from '../hooks/useOverlay';

export default function Header({ overlay = false }) {
  const { count, openCart } = useCart();
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef(null);
  const loc = useLocation();
  const current = loc.pathname + loc.search;

  useEffect(() => setMenu(false), [loc.pathname, loc.search]);
  useOverlay(menu, () => setMenu(false), panelRef);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const solid = !overlay || scrolled;

  return (
    <>
      <div className={`site-top ${solid ? 'is-solid' : ''}`}>
        {site.showPlaceholderNotice && (
          <div className="notice">Preview site · Prices and details at launch</div>
        )}
        <header className="header">
          <div className="header__bar">
            <button
              type="button"
              className="icon-btn header__burger"
              aria-label="Open menu"
              aria-expanded={menu}
              aria-controls="mobile-menu"
              onClick={() => setMenu(true)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                <path d="M4 8h16M4 16h16" />
              </svg>
            </button>
            <Link to="/" className="header__logo" aria-label="FLAME home">
              <Logo variant="white" width={124} />
            </Link>
            <nav className="header__nav" aria-label="Main">
              {nav.map((n) => (
                <Link key={n.label} to={n.to} className={current === n.to ? 'is-active' : undefined} aria-current={current === n.to ? 'page' : undefined}>
                  {n.label}
                </Link>
              ))}
            </nav>
            <div className="header__tools">
              <button type="button" className="icon-btn" aria-label={`Open cart, ${count} ${count === 1 ? 'item' : 'items'}`} onClick={openCart}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 8h14l-1 12H6L5 8z" />
                  <path d="M9 8V6a3 3 0 0 1 6 0v2" />
                </svg>
                {count > 0 && <span className="header__count">{count}</span>}
              </button>
            </div>
          </div>
        </header>
      </div>

      <div className={`drawer-nav ${menu ? 'is-open' : ''}`} aria-hidden={!menu}>
        <button type="button" className="drawer-nav__scrim" aria-label="Close menu" onClick={() => setMenu(false)} tabIndex={-1} />
        <div className="drawer-nav__panel" id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu" ref={panelRef}>
          <div className="drawer-nav__head">
            <Logo variant="white" width={96} />
            <button type="button" className="icon-btn" aria-label="Close menu" onClick={() => setMenu(false)} tabIndex={menu ? 0 : -1}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
          <nav className="drawer-nav__links" aria-label="Mobile">
            {nav.map((n) => (
              <Link key={n.label} to={n.to} tabIndex={menu ? 0 : -1} className={current === n.to ? 'is-active' : undefined}>
                {n.label.charAt(0) + n.label.slice(1).toLowerCase()}
              </Link>
            ))}
            <Link to="/about" tabIndex={menu ? 0 : -1}>About</Link>
          </nav>
          <p className="drawer-nav__foot">{site.location}</p>
        </div>
      </div>
    </>
  );
}
