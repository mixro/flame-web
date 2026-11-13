import { Link } from 'react-router-dom';
import ProductImage from './ProductImage';
import { formatPrice } from '../data/products';

/**
 * One card per product. Shows the chosen logo version and, on hover, the other
 * one, so the shop doesn't list every product twice.
 * Accepts a product from `products` (with `variants`) or a `catalogue` entry.
 */
export default function ProductCard({ item, logo, soldOut = false }) {
  const shown = logo || item.logo || 'black';
  const other = shown === 'black' ? 'white' : 'black';
  const label = item.variants ? item.variants[shown] : item.variantLabel;
  return (
    <Link to={`/product/${item.slug}?v=${shown}`} className="card">
      <div className="card__media">
        <div className="card__art card__art--main">
          <ProductImage kind={item.kind} logo={shown} />
        </div>
        <div className="card__art card__art--alt" aria-hidden="true">
          <ProductImage kind={item.kind} logo={other} alt="" />
        </div>
        {soldOut && <span className="card__badge">Sold out</span>}
        <span className="card__cta" aria-hidden="true">View</span>
      </div>
      <div className="card__meta">
        <div className="card__row">
          <span className="card__title">{item.title}</span>
          <span className="card__price">{formatPrice(item.price)}</span>
        </div>
        <div className="card__row">
          <span className="card__variant">{label}</span>
          <span className="card__swatches" aria-label="Available with a tonal or a visible logo">
            <i className="sw sw--tonal" />
            <i className="sw sw--visible" />
          </span>
        </div>
      </div>
    </Link>
  );
}
