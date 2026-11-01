import { useCallback, useMemo } from "react";
import { WishlistContext } from "./WishlistContext";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { getThumbnail } from "../../utils/pricing";

const WISHLIST_KEY = "belora:wishlist";

const toWishlistItem = (product) => ({
  id: product.id,
  title: product.title,
  brand: product.brand ?? "",
  category: product.category ?? "",
  thumbnail: getThumbnail(product),
  price: product.price,
  discountPercentage: product.discountPercentage ?? 0,
  rating: product.rating ?? 0,
  stock: product.stock,
});

const normalize = (items) => (Array.isArray(items) ? items.filter((i) => i && i.id !== undefined && i.title) : []);

export default function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useLocalStorage(WISHLIST_KEY, [], normalize);

  /** Returns true when the product was added, false when it was removed. */
  const toggleWishlist = useCallback(
    (product) => {
      const exists = wishlistItems.some((i) => i.id === product.id);
      setWishlistItems((prev) =>
        prev.some((i) => i.id === product.id) ? prev.filter((i) => i.id !== product.id) : [...prev, toWishlistItem(product)],
      );
      return !exists;
    },
    [wishlistItems, setWishlistItems],
  );

  const removeFromWishlist = useCallback(
    (id) => setWishlistItems((prev) => prev.filter((i) => i.id !== id)),
    [setWishlistItems],
  );

  const clearWishlist = useCallback(() => setWishlistItems([]), [setWishlistItems]);

  const value = useMemo(
    () => ({
      wishlistItems,
      wishlistCount: wishlistItems.length,
      isInWishlist: (id) => wishlistItems.some((i) => i.id === id),
      toggleWishlist,
      removeFromWishlist,
      clearWishlist,
    }),
    [wishlistItems, toggleWishlist, removeFromWishlist, clearWishlist],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}
