import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";

export default function Breadcrumbs({ items }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`}>
              {item.to && !last ? <Link to={item.to}>{item.label}</Link> : <span aria-current={last ? "page" : undefined}>{item.label}</span>}
              {!last && <FiChevronRight aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
