import { Link } from 'react-router-dom';
import ProductArt from '../components/ProductArt';
import ProductCard from '../components/ProductCard';
import SmartImage from '../components/SmartImage';
import Newsletter from '../components/Newsletter';
import { catalogue } from '../data/products';
import { stories } from '../data/journal';
import { useSeo } from '../hooks/useSeo';
import { useReveal } from '../hooks/useReveal';
import { isFilled, site } from '../data/site';

const drop = ['duality-hoodie:black', 'core-tee:black', 'shadow-beanie:white', 'voyage-tote:white']
  .map((k) => catalogue.find((c) => c.key === k));

const tiles = [
  { label: 'Hoodies', kind: 'hoodie', to: '/shop?c=hoodies' },
  { label: 'Tees', kind: 'tee', to: '/shop?c=tees' },
  { label: 'Headwear', kind: 'beanie', to: '/shop?c=headwear' },
  { label: 'Bags', kind: 'tote', to: '/shop?c=bags' },
];

// Fill these in to show the service strip near the footer. [PLACEHOLDERS] stay hidden.
const trust = [
  ['Delivery', '[DELIVERY WINDOW AND AREAS]'],
  ['Returns', '[RETURN POLICY]'],
  ['Secure payment', '[PAYMENT METHODS]'],
  ['Support', isFilled(site.whatsapp) ? `WhatsApp ${site.whatsapp}` : isFilled(site.email) ? site.email : ''],
].filter(([, t]) => isFilled(t));

const pillars = [
  ['01', 'Texture is the colour', 'Heavy fabrics, raised print, dense embroidery and woven labels give every piece depth without adding a single colour.'],
  ['02', 'The logo, quietly', 'Black thread on black cloth. Seen when the light moves, never shouted. The white version is saved for pieces that should be seen.'],
  ['03', 'A single red A', 'Red lives in one place only: the A in our name. Look for it inside the neck, on a tab, on the seal of the box.'],
];

export default function Home() {
  useSeo('', 'FLAME is an all-black premium streetwear label from Tanzania. Lit from within.');
  useReveal();
  return (
    <>
      <section className="hero">
        <div className="hero__copy">
          <div className="eyebrow eyebrow--light">DROP 001</div>
          <h1 className="hero__title">
            Lit from
            <br />
            <em>within.</em>
          </h1>
          <p className="lede lede--light">
            One deep black, built with texture. Hoodies, tees and accessories where the logo shows through thread and relief, not colour.
          </p>
          <div className="btn-row">
            <Link to="/shop" className="btn btn--light">Shop the drop</Link>
            <Link to="/shop?c=hoodies" className="btn btn--ghost">Hoodies</Link>
          </div>
        </div>
        <div className="hero__art">
          <ProductArt kind="hoodie" logo="white" />
        </div>
        <span className="hero__scroll" aria-hidden="true">Scroll</span>
      </section>

      <section className="section section--sand">
        <div className="section__head reveal">
          <div>
            <div className="eyebrow">NEW THIS DROP</div>
            <h2 className="display">The first drop</h2>
          </div>
          <Link to="/shop" className="link-u">View all</Link>
        </div>
        <div className="grid4 reveal">
          {drop.map((item) => (
            <ProductCard key={item.key} item={item} />
          ))}
        </div>
      </section>

      <section className="banner">
        <div className="banner__copy">
          <div className="eyebrow eyebrow--light">THE BLACK SYSTEM</div>
          <h2 className="display display--xl">
            Quiet design.
            <br />
            <em>Bold presence.</em>
          </h2>
          <p>Black thread on black cloth. A logo you notice when the light moves, never one that shouts.</p>
          <div>
            <Link to="/shop" className="btn btn--ghost">Shop the collection</Link>
          </div>
        </div>
        <div className="banner__media">
          <SmartImage name="hoodieSeated" sizes="(max-width: 900px) 100vw, 45vw" ratio={4 / 5} />
        </div>
      </section>

      <section className="section section--white">
        <div className="section__head reveal">
          <div>
            <div className="eyebrow">EXPLORE</div>
            <h2 className="display">Shop by piece</h2>
          </div>
        </div>
        <div className="tiles reveal">
          {tiles.map((t) => (
            <Link key={t.label} to={t.to} className="tile">
              <div className="tile__art"><ProductArt kind={t.kind} logo="white" /></div>
              <div className="tile__label">
                <span>{t.label}</span>
                <small>Shop →</small>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section section--sand">
        <div className="section__head section__head--col reveal">
          <div className="eyebrow">WHY ALL BLACK</div>
          <h2 className="display display--lg">
            One black.
            <br />
            <em className="em-dark">Real texture.</em>
          </h2>
        </div>
        <div className="grid3 reveal">
          {pillars.map(([n, t, p]) => (
            <div key={n} className="pillar">
              <span className="eyebrow">{n}</span>
              <span className="pillar__title">{t}</span>
              <p>{p}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section section--white">
        <div className="section__head reveal">
          <div>
            <div className="eyebrow">THE JOURNAL</div>
            <h2 className="display">Latest stories</h2>
          </div>
          <Link to="/journal" className="link-u">All stories</Link>
        </div>
        <div className="grid3 reveal">
          {stories.map((s) => (
            <Link key={s.slug} to={`/journal/${s.slug}`} className="story">
              <SmartImage name={s.photo} ratio={4 / 3} sizes="(max-width: 900px) 100vw, 33vw" />
              {isFilled(s.date) && <span className="eyebrow">{s.date}</span>}
              <span className="story__title">{s.title}</span>
              <span className="story__excerpt">{s.excerpt}</span>
              <span className="link-u link-u--sm">Read the story</span>
            </Link>
          ))}
        </div>
      </section>

      {trust.length > 0 && (
        <section className="trust">
          {trust.map(([h, t]) => (
            <div key={h}>
              <span className="eyebrow eyebrow--ink">{h}</span>
              <span>{t}</span>
            </div>
          ))}
        </section>
      )}

      <Newsletter />
    </>
  );
}
