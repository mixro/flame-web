import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import ProductArt from '../components/ProductArt';
import ProductCard from '../components/ProductCard';
import { catalogue, formatPrice, getProduct } from '../data/products';
import { useCart } from '../context/CartContext';
import { useSeo } from '../hooks/useSeo';
import NotFound from './NotFound';

export default function Product() {
  const { slug } = useParams();
  const product = getProduct(slug);
  const [params, setParams] = useSearchParams();
  const logo = params.get('v') === 'white' ? 'white' : 'black';
  const [size, setSize] = useState(null);
  const [error, setError] = useState('');
  const { add } = useCart();

  useSeo(product?.title, product?.description);
  useEffect(() => {
    setSize(product && product.sizes.length === 1 ? product.sizes[0] : null);
    setError('');
  }, [slug, product]);

  if (!product) return <NotFound />;

  const setLogo = (v) => {
    const next = new URLSearchParams(params);
    next.set('v', v);
    setParams(next, { replace: true });
  };

  const addToCart = () => {
    if (!size) {
      setError('Please choose a size.');
      return;
    }
    setError('');
    add({
      key: `${product.slug}:${logo}:${size}`,
      slug: product.slug,
      title: product.title,
      kind: product.kind,
      logo,
      size,
      variantLabel: product.variants[logo],
      price: product.price,
    });
  };

  const related = catalogue.filter((i) => i.slug !== product.slug && i.logo === 'black').slice(0, 3);
  const more = catalogue.find((i) => i.slug === product.slug && i.logo !== logo);

  return (
    <>
      <div className="pdp-spacer" />
      <section className="pdp">
        <div className="pdp__gallery">
          <div className="pdp__main"><div className="pdp__art"><ProductArt kind={product.kind} logo={logo} /></div></div>
          <div className="pdp__thumbs">
            {['black', 'white'].map((v) => (
              <button key={v} type="button" className={logo === v ? 'is-on' : ''} aria-label={`${product.variants[v]} view`} aria-pressed={logo === v} onClick={() => setLogo(v)}>
                <div className="pdp__thumbart"><ProductArt kind={product.kind} logo={v} /></div>
              </button>
            ))}
          </div>
        </div>

        <div className="pdp__info">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/shop">SHOP</Link> / <Link to={`/shop?c=${product.category}`}>{product.category.toUpperCase()}</Link>
          </nav>
          <h1 className="pdp__title">FLAME {product.title}</h1>
          <span className="pdp__price">{formatPrice(product.price)}</span>

          <div className="field">
            <span className="eyebrow">LOGO: {logo === 'white' ? 'VISIBLE' : 'TONAL'}</span>
            <div className="opts">
              {['black', 'white'].map((v) => (
                <button key={v} type="button" className={`opt ${logo === v ? 'is-on' : ''}`} aria-pressed={logo === v} onClick={() => setLogo(v)}>
                  {v === 'black' ? 'TONAL' : 'VISIBLE'}
                </button>
              ))}
            </div>
          </div>

          <div className="field">
            <div className="field__row">
              <span className="eyebrow">SIZE: {size || '—'}</span>
              <a className="eyebrow" href="#sizeguide">SIZE GUIDE</a>
            </div>
            <div className="opts">
              {product.sizes.map((s) => (
                <button key={s} type="button" className={`opt opt--size ${size === s ? 'is-on' : ''}`} aria-pressed={size === s} onClick={() => { setSize(s); setError(''); }}>
                  {s}
                </button>
              ))}
            </div>
            {error && <span role="alert" className="field__error">{error}</span>}
          </div>

          <button type="button" className="btn btn--solid btn--block btn--tall" onClick={addToCart}>ADD TO CART</button>
          <span className="pdp__note">[DELIVERY WINDOW AND AREAS]. [PAYMENT METHODS].</span>

          <div className="acc">
            <details open><summary>DESCRIPTION</summary><p>{product.description}</p></details>
            <details><summary>DETAILS</summary><ul>{product.details.map((d) => <li key={d}>{d}</li>)}</ul></details>
            <details id="sizeguide"><summary>SIZE GUIDE</summary><p>[SIZE CHART FROM MEASURED SAMPLES]</p></details>
            <details><summary>CARE</summary><p>Turn inside out. Wash cold with dark colours. [CONFIRM AFTER WASH TESTS]</p></details>
            <details><summary>DELIVERY AND RETURNS</summary><p>[DELIVERY WINDOW, AREAS AND RETURN POLICY]</p></details>
          </div>
        </div>
      </section>

      <section className="section section--sand">
        <div className="section__head section__head--col">
          <div className="eyebrow">COMPLETE THE SET</div>
          <h2 className="display">You may also like</h2>
        </div>
        <div className="grid4">
          {related.map((i) => <ProductCard key={i.key} item={i} />)}
          {more && <ProductCard item={more} />}
        </div>
      </section>
    </>
  );
}
