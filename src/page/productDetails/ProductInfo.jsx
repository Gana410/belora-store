import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FiHeart, FiShare2, FiShoppingBag, FiTruck, FiRefreshCw, FiShield } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import StarRating from "../../component/common/StarRating";
import QuantitySelector from "../../component/common/QuantitySelector";
import { useProductActions } from "../../hooks/useProductActions";
import { useCart } from "../../hooks/useCart";
import { formatPrice, getPricing } from "../../utils/pricing";
import { getCategoryLabel } from "../../data/catalog";

function ProductInfo({ product }) {
  const { maxPerItem } = useCart();
  const { inCart, cartQuantity, inWishlist, outOfStock, handleAddToCart, handleToggleWishlist } = useProductActions(product);
  const { finalPrice, originalPrice, discount, hasDiscount } = getPricing(product);
  const [quantity, setQuantity] = useState(1);

  const limit = Math.max(1, Math.min(maxPerItem, product.stock || maxPerItem));
  const remainingToAdd = Math.max(0, limit - cartQuantity);
  const lowStock = !outOfStock && product.stock <= 10;

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: product.title, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard");
      }
    } catch (error) {
      if (error?.name !== "AbortError") toast.error("Couldn't share this product");
    }
  };

  return (
    <div className="details_item">
      <p className="details_item__meta">
        {product.brand && <span className="details_item__brand">{product.brand}</span>}
        <Link to={`/category/${product.category}`}>{getCategoryLabel(product.category)}</Link>
      </p>

      <h1 className="name">{product.title}</h1>

      <div className="details_item__rating">
        <StarRating rating={product.rating} size={16} />
        <span>
          {Number(product.rating).toFixed(1)} · {product.reviews?.length ?? 0} reviews
        </span>
      </div>

      <p className="price">
        <strong>{formatPrice(finalPrice)}</strong>
        {hasDiscount && (
          <>
            <s>{formatPrice(originalPrice)}</s>
            <span className="badge badge--sale">Save {discount}%</span>
          </>
        )}
      </p>

      <p className="description">{product.description}</p>

      <p className={`stock ${outOfStock ? "stock--out" : lowStock ? "stock--low" : "stock--in"}`}>
        {outOfStock ? "Out of stock" : lowStock ? `Only ${product.stock} left in stock` : product.availabilityStatus || "In stock"}
      </p>

      <div className="buy_row">
        <QuantitySelector
          value={quantity}
          min={1}
          max={Math.max(1, remainingToAdd)}
          onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
          onIncrease={() => setQuantity((q) => Math.min(Math.max(1, remainingToAdd), q + 1))}
        />

        <button
          type="button"
          className="btn btn--primary btn--lg buy_row__add"
          disabled={outOfStock || remainingToAdd === 0}
          onClick={() => {
            handleAddToCart(Math.min(quantity, remainingToAdd));
            setQuantity(1);
          }}
        >
          <FiShoppingBag />
          {outOfStock ? "Out of stock" : remainingToAdd === 0 ? "Max quantity in cart" : inCart ? "Add more to cart" : "Add to cart"}
        </button>

        <button
          type="button"
          className={`icon-btn icon-btn--outline ${inWishlist ? "is-active" : ""}`}
          onClick={handleToggleWishlist}
          aria-pressed={inWishlist}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          {inWishlist ? <FaHeart /> : <FiHeart />}
        </button>
        <button type="button" className="icon-btn icon-btn--outline" onClick={handleShare} aria-label="Share this product">
          <FiShare2 />
        </button>
      </div>

      {inCart && (
        <p className="in-cart-note">
          {cartQuantity} in your cart · <Link to="/cart">View cart</Link>
        </p>
      )}

      <ul className="perks">
        <li>
          <FiTruck /> <span>{product.shippingInformation || "Ships within 3–5 business days"}</span>
        </li>
        <li>
          <FiRefreshCw /> <span>{product.returnPolicy || "30 days return policy"}</span>
        </li>
        <li>
          <FiShield /> <span>{product.warrantyInformation || "Quality guaranteed"}</span>
        </li>
      </ul>
    </div>
  );
}

export default ProductInfo;
