import { Link, useNavigate } from "react-router-dom";
import { FiShoppingBag, FiTrash2, FiArrowLeft, FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import PageHero from "../../component/layout/PageHero";
import EmptyState from "../../component/common/EmptyState";
import QuantitySelector from "../../component/common/QuantitySelector";
import OrderSummary from "../../component/common/OrderSummary";
import { useCart } from "../../hooks/useCart";
import { formatPrice } from "../../utils/pricing";
import "./cart.css";

function Cart() {
  const navigate = useNavigate();
  const { cartItems, itemCount, increaseQuantity, decreaseQuantity, removeFromCart, clearCart, maxPerItem } = useCart();

  const handleRemove = (item) => {
    removeFromCart(item.id);
    toast(`Removed “${item.title}”`);
  };

  const handleClear = () => {
    if (window.confirm("Remove all items from your cart?")) clearCart();
  };

  if (cartItems.length === 0) {
    return (
      <>
        <PageHero title="Shopping cart" breadcrumbs={[{ label: "Home", to: "/" }, { label: "Cart" }]} />
        <div className="container section-pad">
          <EmptyState
            icon={<FiShoppingBag />}
            title="Your cart is empty"
            message="Looks like you haven't added anything yet. Discover something you'll love."
            actionLabel="Continue shopping"
            actionTo="/shop"
          />
        </div>
      </>
    );
  }

  return (
    <>
      <PageHero
        title="Shopping cart"
        subtitle={`${itemCount} ${itemCount === 1 ? "item" : "items"} in your cart`}
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Cart" }]}
      />

      <div className="container cart-layout section-pad">
        <section className="cart-items" aria-label="Cart items">
          <ul>
            {cartItems.map((item) => (
              <li className="cart-item" key={item.id}>
                <Link to={`/products/${item.id}`} className="cart-item__img">
                  <img src={item.thumbnail} alt={item.title} />
                </Link>

                <div className="cart-item__info">
                  <p className="cart-item__brand">{item.brand || item.category}</p>
                  <h3>
                    <Link to={`/products/${item.id}`}>{item.title}</Link>
                  </h3>
                  <p className="cart-item__unit">
                    {formatPrice(item.price)}
                    {item.discount > 0 && <s>{formatPrice(item.originalPrice)}</s>}
                  </p>
                  <QuantitySelector
                    value={item.quantity}
                    max={Math.min(maxPerItem, item.stock || maxPerItem)}
                    onDecrease={() => decreaseQuantity(item.id)}
                    onIncrease={() => increaseQuantity(item.id)}
                    label={`Quantity for ${item.title}`}
                  />
                </div>

                <div className="cart-item__side">
                  <strong>{formatPrice(item.price * item.quantity)}</strong>
                  <button type="button" className="cart-item__remove" onClick={() => handleRemove(item)} aria-label={`Remove ${item.title}`}>
                    <FiX />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-items__footer">
            <Link to="/shop" className="link-arrow link-arrow--back">
              <FiArrowLeft /> Continue shopping
            </Link>
            <button type="button" className="btn-text" onClick={handleClear}>
              <FiTrash2 /> Clear cart
            </button>
          </div>
        </section>

        <aside className="cart-summary">
          <OrderSummary />
          <button type="button" className="btn btn--primary btn--lg btn--block" onClick={() => navigate("/checkout")}>
            Proceed to checkout
          </button>
          <p className="cart-summary__note">Checkout is a demo — no payment is taken.</p>
        </aside>
      </div>
    </>
  );
}

export default Cart;
