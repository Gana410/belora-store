import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import SlideProduct from "../../component/slideProducts/SlideProduct";
import SlideProductLoading from "../../component/slideProducts/SlideProductLoading";
import Breadcrumbs from "../../component/common/Breadcrumbs";
import ErrorState from "../../component/common/ErrorState";
import EmptyState from "../../component/common/EmptyState";
import ProductDetailsLoading from "./ProductDetailsLoading";
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";
import ProductReviews from "./ProductReviews";
import { useApi } from "../../hooks/useApi";
import { getProduct, getProductsByCategory } from "../../api/productsApi";
import { getCategoryLabel } from "../../data/catalog";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();

  const { data: product, error, loading, retry } = useApi((signal) => getProduct(id, signal), `product-${id}`);

  const category = product?.category;
  const { data: sameCategory, loading: relatedLoading } = useApi(
    (signal) => (category ? getProductsByCategory(category, signal) : Promise.resolve([])),
    `related-${category ?? "none"}`,
  );

  const related = useMemo(() => (sameCategory ?? []).filter((p) => p.id !== product?.id), [sameCategory, product]);

  if (error?.status === 404) {
    return (
      <div className="container">
        <EmptyState
          icon={<FiSearch />}
          title="Product not found"
          message="This product doesn't exist or is no longer available."
          actionLabel="Continue shopping"
          actionTo="/shop"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <ErrorState error={error} onRetry={retry} title="We couldn't load this product" />
      </div>
    );
  }

  if (loading || !product) return <ProductDetailsLoading />;

  return (
    <>
      <div className="item_details">
        <div className="container">
          <Breadcrumbs
            items={[
              { label: "Home", to: "/" },
              { label: getCategoryLabel(product.category), to: `/category/${product.category}` },
              { label: product.title },
            ]}
          />
          <div className="item_details__grid">
            <ProductImages key={product.id} product={product} />
            <ProductInfo key={`info-${product.id}`} product={product} />
          </div>
          <ProductReviews reviews={product.reviews} />
        </div>
      </div>

      {relatedLoading ? (
        <SlideProductLoading />
      ) : (
        <SlideProduct
          eyebrow="You may also like"
          title={`More in ${getCategoryLabel(product.category)}`}
          data={related}
          linkTo={`/category/${product.category}`}
        />
      )}
    </>
  );
}

export default ProductDetails;
