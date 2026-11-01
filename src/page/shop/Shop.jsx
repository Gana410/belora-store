import { useSearchParams } from "react-router-dom";
import PageHero from "../../component/layout/PageHero";
import ProductListing from "../../component/listing/ProductListing";
import { ProductGridSkeleton } from "../../component/slideProducts/ProductSkeleton";
import ErrorState from "../../component/common/ErrorState";
import { useApi } from "../../hooks/useApi";
import { getCatalogProducts } from "../../api/productsApi";

function Shop() {
  const [params] = useSearchParams();
  const { data: products, error, loading, retry } = useApi(getCatalogProducts, "shop");

  return (
    <>
      <PageHero
        eyebrow="The collection"
        title="All products"
        subtitle="Beauty and fashion essentials, all in one place."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Shop" }]}
      />
      <div className="container section-pad">
        {loading && <ProductGridSkeleton count={12} />}
        {error && <ErrorState error={error} onRetry={retry} title="We couldn't load the products" />}
        {products && <ProductListing products={products} showCategories initialSort={params.get("sort") ?? "featured"} />}
      </div>
    </>
  );
}

export default Shop;
