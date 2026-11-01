import toast from "react-hot-toast";
import CartToast from "../component/common/CartToast";

export function notifyAddedToCart(product, outcome) {
  if (outcome === "maxed") {
    toast.error("You've reached the maximum quantity for this item.");
    return;
  }
  toast.custom(
    (t) => (
      <div className={`toast-card ${t.visible ? "toast-in" : "toast-out"}`}>
        <CartToast
          toastId={t.id}
          product={product}
          message={outcome === "updated" ? "Quantity updated in your cart" : "Added to your cart"}
        />
      </div>
    ),
    { duration: 3500 },
  );
}

export function notifyWishlist(product, added) {
  toast(added ? `Saved “${product.title}” to your wishlist` : `Removed from your wishlist`, {
    icon: added ? "💜" : "🤍",
  });
}
