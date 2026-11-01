import { useCallback, useMemo } from "react";
import { CartContext } from "./CartContext";
import { useLocalStorage, readStorage } from "../../hooks/useLocalStorage";
import { getPricing, getThumbnail } from "../../utils/pricing";
import { FLAT_SHIPPING_FEE, FREE_SHIPPING_THRESHOLD } from "../../data/catalog";

const CART_KEY = "belora:cart";
const LEGACY_CART_KEY = "CartItems"; // key used by the first version of the project

const MAX_PER_ITEM = 10;

/** Keeps only what the cart needs. Also upgrades items saved by the old version. */
function toCartItem(product, quantity = 1) {
  const { finalPrice, originalPrice, discount } = getPricing(product);
  return {
    id: product.id,
    title: product.title,
    brand: product.brand ?? "",
    category: product.category ?? "",
    thumbnail: getThumbnail(product),
    price: finalPrice,
    originalPrice,
    discount,
    stock: Number(product.stock) || MAX_PER_ITEM,
    quantity,
  };
}

function normalizeCart(items) {
  if (!Array.isArray(items)) return [];
  return items
    .filter((item) => item && item.id !== undefined && item.title)
    .map((item) => {
      const quantity = Math.max(1, Math.floor(Number(item.quantity) || 1));
      // Items saved by the old version stored the raw product (no `originalPrice`).
      if (item.originalPrice === undefined) return toCartItem(item, quantity);
      return { ...item, quantity };
    });
}

const maxFor = (item) => Math.max(1, Math.min(MAX_PER_ITEM, item.stock || MAX_PER_ITEM));

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useLocalStorage(
    CART_KEY,
    readStorage(LEGACY_CART_KEY, []),
    normalizeCart,
  );

  /** Returns "added" | "updated" | "maxed" so the UI can show the right message. */
  const addToCart = useCallback(
    (product, quantity = 1) => {
      const existing = cartItems.find((i) => i.id === product.id);

      if (!existing) {
        const item = toCartItem(product, 1);
        item.quantity = Math.min(quantity, maxFor(item));
        setCartItems((prev) => (prev.some((i) => i.id === item.id) ? prev : [...prev, item]));
        return "added";
      }

      if (existing.quantity >= maxFor(existing)) return "maxed";

      setCartItems((prev) =>
        prev.map((i) => (i.id === product.id ? { ...i, quantity: Math.min(i.quantity + quantity, maxFor(i)) } : i)),
      );
      return "updated";
    },
    [cartItems, setCartItems],
  );

  const increaseQuantity = useCallback(
    (id) =>
      setCartItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, quantity: Math.min(i.quantity + 1, maxFor(i)) } : i)),
      ),
    [setCartItems],
  );

  const decreaseQuantity = useCallback(
    (id) =>
      setCartItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, i.quantity - 1) } : i))),
    [setCartItems],
  );

  const removeFromCart = useCallback((id) => setCartItems((prev) => prev.filter((i) => i.id !== id)), [setCartItems]);

  const clearCart = useCallback(() => setCartItems([]), [setCartItems]);

  const value = useMemo(() => {
    const itemCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
    const subtotal = Math.round(cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0) * 100) / 100;
    const savings =
      Math.round(cartItems.reduce((sum, i) => sum + (i.originalPrice - i.price) * i.quantity, 0) * 100) / 100;
    const shipping = cartItems.length === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING_FEE;
    const total = Math.round((subtotal + shipping) * 100) / 100;

    return {
      cartItems,
      itemCount,
      subtotal,
      savings,
      shipping,
      total,
      amountToFreeShipping: Math.max(0, Math.round((FREE_SHIPPING_THRESHOLD - subtotal) * 100) / 100),
      maxPerItem: MAX_PER_ITEM,
      isInCart: (id) => cartItems.some((i) => i.id === id),
      getQuantity: (id) => cartItems.find((i) => i.id === id)?.quantity ?? 0,
      addToCart,
      increaseQuantity,
      decreaseQuantity,
      removeFromCart,
      clearCart,
    };
  }, [cartItems, addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
