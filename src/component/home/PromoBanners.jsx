import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { getThumbnail } from "../../utils/pricing";

export default function PromoBanners({ byCategory, maxDiscount }) {
  const promos = [
    {
      eyebrow: "New season",
      title: "The fragrance edit",
      to: "/category/fragrances",
      image: byCategory.fragrances?.[0],
      className: "promo--violet",
    },
    {
      eyebrow: "Limited-time deals",
      title: maxDiscount ? `Save up to ${maxDiscount}%` : "Shop the deals",
      to: "/shop?sort=discount",
      image: byCategory.sunglasses?.[0],
      className: "promo--ink",
    },
    {
      eyebrow: "Occasion wear",
      title: "Dress up your week",
      to: "/category/womens-dresses",
      image: byCategory["womens-dresses"]?.[0],
      className: "promo--sand",
    },
  ];

  return (
    <section className="promos">
      <div className="container promos__grid">
        {promos.map((promo) => (
          <Link key={promo.title} to={promo.to} className={`promo ${promo.className}`}>
            <div className="promo__text">
              <p className="eyebrow">{promo.eyebrow}</p>
              <h3>{promo.title}</h3>
              <span className="promo__cta">
                Shop now <FiArrowRight />
              </span>
            </div>
            {promo.image && <img src={getThumbnail(promo.image)} alt="" loading="lazy" />}
          </Link>
        ))}
      </div>
    </section>
  );
}
