import { Link } from 'react-router-dom';
import SmartImage from '../components/SmartImage';
import { stories } from '../data/journal';
import { useSeo } from '../hooks/useSeo';

export default function Journal() {
  useSeo('Journal', 'Stories from FLAME.');
  return (
    <>
      <div className="pdp-spacer" />
      <section className="section section--white section--top">
        <div className="section__head section__head--col">
          <div className="eyebrow">THE JOURNAL</div>
          <h1 className="display display--lg">Latest stories</h1>
        </div>
        <div className="grid3">
          {stories.map((s) => (
            <Link key={s.slug} to={`/journal/${s.slug}`} className="story">
              <SmartImage name={s.photo} ratio={4 / 3} sizes="(max-width: 900px) 100vw, 33vw" />
              <span className="eyebrow">{s.date}</span>
              <span className="story__title">{s.title}</span>
              <span className="story__excerpt">{s.excerpt}</span>
              <span className="eyebrow eyebrow--ink">READ MORE</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
