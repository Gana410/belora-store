const round2 = (n) => Math.round(n * 100) / 100;

/** DummyJSON `price` is the list price; the discount is applied on top of it. */
export function getPricing(product) {
  const list = Number(product?.originalPrice ?? product?.price) || 0;
  const discount = Number(product?.discountPercentage) || 0;
  const hasDiscount = discount >= 1;
  const finalPrice = hasDiscount ? round2(list * (1 - discount / 100)) : round2(list);
  return {
    finalPrice,
    originalPrice: round2(list),
    discount: hasDiscount ? Math.round(discount) : 0,
    hasDiscount,
  };
}

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const formatPrice = (value) => formatter.format(Number(value) || 0);

export function getThumbnail(product) {
  return product?.thumbnail || product?.images?.[0] || "";
}
