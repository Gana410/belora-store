import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FiChevronDown, FiGrid } from "react-icons/fi";
import { CATALOG_CATEGORIES } from "../../data/catalog";

const NAV_LINKS = [
  { title: "Home", to: "/", end: true },
  { title: "Shop", to: "/shop" },
  { title: "About", to: "/about" },
  { title: "Contact", to: "/contact" },
];

function BtmHeader({ menuOpen, onClose }) {
  const location = useLocation();
  const routeKey = location.pathname;
  const [openKey, setOpenKey] = useState(null);
  const categoriesOpen = openKey === routeKey;
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!categoriesOpen) return;
    const closeOnOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setOpenKey(null);
    };
    const closeOnEscape = (e) => e.key === "Escape" && setOpenKey(null);
    document.addEventListener("mousedown", closeOnOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [categoriesOpen]);

  return (
    <div className={`btm_header ${menuOpen ? "is-open" : ""}`}>
      <div className="container">
        <nav className="nav" aria-label="Main navigation">
          <div className="category_nav" ref={wrapperRef}>
            <button
              type="button"
              className="category_btn"
              onClick={() => setOpenKey(categoriesOpen ? null : routeKey)}
              aria-expanded={categoriesOpen}
              aria-haspopup="true"
            >
              <FiGrid />
              <span>Shop by category</span>
              <FiChevronDown className={categoriesOpen ? "flip" : ""} />
            </button>

            <div className={`category_nav_list ${categoriesOpen ? "active" : ""}`}>
              <Link to="/shop" onClick={onClose}>
                All products
              </Link>
              {CATALOG_CATEGORIES.map((category) => (
                <Link key={category.slug} to={`/category/${category.slug}`} onClick={onClose}>
                  {category.label}
                </Link>
              ))}
            </div>
          </div>

          <ul className="nav_links">
            {NAV_LINKS.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.end} onClick={onClose}>
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default BtmHeader;
