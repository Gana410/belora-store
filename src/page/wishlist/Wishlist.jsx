import { Link } from "react-router-dom";
import { FiHeart, FiShoppingBag, FiX, FiTrash2 } from "react-icons/fi";
import PageHero from "../../component/layout/PageHero";
import EmptyState from "../../component/common/EmptyState";
import StarRating from "../../component/common/StarRating";
import { useWishlist } from "../../hooks/useWishlist";
import { useCart } from "../../hooks/useCart";
import { notifyAddedToCart } from "../../utils/notify";
import { formatPrice, getPricing } from "../../utils/pricing";
import "./wishlist.css";

function Wishlist() {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();

  const handleMoveToCart = (item) => {
    const outcome = addToCart(item, 1);
    notifyAddedToCart(item, outcome);
    if (outcome !== "maxed") removeFromWishlist(item.id);
  };

  const breadcrumbs = [{ label: "Home", to: "/" }, { label: "Wishlist" }];

  if (wishlistItems.length === 0) {
    return (
      <>
        <PageHero title="Your wishlist" breadcrumbs={breadcrumbs} />
        <div className="container section-pad">
          <EmptyState
            icon={<FiHeart />}
            title="Your wishlist is empty"
            message="Tap the heart on any product to save it here for later."
            actionLabel="Discover products"
            actionTo="/shop"
          />
        </div>
      </>
    );
  }

  return (
    <>
      <PageHero
        title="Your wishlist"
        subtitle={`${wishlistItems.length} saved ${wishlistItems.length === 1 ? "item" : "items"}`}
        breadcrumbs={breadcrumbs}
      />
      <div className="container section-pad">
        <div className="wishlist__actions">
          <button type="button" className="btn-text" onClick={() => window.confirm("Clear your whole wishlist?") && clearWishlist()}>
            <FiTrash2 /> Clear wishlist
          </button>
        </div>

        <div className="product-grid">
          {wishlistItems.map((item) => {
            const { finalPrice, originalPrice, hasDiscount } = getPricing(item);
            const soldOut = item.stock !== undefined && item.stock <= 0;
            return (
              <article className="product" key={item.id}>
                <div className="product__media">
                  <Link to={`/products/${item.id}`} className="product__image-link" aria-label={`View ${item.title}`}>
                    <img src={item.thumbnail} alt={item.title} loading="lazy" />
                  </Link>
                  <button type="button" className="product__wish" onClick={() => removeFromWishlist(item.id)} aria-label="Remove from wishlist">
                    <FiX />
                  </button>
                </div>
                <div className="product__body">
                  <p className="product__meta">{item.brand || item.category}</p>
                  <h3 className="product__title">
                    <Link to={`/products/${item.id}`}>{item.title}</Link>
                  </h3>
                  <StarRating rating={item.rating} size={13} />
                  <p className="product__price">
                    <strong>{formatPrice(finalPrice)}</strong>
                    {hasDiscount && <s>{formatPrice(originalPrice)}</s>}
                  </p>
                  <button type="button" className="btn btn--primary btn--block wishlist__move" onClick={() => handleMoveToCart(item)} disabled={soldOut}>
                    <FiShoppingBag /> {soldOut ? "Sold out" : isInCart(item.id) ? "Add another" : "Move to cart"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Wishlist;
