import { Link } from "react-router-dom";

export function LotusMark({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <path d="M24 3c6 6 8.5 13 0 24C15.500 16 18 9 24 3Z" fill="#7C3AED" />
      <path d="M2 14c9-1.500 17 3 20.500 14.500C12 31 4.500 25 2 14Z" fill="#A78BDA" />
      <path d="M46 14c-9-1.500-17 3-20.500 14.500C36 31 43.500 25 46 14Z" fill="#A78BDA" />
    </svg>
  );
}

export default function Logo({ light = false }) {
  return (
    <Link to="/" className={`logo ${light ? "logo--light" : ""}`} aria-label="Belora home">
      <LotusMark />
      <span className="logo__text">Belora</span>
    </Link>
  );
}
