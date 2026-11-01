// The Belora catalog is a curated slice of the DummyJSON product database
// (beauty + women's fashion). Anything outside these categories is hidden.
export const CATALOG_CATEGORIES = [
  { slug: "beauty", label: "Beauty", blurb: "Makeup essentials, from lips to lashes." },
  { slug: "skin-care", label: "Skin Care", blurb: "Serums, creams and daily rituals." },
  { slug: "fragrances", label: "Fragrances", blurb: "Signature scents for every mood." },
  { slug: "womens-dresses", label: "Dresses", blurb: "Effortless silhouettes for any occasion." },
  { slug: "tops", label: "Tops", blurb: "Easy layers and statement pieces." },
  { slug: "womens-shoes", label: "Shoes", blurb: "Heels, flats and everything between." },
  { slug: "womens-bags", label: "Bags", blurb: "Carry-alls and evening clutches." },
  { slug: "womens-jewellery", label: "Jewellery", blurb: "Finishing touches that shine." },
  { slug: "womens-watches", label: "Watches", blurb: "Timeless pieces for your wrist." },
  { slug: "sunglasses", label: "Sunglasses", blurb: "Frames with a little attitude." },
];

export const CATALOG_SLUGS = CATALOG_CATEGORIES.map((c) => c.slug);

export const isCatalogCategory = (slug) => CATALOG_SLUGS.includes(slug);

export function getCategoryLabel(slug = "") {
  const found = CATALOG_CATEGORIES.find((c) => c.slug === slug);
  if (found) return found.label;
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function getCategoryBlurb(slug = "") {
  return CATALOG_CATEGORIES.find((c) => c.slug === slug)?.blurb ?? "";
}

export const FREE_SHIPPING_THRESHOLD = 75;
export const FLAT_SHIPPING_FEE = 6.99;
