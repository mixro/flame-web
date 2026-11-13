import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import { site } from '../data/site';

// Pages that open with a full-bleed black hero: the header floats over them.
const OVERLAY = ['/', '/shop', '/about'];

export default function Layout() {
  const { pathname } = useLocation();
  const overlay = OVERLAY.includes(pathname);

  // Jump (not smooth-scroll) to the top on a new page.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div className={`site ${site.showPlaceholderNotice ? 'has-notice' : ''}`}>
      <a href="#main" className="skip">Skip to content</a>
      <Header overlay={overlay} />
      <main id="main" tabIndex={-1} className={overlay ? undefined : 'main--offset'}>
        <Suspense fallback={<div className="page-loading" aria-busy="true" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
