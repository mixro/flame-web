import { Link, useParams } from 'react-router-dom';
import SmartImage from '../components/SmartImage';
import { stories } from '../data/journal';
import { photos } from '../data/images';
import { useSeo } from '../hooks/useSeo';
import { filled, isFilled } from '../data/site';
import NotFound from './NotFound';

export default function Story() {
  const { slug } = useParams();
  const story = stories.find((s) => s.slug === slug);
  useSeo(story?.title, story?.excerpt);
  if (!story) return <NotFound />;
  const p = photos[story.photo];
  return (
    <>
      <div className="article-page">
      <article className="article">
        <Link to="/journal" className="eyebrow">← ALL STORIES</Link>
        <header className="article__head">
          {isFilled(story.date) && <span className="eyebrow">{story.date}</span>}
          <h1 className="display display--lg">{story.title}</h1>
          <p className="article__lede">{story.excerpt}</p>
        </header>
        <SmartImage name={story.photo} ratio={3 / 2} priority sizes="(max-width: 900px) 100vw, 880px" />
        <small className="credit">Photo: <a href={p.page} target="_blank" rel="noreferrer">{p.credit}</a> / Unsplash</small>
        <div className="article__body">
          {filled(story.body).map((t, n) => <p key={n}>{t}</p>)}
        </div>
        <Link to="/journal" className="link-u link-u--sm">More stories</Link>
      </article>
      </div>
    </>
  );
}
