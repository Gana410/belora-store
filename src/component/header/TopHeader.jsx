import { Link, useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { FiHeart, FiMenu, FiSearch, FiShoppingBag, FiX } from "react-icons/fi";
import Logo from "../common/Logo";
import { useCart } from "../../hooks/useCart";
import { useWishlist } from "../../hooks/useWishlist";

function TopHeader({ menuOpen, onToggleMenu }) {
  const { itemCount } = useCart();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const currentQuery = location.pathname === "/search" ? (params.get("q") ?? "") : "";

  const handleSearch = (e) => {
    e.preventDefault();
    const query = new FormData(e.currentTarget).get("search")?.toString().trim();
    if (!query) return;
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="top_header">
      <div className="container top_header__inner">
        <button
          type="button"
          className="icon-btn menu-toggle"
          onClick={onToggleMenu}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        <Logo />

        <form className="search_box" role="search" onSubmit={handleSearch}>
          <FiSearch className="search_box__icon" aria-hidden="true" />
          <input
            key={currentQuery}
            type="search"
            name="search"
            defaultValue={currentQuery}
            placeholder="Search for products, brands…"
            aria-label="Search products"
            autoComplete="off"
          />
          <button type="submit">Search</button>
        </form>

        <div className="header_icons">
          <Link to="/wishlist" className="icon-btn" aria-label={`Wishlist, ${wishlistCount} items`}>
            <FiHeart />
            {wishlistCount > 0 && <span className="count">{wishlistCount}</span>}
          </Link>
          <Link to="/cart" className="icon-btn" aria-label={`Cart, ${itemCount} items`}>
            <FiShoppingBag />
            {itemCount > 0 && <span className="count">{itemCount}</span>}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TopHeader;
