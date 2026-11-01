import { useMemo, useState } from "react";
import { FiFilter, FiSearch, FiX } from "react-icons/fi";
import Product from "../slideProducts/Product";
import EmptyState from "../common/EmptyState";
import { getPricing } from "../../utils/pricing";
import { getCategoryLabel } from "../../data/catalog";
import "./listing.css";

const PAGE_SIZE = 12;

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Top rated" },
  { value: "discount", label: "Biggest discount" },
  { value: "name", label: "Name: A–Z" },
];

const SORTERS = {
  featured: () => 0,
  "price-asc": (a, b) => getPricing(a).finalPrice - getPricing(b).finalPrice,
  "price-desc": (a, b) => getPricing(b).finalPrice - getPricing(a).finalPrice,
  rating: (a, b) => b.rating - a.rating,
  discount: (a, b) => b.discountPercentage - a.discountPercentage,
  name: (a, b) => a.title.localeCompare(b.title),
};

const RATING_OPTIONS = [
  { value: 0, label: "Any rating" },
  { value: 4, label: "4★ & up" },
  { value: 4.5, label: "4.5★ & up" },
];

/**
 * Client-side filtering, sorting and "load more" for a list of products.
 * `showCategories` adds category chips (used by the shop and search pages).
 */
export default function ProductListing({ products, showCategories = false, initialSort = "featured", emptyMessage, emptyAction }) {
  const [sort, setSort] = useState(SORTERS[initialSort] ? initialSort : "featured");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [category, setCategory] = useState("all");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Any filter change shows the first page of results again.
  const change = (setter) => (value) => {
    setter(value);
    setVisible(PAGE_SIZE);
  };

  const priceBounds = useMemo(() => {
    const prices = products.map((p) => getPricing(p).finalPrice);
    if (!prices.length) return { min: 0, max: 0 };
    return { min: Math.floor(Math.min(...prices)), max: Math.ceil(Math.max(...prices)) };
  }, [products]);

  const categoryCounts = useMemo(() => {
    const counts = {};
    products.forEach((p) => {
      counts[p.category] = (counts[p.category] ?? 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => a[0].localeCompare(b[0]));
  }, [products]);

  const min = minPrice === "" ? null : Number(minPrice);
  const max = maxPrice === "" ? null : Number(maxPrice);
  const invalidRange = min !== null && max !== null && min > max;

  const results = useMemo(() => {
    const filtered = products.filter((p) => {
      const price = getPricing(p).finalPrice;
      if (min !== null && price < min) return false;
      if (max !== null && price > max) return false;
      if (minRating && p.rating < minRating) return false;
      if (inStockOnly && p.stock <= 0) return false;
      if (category !== "all" && p.category !== category) return false;
      return true;
    });
    return [...filtered].sort(SORTERS[sort]);
  }, [products, min, max, minRating, inStockOnly, category, sort]);

  const activeFilterCount =
    (min !== null ? 1 : 0) + (max !== null ? 1 : 0) + (minRating ? 1 : 0) + (inStockOnly ? 1 : 0) + (category !== "all" ? 1 : 0);

  const clearFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setMinRating(0);
    setInStockOnly(false);
    setCategory("all");
    setVisible(PAGE_SIZE);
  };

  if (!products.length) {
    return (
      <EmptyState
        icon={<FiSearch />}
        title="Nothing here yet"
        message={emptyMessage ?? "We couldn't find any products in this collection."}
        actionLabel={emptyAction?.label ?? "Browse all products"}
        actionTo={emptyAction?.to ?? "/shop"}
      />
    );
  }

  return (
    <div className="listing">
      <div className="listing__toolbar">
        <p className="listing__count" aria-live="polite">
          <strong>{results.length}</strong> {results.length === 1 ? "product" : "products"}
        </p>

        <button type="button" className="btn btn--outline listing__filter-btn" onClick={() => setFiltersOpen(true)}>
          <FiFilter /> Filters{activeFilterCount > 0 && ` (${activeFilterCount})`}
        </button>

        <label className="listing__sort">
          <span>Sort by</span>
          <select value={sort} onChange={(e) => change(setSort)(e.target.value)}>
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="listing__layout">
        <aside className={`filters ${filtersOpen ? "is-open" : ""}`} aria-label="Product filters">
          <div className="filters__head">
            <h3>Filters</h3>
            <button type="button" className="icon-btn filters__close" onClick={() => setFiltersOpen(false)} aria-label="Close filters">
              <FiX />
            </button>
          </div>

          {showCategories && categoryCounts.length > 1 && (
            <fieldset className="filters__group">
              <legend>Category</legend>
              <div className="chips">
                <button type="button" className={`chip ${category === "all" ? "is-active" : ""}`} onClick={() => change(setCategory)("all")}>
                  All
                </button>
                {categoryCounts.map(([slug, count]) => (
                  <button
                    type="button"
                    key={slug}
                    className={`chip ${category === slug ? "is-active" : ""}`}
                    onClick={() => change(setCategory)(slug)}
                  >
                    {getCategoryLabel(slug)} <small>{count}</small>
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          <fieldset className="filters__group">
            <legend>Price</legend>
            <div className="price-inputs">
              <label>
                <span className="sr-only">Minimum price</span>
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  placeholder={`$${priceBounds.min}`}
                  value={minPrice}
                  onChange={(e) => change(setMinPrice)(e.target.value)}
                />
              </label>
              <span aria-hidden="true">–</span>
              <label>
                <span className="sr-only">Maximum price</span>
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  placeholder={`$${priceBounds.max}`}
                  value={maxPrice}
                  onChange={(e) => change(setMaxPrice)(e.target.value)}
                />
              </label>
            </div>
            {invalidRange && <p className="field-error">Minimum price is higher than the maximum.</p>}
          </fieldset>

          <fieldset className="filters__group">
            <legend>Rating</legend>
            <div className="chips">
              {RATING_OPTIONS.map((o) => (
                <button
                  type="button"
                  key={o.value}
                  className={`chip ${minRating === o.value ? "is-active" : ""}`}
                  onClick={() => change(setMinRating)(o.value)}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </fieldset>

          <label className="check">
            <input type="checkbox" checked={inStockOnly} onChange={(e) => change(setInStockOnly)(e.target.checked)} />
            <span>In stock only</span>
          </label>

          <div className="filters__actions">
            <button type="button" className="btn btn--outline" onClick={clearFilters} disabled={!activeFilterCount}>
              Clear all
            </button>
            <button type="button" className="btn btn--primary filters__apply" onClick={() => setFiltersOpen(false)}>
              Show {results.length} results
            </button>
          </div>
        </aside>
        {filtersOpen && <button type="button" className="filters__backdrop" aria-label="Close filters" onClick={() => setFiltersOpen(false)} />}

        <div className="listing__results">
          {results.length === 0 ? (
            <EmptyState
              icon={<FiSearch />}
              title="No products match your filters"
              message="Try widening the price range or clearing a filter."
            >
              <button type="button" className="btn btn--primary" onClick={clearFilters}>
                Clear all filters
              </button>
            </EmptyState>
          ) : (
            <>
              <div className="product-grid">
                {results.slice(0, visible).map((item) => (
                  <Product item={item} key={item.id} />
                ))}
              </div>
              {visible < results.length && (
                <div className="listing__more">
                  <p>
                    Showing {Math.min(visible, results.length)} of {results.length}
                  </p>
                  <button type="button" className="btn btn--outline" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
                    Load more
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
