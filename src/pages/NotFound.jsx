import { Link } from 'react-router-dom';
import { useSeo } from '../hooks/useSeo';

export default function NotFound() {
  useSeo('Not found');
  return (
    <section className="page-hero page-hero--tall">
      <div className="eyebrow eyebrow--light">404</div>
      <h1 className="display display--xxl">Gone dark.</h1>
      <p className="lede lede--light">That page does not exist.</p>
      <Link to="/shop" className="btn btn--ghost">BACK TO THE SHOP</Link>
    </section>
  );
}
