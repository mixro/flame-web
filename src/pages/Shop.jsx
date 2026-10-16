import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { catalogue, categories } from '../data/products';
import { useSeo } from '../hooks/useSeo';

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const cat = params.get('c') || 'all';
  const [sort, setSort] = useState('featured');
  const [cols, setCols] = useState(4);
  const active = categories.find((c) => c.id === cat);
  useSeo(active ? active.label : 'Shop', 'Hoodies, tees, headwear and bags in one deep black.');

  const list = useMemo(() => {
    let out = cat === 'all' ? catalogue : catalogue.filter((i) => i.category === cat);
    if (sort === 'name') out = [...out].sort((a, b) => a.title.localeCompare(b.title));
    if (sort === 'newest') out = [...out].reverse();
    return out;
  }, [cat, sort]);

  const setCat = (id) => {
    const next = new URLSearchParams(params);
    if (id === 'all') next.delete('c');
    else next.set('c', id);
    setParams(next);
  };

  return (
    <>
      <section className="page-hero">
        <div className="eyebrow eyebrow--light">COLLECTION</div>
        <h1 className="display display--xxl">{active ? active.label : 'Drop 001'}</h1>
        <p className="lede lede--light">
          Hoodies, tees, headwear and bags in one deep black. Each piece in a tonal and a visible logo.
        </p>
      </section>

      <section className="toolbar">
        <div className="chips" role="group" aria-label="Filter by category">
          <button type="button" aria-pressed={cat === 'all'} onClick={() => setCat('all')}>ALL</button>
          {categories.map((c) => (
            <button key={c.id} type="button" aria-pressed={cat === c.id} onClick={() => setCat(c.id)}>
              {c.label.toUpperCase()}
            </button>
          ))}
        </div>
        <span className="toolbar__count">{list.length} products</span>
        <div className="toolbar__right">
          <label htmlFor="sort" className="sr-only">Sort by</label>
          <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="name">Name, A to Z</option>
          </select>
          <button type="button" className={`icon-btn icon-btn--dark ${cols === 2 ? 'is-on' : ''}`} aria-label="Two columns" aria-pressed={cols === 2} onClick={() => setCols(2)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="4" y="4" width="7" height="16" /><rect x="13" y="4" width="7" height="16" /></svg>
          </button>
          <button type="button" className={`icon-btn icon-btn--dark ${cols === 4 ? 'is-on' : ''}`} aria-label="Four columns" aria-pressed={cols === 4} onClick={() => setCols(4)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="3" y="4" width="4" height="16" /><rect x="9" y="4" width="4" height="16" /><rect x="15" y="4" width="4" height="16" /></svg>
          </button>
        </div>
      </section>

      <section className="section section--white section--shop">
        <div className={`grid4 grid4--shop cols-${cols}`}>
          {list.map((item) => (
            <ProductCard key={item.key} item={item} />
          ))}
        </div>
      </section>
    </>
  );
}
