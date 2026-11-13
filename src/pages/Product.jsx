import { useEffect, useRef, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import ProductArt from '../components/ProductArt';
import ProductCard from '../components/ProductCard';
import { products, formatPrice, getProduct } from '../data/products';
import { useCart } from '../context/CartContext';
import { useSeo } from '../hooks/useSeo';
import { filled, isFilled } from '../data/site';
import NotFound from './NotFound';

// Customer-facing info blocks. Anything still a [PLACEHOLDER] is hidden automatically.
const INFO = {
  sizeGuide: '[SIZE CHART FROM MEASURED SAMPLES]',
  care: 'Turn inside out. Wash cold with dark colours. Do not tumble dry. [CONFIRM AFTER WASH TESTS]',
  delivery: '[DELIVERY WINDOW, AREAS AND RETURN POLICY]',
};
// Strip a trailing "[...]" note so the confirmed part of a sentence can still show.
const clean = (t) => t.replace(/\s*\[[^\]]*\]\s*$/, '').trim();

export default function Product() {
  const { slug } = useParams();
  const product = getProduct(slug);
  const [params, setParams] = useSearchParams();
  const logo = params.get('v') === 'white' ? 'white' : 'black';
  const [size, setSize] = useState(null);
  const [error, setError] = useState('');
  const [added, setAdded] = useState(false);
  const sizeGuideRef = useRef(null);
  const { add } = useCart();

  useSeo(product ? `${product.title}` : 'Not found', product?.description);
  useEffect(() => {
    setSize(product && product.sizes.length === 1 ? product.sizes[0] : null);
    setError('');
    setAdded(false);
  }, [slug, product]);

  useEffect(() => {
    if (!added) return undefined;
    const t = setTimeout(() => setAdded(false), 2200);
    return () => clearTimeout(t);
  }, [added]);

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
    add({ slug: product.slug, logo, size });
    setAdded(true);
  };

  const details = filled(product.details);
  const care = clean(INFO.care);
  const sections = [
    { id: 'description', title: 'Description', open: true, body: <p>{product.description}</p> },
    details.length > 0 && { id: 'details', title: 'Details', body: <ul>{details.map((d) => <li key={d}>{d}</li>)}</ul> },
    isFilled(INFO.sizeGuide) && { id: 'sizeguide', title: 'Size guide', body: <p>{INFO.sizeGuide}</p>, ref: sizeGuideRef },
    isFilled(care) && { id: 'care', title: 'Care', body: <p>{care}</p> },
    isFilled(INFO.delivery) && { id: 'delivery', title: 'Delivery and returns', body: <p>{INFO.delivery}</p> },
  ].filter(Boolean);

  const openSizeGuide = (e) => {
    e.preventDefault();
    const d = sizeGuideRef.current;
    if (!d) return;
    d.open = true;
    d.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);
  const multiSize = product.sizes.length > 1;

  return (
    <>
      <section className="pdp">
        <div className="pdp__gallery">
          <div className="pdp__main">
            <div className="pdp__art" key={logo}>
              <ProductArt kind={product.kind} logo={logo} />
            </div>
          </div>
          <div className="pdp__thumbs" role="group" aria-label="Logo version">
            {['black', 'white'].map((v) => (
              <button key={v} type="button" className={logo === v ? 'is-on' : ''} aria-label={product.variants[v]} aria-pressed={logo === v} onClick={() => setLogo(v)}>
                <div className="pdp__thumbart"><ProductArt kind={product.kind} logo={v} /></div>
                <span>{v === 'black' ? 'Tonal' : 'Visible'}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="pdp__info">
          <div className="pdp__sticky">
            <nav className="crumbs" aria-label="Breadcrumb">
              <Link to="/shop">Shop</Link>
              <span aria-hidden="true">/</span>
              <Link to={`/shop?c=${product.category}`}>{product.category}</Link>
            </nav>
            <div className="pdp__head">
              <h1 className="pdp__title">{product.title}</h1>
              <span className="pdp__price">{formatPrice(product.price)}</span>
            </div>

            <div className="field">
              <div className="field__row">
                <span className="field__label">Logo</span>
                <span className="field__value">{product.variants[logo]}</span>
              </div>
              <div className="opts opts--2">
                {['black', 'white'].map((v) => (
                  <button key={v} type="button" className={`opt ${logo === v ? 'is-on' : ''}`} aria-pressed={logo === v} onClick={() => setLogo(v)}>
                    <i className={`sw sw--${v === 'black' ? 'tonal' : 'visible'}`} aria-hidden="true" />
                    {v === 'black' ? 'Tonal' : 'Visible'}
                  </button>
                ))}
              </div>
            </div>

            {multiSize ? (
              <div className="field">
                <div className="field__row">
                  <span className="field__label">Size{size ? <span className="field__value"> · {size}</span> : null}</span>
                  {isFilled(INFO.sizeGuide) && (
                    <a className="link-u link-u--sm" href="#sizeguide" onClick={openSizeGuide}>Size guide</a>
                  )}
                </div>
                <div className="opts opts--sizes">
                  {product.sizes.map((s) => (
                    <button key={s} type="button" className={`opt ${size === s ? 'is-on' : ''}`} aria-pressed={size === s} onClick={() => { setSize(s); setError(''); }}>
                      {s}
                    </button>
                  ))}
                </div>
                {error && <span role="alert" className="field__error">{error}</span>}
              </div>
            ) : (
              <div className="field">
                <div className="field__row">
                  <span className="field__label">Size</span>
                  <span className="field__value">One size</span>
                </div>
              </div>
            )}

            <button type="button" className={`btn btn--solid btn--block btn--tall ${added ? 'is-added' : ''}`} onClick={addToCart}>
              {added ? 'Added to cart' : 'Add to cart'}
            </button>

            <div className="acc">
              {sections.map((s) => (
                <details key={s.id} id={s.id} open={s.open} ref={s.ref}>
                  <summary>{s.title}</summary>
                  <div className="acc__body">{s.body}</div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--sand">
        <div className="section__head">
          <div>
            <div className="eyebrow">Complete the set</div>
            <h2 className="display">You may also like</h2>
          </div>
        </div>
        <div className="grid4 grid4--3">
          {related.map((p) => <ProductCard key={p.slug} item={p} />)}
        </div>
      </section>
    </>
  );
}
