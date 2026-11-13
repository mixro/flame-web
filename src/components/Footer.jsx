import { Link } from 'react-router-dom';
import Logo from './Logo';
import { instagramLink, isFilled, site, whatsappLink } from '../data/site';
import { categories } from '../data/products';

export default function Footer() {
  const wa = whatsappLink();
  const ig = instagramLink();
  const email = isFilled(site.email) ? site.email : null;
  const hasContact = wa || ig || email;

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <Logo variant="white" width={140} />
          <p>One black. Real texture. Premium streetwear from Tanzania.</p>
        </div>
        <nav className="footer__col" aria-label="Shop">
          <h3>Shop</h3>
          <Link to="/shop">All products</Link>
          {categories.map((c) => (
            <Link key={c.id} to={`/shop?c=${c.id}`}>{c.label}</Link>
          ))}
        </nav>
        <nav className="footer__col" aria-label="FLAME">
          <h3>FLAME</h3>
          <Link to="/about">About</Link>
          <Link to="/journal">Journal</Link>
        </nav>
        {hasContact && (
          <div className="footer__col">
            <h3>Contact</h3>
            {wa && <a href={wa} target="_blank" rel="noopener noreferrer">WhatsApp</a>}
            {email && <a href={`mailto:${email}`}>{email}</a>}
            {ig && <a href={ig} target="_blank" rel="noopener noreferrer">Instagram</a>}
          </div>
        )}
      </div>
      <div className="footer__bottom">
        <span>© {new Date().getFullYear()} FLAME™. All rights reserved.</span>
        <span>{site.location}</span>
      </div>
    </footer>
  );
}
