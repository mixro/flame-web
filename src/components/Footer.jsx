import { Link } from 'react-router-dom';
import Logo from './Logo';
import { site } from '../data/site';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <Logo variant="white" width={150} />
          <p>One black. Real texture. Premium streetwear from Tanzania.</p>
        </div>
        <div className="footer__col">
          <h3>SHOP</h3>
          <Link to="/shop">All products</Link>
          <Link to="/shop?c=hoodies">Hoodies</Link>
          <Link to="/shop?c=tees">Tees</Link>
          <Link to="/shop?c=headwear">Headwear</Link>
          <Link to="/shop?c=bags">Bags</Link>
        </div>
        <div className="footer__col">
          <h3>FLAME</h3>
          <Link to="/about">About</Link>
          <Link to="/journal">Journal</Link>
          <a href="#delivery" onClick={(e) => e.preventDefault()}>Delivery and returns</a>
          <a href="#size" onClick={(e) => e.preventDefault()}>Size guide</a>
        </div>
        <div className="footer__col">
          <h3>CONTACT</h3>
          <span>{site.whatsapp}</span>
          <span>{site.email}</span>
          <span>{site.instagram}</span>
        </div>
      </div>
      <div className="footer__bottom">
        <span>© {new Date().getFullYear()} FLAME™. All rights reserved.</span>
        <span>Dar es Salaam, Tanzania</span>
      </div>
    </footer>
  );
}
