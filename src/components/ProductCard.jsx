import { Link } from 'react-router-dom';
import ProductArt from './ProductArt';
import { formatPrice } from '../data/products';

export default function ProductCard({ item, soldOut = false }) {
  return (
    <Link to={`/product/${item.slug}?v=${item.logo}`} className="card">
      <div className="card__media">
        <div className="card__art">
          <ProductArt kind={item.kind} logo={item.logo} />
        </div>
        {soldOut && <span className="card__badge">SOLD OUT</span>}
      </div>
      <div className="card__meta">
        <span className="card__title">{item.title}</span>
        <span className="card__variant">{item.variantLabel}</span>
        <span className="card__price">{formatPrice(item.price)}</span>
      </div>
    </Link>
  );
}
