import { useMemo } from "react";
import HeroSlider from "../../component/HeroSlider";
import SlideProduct from "../../component/slideProducts/SlideProduct";
import SlideProductLoading from "../../component/slideProducts/SlideProductLoading";
import ErrorState from "../../component/common/ErrorState";
import ValueProps from "../../component/home/ValueProps";
import CategoryTiles from "../../component/home/CategoryTiles";
import PromoBanners from "../../component/home/PromoBanners";
import { useApi } from "../../hooks/useApi";
import { getCatalogByCategory } from "../../api/productsApi";
import { getCategoryBlurb, getCategoryLabel } from "../../data/catalog";
import "./home.css";

// Category carousels shown under the featured sections.
const SPOTLIGHT = ["beauty", "womens-dresses", "womens-shoes", "womens-bags", "womens-jewellery"];

function Home() {
  const { data: byCategory, error, loading, retry } = useApi(getCatalogByCategory, "home");

  const { deals, bestSellers, maxDiscount } = useMemo(() => {
    const all = Object.values(byCategory ?? {}).flat();
    return {
      deals: [...all].sort((a, b) => b.discountPercentage - a.discountPercentage).slice(0, 12),
      bestSellers: [...all].sort((a, b) => b.rating - a.rating).slice(0, 12),
      maxDiscount: all.length ? Math.floor(Math.max(...all.map((p) => p.discountPercentage))) : 0,
    };
  }, [byCategory]);

  return (
    <div className="home">
      <HeroSlider />
      <ValueProps />

      {loading && (
        <>
          <SlideProductLoading />
          <SlideProductLoading />
        </>
      )}

      {error && (
        <div className="container">
          <ErrorState error={error} onRetry={retry} title="We couldn't load the collection" />
        </div>
      )}

      {byCategory && (
        <>
          <CategoryTiles byCategory={byCategory} />
          <SlideProduct
            eyebrow="Handpicked"
            title="Featured deals"
            subtitle="The biggest savings across the collection."
            data={deals}
            linkTo="/shop?sort=discount"
          />
          <PromoBanners byCategory={byCategory} maxDiscount={maxDiscount} />
          <SlideProduct
            eyebrow="Customer favourites"
            title="Best sellers"
            subtitle="Our highest-rated pieces right now."
            data={bestSellers}
            linkTo="/shop"
          />
          {SPOTLIGHT.map((slug) => (
            <SlideProduct
              key={slug}
              title={getCategoryLabel(slug)}
              subtitle={getCategoryBlurb(slug)}
              data={byCategory[slug]}
              linkTo={`/category/${slug}`}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default Home;
