import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

export default function SectionHeading({ eyebrow, title, subtitle, linkTo, linkLabel = "View all" }) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
        {subtitle && <p className="section-heading__sub">{subtitle}</p>}
      </div>
      {linkTo && (
        <Link to={linkTo} className="link-arrow">
          {linkLabel} <FiArrowRight />
        </Link>
      )}
    </div>
  );
}
