import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

export default function StarRating({ rating = 0, count, size = 14 }) {
  const value = Math.max(0, Math.min(5, Number(rating) || 0));
  const rounded = Math.round(value * 2) / 2;

  return (
    <div className="star-rating" role="img" aria-label={`Rated ${value.toFixed(1)} out of 5`}>
      <span className="star-rating__stars" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((n) => {
          if (rounded >= n) return <FaStar key={n} size={size} />;
          if (rounded === n - 0.5) return <FaStarHalfAlt key={n} size={size} />;
          return <FaRegStar key={n} size={size} />;
        })}
      </span>
      {count !== undefined && <span className="star-rating__count">({count})</span>}
    </div>
  );
}
