import { useParams } from "react-router-dom";
import PageHero from "../../component/layout/PageHero";
import ProductListing from "../../component/listing/ProductListing";
import { ProductGridSkeleton } from "../../component/slideProducts/ProductSkeleton";
import ErrorState from "../../component/common/ErrorState";
import { useApi } from "../../hooks/useApi";
import { getProductsByCategory } from "../../api/productsApi";
import { getCategoryBlurb, getCategoryLabel, isCatalogCategory } from "../../data/catalog";
import NotFound from "../notFound/NotFound";
import "./categoryPage.css";

function CategoryPage() {
  const { category } = useParams();
  const known = isCatalogCategory(category);

  const { data: products, error, loading, retry } = useApi(
    (signal) => (known ? getProductsByCategory(category, signal) : Promise.resolve([])),
    `category-${category}`,
  );

  if (!known) return <NotFound message="We don't have a collection with that name." />;

  const label = getCategoryLabel(category);

  return (
    <>
      <PageHero
        eyebrow="Collection"
        title={label}
        subtitle={getCategoryBlurb(category)}
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Shop", to: "/shop" }, { label }]}
      />
      <div className="container section-pad">
        {loading && <ProductGridSkeleton count={8} />}
        {error && <ErrorState error={error} onRetry={retry} title={`We couldn't load ${label}`} />}
        {products && <ProductListing key={category} products={products} />}
      </div>
    </>
  );
}

export default CategoryPage;
