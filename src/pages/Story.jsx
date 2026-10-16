import { Link, useParams } from 'react-router-dom';
import SmartImage from '../components/SmartImage';
import { stories } from '../data/journal';
import { photos } from '../data/images';
import { useSeo } from '../hooks/useSeo';
import NotFound from './NotFound';

export default function Story() {
  const { slug } = useParams();
  const story = stories.find((s) => s.slug === slug);
  useSeo(story?.title, story?.excerpt);
  if (!story) return <NotFound />;
  const p = photos[story.photo];
  return (
    <>
      <div className="pdp-spacer" />
      <article className="article">
        <Link to="/journal" className="eyebrow">← ALL STORIES</Link>
        <span className="eyebrow">{story.date}</span>
        <h1 className="display display--lg">{story.title}</h1>
        <SmartImage name={story.photo} ratio={3 / 2} priority sizes="(max-width: 900px) 100vw, 880px" />
        <small className="credit">Photo: <a href={p.page} target="_blank" rel="noreferrer">{p.credit}</a> / Unsplash</small>
        {story.body.map((t) => <p key={t}>{t}</p>)}
      </article>
    </>
  );
}
