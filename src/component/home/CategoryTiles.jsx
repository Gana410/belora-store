import { Link } from "react-router-dom";
import SectionHeading from "../common/SectionHeading";
import { CATALOG_CATEGORIES } from "../../data/catalog";
import { getThumbnail } from "../../utils/pricing";

export default function CategoryTiles({ byCategory }) {
  return (
    <section className="category-tiles">
      <div className="container">
        <SectionHeading eyebrow="Browse" title="Shop by category" />
        <div className="category-tiles__grid">
          {CATALOG_CATEGORIES.map((category) => {
            const sample = byCategory[category.slug]?.[0];
            return (
              <Link key={category.slug} to={`/category/${category.slug}`} className="category-tile">
                <span className="category-tile__img">
                  {sample && <img src={getThumbnail(sample)} alt="" loading="lazy" />}
                </span>
                <span className="category-tile__label">{category.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
