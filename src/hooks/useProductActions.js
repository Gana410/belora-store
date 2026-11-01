import { useCart } from "./useCart";
import { useWishlist } from "./useWishlist";
import { notifyAddedToCart, notifyWishlist } from "../utils/notify";

/** Shared add-to-cart / wishlist behaviour (with toasts) for any product UI. */
export function useProductActions(product) {
  const { addToCart, isInCart, getQuantity } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const outOfStock = product?.stock !== undefined && Number(product.stock) <= 0;

  const handleAddToCart = (quantity = 1) => {
    if (outOfStock) return;
    const outcome = addToCart(product, quantity);
    notifyAddedToCart(product, outcome);
  };

  const handleToggleWishlist = () => {
    const added = toggleWishlist(product);
    notifyWishlist(product, added);
  };

  return {
    inCart: isInCart(product.id),
    cartQuantity: getQuantity(product.id),
    inWishlist: isInWishlist(product.id),
    outOfStock,
    handleAddToCart,
    handleToggleWishlist,
  };
}
