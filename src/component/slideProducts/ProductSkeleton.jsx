export function ProductCardSkeleton() {
  return (
    <div className="product product--skeleton" aria-hidden="true">
      <div className="product__media skeltion" />
      <div className="product__body">
        <div className="sk-line skeltion" style={{ width: "40%" }} />
        <div className="sk-line skeltion" style={{ width: "85%" }} />
        <div className="sk-line skeltion" style={{ width: "55%" }} />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="product-grid" role="status" aria-label="Loading products">
      {Array.from({ length: count }, (_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
