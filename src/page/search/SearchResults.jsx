import { Link, useSearchParams } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import PageHero from "../../component/layout/PageHero";
import ProductListing from "../../component/listing/ProductListing";
import { ProductGridSkeleton } from "../../component/slideProducts/ProductSkeleton";
import ErrorState from "../../component/common/ErrorState";
import EmptyState from "../../component/common/EmptyState";
import { useApi } from "../../hooks/useApi";
import { searchProducts } from "../../api/productsApi";
import { CATALOG_CATEGORIES } from "../../data/catalog";

function SearchResults() {
  const [params] = useSearchParams();
  const query = (params.get("q") ?? "").trim();

  const { data: products, error, loading, retry } = useApi(
    (signal) => (query ? searchProducts(query, signal) : Promise.resolve([])),
    `search-${query}`,
  );

  const breadcrumbs = [{ label: "Home", to: "/" }, { label: "Search" }];

  if (!query) {
    return (
      <>
        <PageHero title="Search" breadcrumbs={breadcrumbs} />
        <div className="container section-pad">
          <EmptyState icon={<FiSearch />} title="What are you looking for?" message="Type a product, brand or category in the search bar above." />
        </div>
      </>
    );
  }

  return (
    <>
      <PageHero eyebrow="Search results" title={`“${query}”`} breadcrumbs={breadcrumbs} />
      <div className="container section-pad">
        {loading && <ProductGridSkeleton count={8} />}
        {error && <ErrorState error={error} onRetry={retry} title="Search failed" />}
        {products && products.length === 0 && (
          <EmptyState icon={<FiSearch />} title={`No results for “${query}”`} message="Check the spelling or try a broader term. You can also browse a collection:">
            <div className="chips chips--center">
              {CATALOG_CATEGORIES.map((c) => (
                <Link key={c.slug} to={`/category/${c.slug}`} className="chip">
                  {c.label}
                </Link>
              ))}
            </div>
          </EmptyState>
        )}
        {products && products.length > 0 && <ProductListing key={query} products={products} showCategories />}
      </div>
    </>
  );
}

export default SearchResults;
