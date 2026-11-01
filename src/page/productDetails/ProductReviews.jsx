import StarRating from "../../component/common/StarRating";

const formatDate = (iso) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
};

export default function ProductReviews({ reviews = [] }) {
  if (!reviews.length) return null;

  return (
    <section className="reviews" aria-labelledby="reviews-title">
      <h2 id="reviews-title">Customer reviews</h2>
      <div className="reviews__list">
        {reviews.map((review, i) => (
          <article className="review" key={`${review.reviewerEmail}-${i}`}>
            <div className="review__top">
              <span className="review__avatar" aria-hidden="true">
                {review.reviewerName?.charAt(0) ?? "?"}
              </span>
              <div>
                <h3>{review.reviewerName}</h3>
                <time>{formatDate(review.date)}</time>
              </div>
              <StarRating rating={review.rating} size={13} />
            </div>
            <p>{review.comment}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
