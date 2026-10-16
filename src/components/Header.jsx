import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { nav, site } from '../data/site';
import { useCart } from '../context/CartContext';

export default function Header({ overlay = false }) {
  const { count, openCart } = useCart();
  const [menu, setMenu] = useState(false);
  const loc = useLocation();
  const current = loc.pathname + loc.search;

  useEffect(() => setMenu(false), [loc.pathname, loc.search]);
  useEffect(() => {
    document.body.style.overflow = menu ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menu]);

  return (
    <>
      {site.showPlaceholderNotice && (
        <div className="notice">SAMPLE PRICES AND PLACEHOLDERS. FINAL DETAILS AT LAUNCH.</div>
      )}
      <header className={`header ${overlay ? 'header--overlay' : ''}`}>
        <div className="header__bar">
          <button
            type="button"
            className="icon-btn header__burger"
            aria-label="Open menu"
            aria-expanded={menu}
            onClick={() => setMenu(true)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
              <path d="M4 8h16M4 16h16" />
            </svg>
          </button>
          <Link to="/" className="header__logo" aria-label="FLAME home">
            <Logo variant="white" width={132} />
          </Link>
          <nav className="header__nav" aria-label="Main">
            {nav.map((n) => (
              <NavLink key={n.label} to={n.to} className={current === n.to ? 'is-active' : undefined} end>
                {n.label}
              </NavLink>
            ))}
          </nav>
          <div className="header__tools">
            <button type="button" className="icon-btn" aria-label={`Open cart, ${count} items`} onClick={openCart}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 8h14l-1 12H6L5 8z" />
                <path d="M9 8V6a3 3 0 0 1 6 0v2" />
              </svg>
              {count > 0 && <span className="header__count">{count}</span>}
            </button>
          </div>
        </div>
      </header>

      <div className={`drawer-nav ${menu ? 'is-open' : ''}`} aria-hidden={!menu}>
        <button type="button" className="drawer-nav__scrim" aria-label="Close menu" onClick={() => setMenu(false)} tabIndex={menu ? 0 : -1} />
        <div className="drawer-nav__panel">
          <button type="button" className="icon-btn drawer-nav__close" aria-label="Close menu" onClick={() => setMenu(false)} tabIndex={menu ? 0 : -1}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          {nav.map((n) => (
            <Link key={n.label} to={n.to} tabIndex={menu ? 0 : -1}>
              {n.label}
            </Link>
          ))}
          <Link to="/about" tabIndex={menu ? 0 : -1}>ABOUT</Link>
        </div>
      </div>
    </>
  );
}
