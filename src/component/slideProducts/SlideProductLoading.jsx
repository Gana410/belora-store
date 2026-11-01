import { ProductCardSkeleton } from "./ProductSkeleton";

function SlideProductLoading() {
  return (
    <section className="slide_products" role="status" aria-label="Loading products">
      <div className="container">
        <div className="section-heading">
          <div style={{ width: "100%" }}>
            <div className="sk-line skeltion" style={{ width: 90, height: 12 }} />
            <div className="sk-line skeltion" style={{ width: 260, height: 32, marginTop: 10 }} />
          </div>
        </div>
        <div className="productsLoading">
          {Array.from({ length: 5 }, (_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default SlideProductLoading;
