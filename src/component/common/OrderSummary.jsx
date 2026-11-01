import { useCart } from "../../hooks/useCart";
import { formatPrice } from "../../utils/pricing";
import { FREE_SHIPPING_THRESHOLD } from "../../data/catalog";

/** Totals card shared by the cart and checkout pages. Pass `totals` to show a past order. */
export default function OrderSummary({ totals, title = "Order summary" }) {
  const cart = useCart();
  const t = totals ?? cart;
  const progress = Math.min(100, (t.subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div className="order-summary">
      <h2>{title}</h2>

      {!totals && t.subtotal > 0 && (
        <div className="shipping-progress">
          <p>
            {t.amountToFreeShipping > 0 ? (
              <>
                Add <strong>{formatPrice(t.amountToFreeShipping)}</strong> more for free shipping
              </>
            ) : (
              <strong>You've unlocked free shipping 🎉</strong>
            )}
          </p>
          <div className="shipping-progress__bar">
            <span style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      <dl>
        <div>
          <dt>Subtotal</dt>
          <dd>{formatPrice(t.subtotal)}</dd>
        </div>
        {t.savings > 0 && (
          <div className="order-summary__savings">
            <dt>You save</dt>
            <dd>-{formatPrice(t.savings)}</dd>
          </div>
        )}
        <div>
          <dt>Shipping</dt>
          <dd>{t.shipping === 0 ? "Free" : formatPrice(t.shipping)}</dd>
        </div>
        <div className="order-summary__total">
          <dt>Total</dt>
          <dd>{formatPrice(t.total)}</dd>
        </div>
      </dl>
    </div>
  );
}
