import { Link } from "react-router-dom";
import { CATALOG_CATEGORIES } from "../../data/catalog";

function NotFound({ message = "The page you're looking for doesn't exist or has moved." }) {
  return (
    <div className="container not-found section-pad">
      <p className="not-found__code">404</p>
      <h1>Page not found</h1>
      <p>{message}</p>
      <div className="not-found__actions">
        <Link to="/" className="btn btn--primary">
          Back to home
        </Link>
        <Link to="/shop" className="btn btn--outline">
          Browse the shop
        </Link>
      </div>
      <div className="chips chips--center">
        {CATALOG_CATEGORIES.slice(0, 6).map((c) => (
          <Link key={c.slug} to={`/category/${c.slug}`} className="chip">
            {c.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default NotFound;
