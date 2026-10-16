import { Link } from 'react-router-dom';
import SmartImage from '../components/SmartImage';
import Newsletter from '../components/Newsletter';
import { useSeo } from '../hooks/useSeo';

export default function About() {
  useSeo('About', 'FLAME is built on one idea: Lit from within.');
  return (
    <>
      <section className="page-hero page-hero--tall">
        <div className="eyebrow eyebrow--light">ABOUT</div>
        <h1 className="display display--xxl">Lit from <em>within.</em></h1>
      </section>
      <section className="split">
        <div className="split__media">
          <SmartImage name="skyward" priority ratio={4 / 5} sizes="(max-width: 900px) 100vw, 50vw" />
        </div>
        <div className="split__copy">
          <div className="eyebrow">OUR STORY</div>
          <h2 className="display">Quiet design. Bold presence.</h2>
          <p>FLAME is a premium streetwear label from Tanzania, made in one deep black. We believe the strongest presence is the one you carry yourself.</p>
          <p>Every piece is considered, expressive and worth choosing: heavy fabrics, tonal logos, and a single red A.</p>
          <p>[FOUNDER STORY AND MANUFACTURING DETAILS TO BE ADDED]</p>
          <div><Link to="/shop" className="btn btn--solid">SHOP THE COLLECTION</Link></div>
        </div>
      </section>
      <Newsletter />
    </>
  );
}
