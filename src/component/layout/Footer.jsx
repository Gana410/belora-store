import { Link } from "react-router-dom";
import Logo from "../common/Logo";
import { CATALOG_CATEGORIES } from "../../data/catalog";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Logo light />
          <p>Beauty and fashion, curated with care. Thoughtful pieces for your everyday rituals.</p>
        </div>

        <div>
          <h4>Shop</h4>
          <ul>
            {CATALOG_CATEGORIES.slice(0, 6).map((c) => (
              <li key={c.slug}>
                <Link to={`/category/${c.slug}`}>{c.label}</Link>
              </li>
            ))}
            <li>
              <Link to="/shop">All products</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4>Belora</h4>
          <ul>
            <li>
              <Link to="/about">About us</Link>
            </li>
            <li>
              <Link to="/contact">Contact us</Link>
            </li>
            <li>
              <Link to="/wishlist">Wishlist</Link>
            </li>
            <li>
              <Link to="/cart">Shopping cart</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container">
          <p>© {new Date().getFullYear()} Belora. A portfolio demo store — no real orders or payments are processed.</p>
          <p>Product data by DummyJSON.</p>
        </div>
      </div>
    </footer>
  );
}
