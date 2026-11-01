import { Link } from "react-router-dom";
import { FiHeart, FiShoppingBag, FiCheck } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import StarRating from "../common/StarRating";
import { useProductActions } from "../../hooks/useProductActions";
import { formatPrice, getPricing, getThumbnail } from "../../utils/pricing";
import { getCategoryLabel } from "../../data/catalog";

function Product({ item }) {
  const { inCart, inWishlist, outOfStock, handleAddToCart, handleToggleWishlist } = useProductActions(item);
  const { finalPrice, originalPrice, discount, hasDiscount } = getPricing(item);

  return (
    <article className={`product ${inCart ? "in-cart" : ""} ${outOfStock ? "out-of-stock" : ""}`}>
      <div className="product__media">
        <Link to={`/products/${item.id}`} className="product__image-link" aria-label={`View ${item.title}`}>
          <img src={getThumbnail(item)} alt={item.title} loading="lazy" />
        </Link>

        {hasDiscount && !outOfStock && <span className="badge badge--sale">-{discount}%</span>}
        {outOfStock && <span className="badge badge--muted">Sold out</span>}

        <button
          type="button"
          className={`product__wish ${inWishlist ? "is-active" : ""}`}
          onClick={handleToggleWishlist}
          aria-pressed={inWishlist}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          {inWishlist ? <FaHeart /> : <FiHeart />}
        </button>

        <button
          type="button"
          className="product__quick-add"
          onClick={() => handleAddToCart(1)}
          disabled={outOfStock}
        >
          {inCart ? <FiCheck /> : <FiShoppingBag />}
          {outOfStock ? "Sold out" : inCart ? "Add another" : "Add to cart"}
        </button>
      </div>

      <div className="product__body">
        <p className="product__meta">{item.brand || getCategoryLabel(item.category)}</p>
        <h3 className="product__title">
          <Link to={`/products/${item.id}`}>{item.title}</Link>
        </h3>
        <StarRating rating={item.rating} count={item.reviews?.length} size={13} />
        <p className="product__price">
          <strong>{formatPrice(finalPrice)}</strong>
          {hasDiscount && <s>{formatPrice(originalPrice)}</s>}
        </p>
      </div>
    </article>
  );
}

export default Product;
