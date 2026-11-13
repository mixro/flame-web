import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';
import { useSeo } from '../hooks/useSeo';

const SORTS = {
  featured: { label: 'Featured', fn: null },
  'price-asc': { label: 'Price, low to high', fn: (a, b) => (a.price ?? Infinity) - (b.price ?? Infinity) },
  'price-desc': { label: 'Price, high to low', fn: (a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity) },
  name: { label: 'Name, A to Z', fn: (a, b) => a.title.localeCompare(b.title) },
};

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const cat = params.get('c') || 'all';
  const sort = SORTS[params.get('sort')] ? params.get('sort') : 'featured';
  const cols = params.get('view') === '2' ? 2 : 4;
  const active = categories.find((c) => c.id === cat);
  useSeo(active ? active.label : 'Shop', 'Hoodies, tees, headwear and bags in one deep black.');

  // Price sorts only make sense once real prices are in.
  const hasPrices = products.some((p) => p.price != null);
  const sortOptions = Object.entries(SORTS).filter(([k]) => hasPrices || !k.startsWith('price'));

  const list = useMemo(() => {
    const out = cat === 'all' ? products : products.filter((i) => i.category === cat);
    const fn = SORTS[sort].fn;
    return fn ? [...out].sort(fn) : out;
  }, [cat, sort]);

  const update = (key, value, fallback) => {
    const next = new URLSearchParams(params);
    if (value === fallback) next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: key !== 'c' });
  };

  return (
    <>
      <section className="page-hero">
        <div className="eyebrow eyebrow--light">{active ? 'Collection' : 'Drop 001'}</div>
        <h1 className="display display--xxl">{active ? active.label : 'The collection'}</h1>
        <p className="lede lede--light">
          Hoodies, tees, headwear and bags in one deep black. Every piece comes with a tonal or a visible logo.
        </p>
      </section>

      <section className="toolbar" aria-label="Filter and sort">
        <div className="chips" role="group" aria-label="Filter by category">
          <button type="button" aria-pressed={cat === 'all'} onClick={() => update('c', 'all', 'all')}>All</button>
          {categories.map((c) => (
            <button key={c.id} type="button" aria-pressed={cat === c.id} onClick={() => update('c', c.id, 'all')}>
              {c.label}
            </button>
          ))}
        </div>
        <div className="toolbar__right">
          <span className="toolbar__count" aria-live="polite">
            {list.length} {list.length === 1 ? 'product' : 'products'}
          </span>
          <label className="select">
            <span className="sr-only">Sort by</span>
            <select value={sort} onChange={(e) => update('sort', e.target.value, 'featured')}>
              {sortOptions.map(([k, v]) => (
                <option key={k} value={k}>{v.label}</option>
              ))}
            </select>
          </label>
          <div className="view-toggle" role="group" aria-label="Grid size">
            <button type="button" className={cols === 2 ? 'is-on' : ''} aria-label="Large tiles" aria-pressed={cols === 2} onClick={() => update('view', '2', '4')}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="3" y="3" width="8" height="18" /><rect x="13" y="3" width="8" height="18" /></svg>
            </button>
            <button type="button" className={cols === 4 ? 'is-on' : ''} aria-label="Small tiles" aria-pressed={cols === 4} onClick={() => update('view', '4', '4')}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="2" y="3" width="4" height="18" /><rect x="7.33" y="3" width="4" height="18" /><rect x="12.66" y="3" width="4" height="18" /><rect x="18" y="3" width="4" height="18" /></svg>
            </button>
          </div>
        </div>
      </section>

      <section className="section section--white section--shop">
        <div className={`grid4 grid4--shop cols-${cols}`}>
          {list.map((item) => (
            <ProductCard key={item.slug} item={item} />
          ))}
        </div>
      </section>
    </>
  );
}
