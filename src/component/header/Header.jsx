import { useState } from "react";
import { useLocation } from "react-router-dom";
import TopHeader from "./TopHeader";
import BtmHeader from "./BtmHeader";
import { FREE_SHIPPING_THRESHOLD } from "../../data/catalog";
import "./header.css";

export default function Header() {
  const location = useLocation();
  const routeKey = location.pathname + location.search;

  // The menu is "open" only for the route it was opened on, so navigating
  // closes it automatically without setting state inside an effect.
  const [openKey, setOpenKey] = useState(null);
  const menuOpen = openKey === routeKey;
  const toggleMenu = () => setOpenKey(menuOpen ? null : routeKey);
  const closeMenu = () => setOpenKey(null);

  return (
    <header className="site-header">
      <div className="announcement">Complimentary shipping on orders over ${FREE_SHIPPING_THRESHOLD}</div>
      <TopHeader menuOpen={menuOpen} onToggleMenu={toggleMenu} />
      <BtmHeader menuOpen={menuOpen} onClose={closeMenu} />
      {menuOpen && <button type="button" className="header-backdrop" aria-label="Close menu" onClick={closeMenu} />}
    </header>
  );
}
