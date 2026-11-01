import { CATALOG_SLUGS, isCatalogCategory } from "../data/catalog";

const BASE_URL = "https://dummyjson.com";
const cache = new Map();

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function request(path, signal) {
  if (cache.has(path)) return cache.get(path);

  let res;
  try {
    res = await fetch(`${BASE_URL}${path}`, { signal });
  } catch (error) {
    if (error.name === "AbortError") throw error;
    throw new ApiError("We couldn't reach the store. Check your connection and try again.", 0);
  }

  if (!res.ok) {
    throw new ApiError(
      res.status === 404 ? "We couldn't find what you were looking for." : "The store is having trouble right now. Please try again.",
      res.status,
    );
  }

  const data = await res.json();
  cache.set(path, data);
  return data;
}

export async function getProduct(id, signal) {
  const product = await request(`/products/${encodeURIComponent(id)}`, signal);
  if (!isCatalogCategory(product.category)) {
    throw new ApiError("This product isn't part of the Belora collection.", 404);
  }
  return product;
}

export async function getProductsByCategory(slug, signal) {
  const data = await request(`/products/category/${encodeURIComponent(slug)}?limit=0`, signal);
  return data.products ?? [];
}

/** Fetches every catalog category. One failing category doesn't break the rest. */
export async function getCatalogByCategory(signal) {
  const results = await Promise.allSettled(CATALOG_SLUGS.map((slug) => getProductsByCategory(slug, signal)));

  if (signal?.aborted) throw new DOMException("Aborted", "AbortError");

  const byCategory = {};
  let failures = 0;
  results.forEach((result, i) => {
    if (result.status === "fulfilled") byCategory[CATALOG_SLUGS[i]] = result.value;
    else failures += 1;
  });

  if (failures === CATALOG_SLUGS.length) {
    throw new ApiError("We couldn't load the collection. Please try again.", 0);
  }
  return byCategory;
}

export async function getCatalogProducts(signal) {
  const byCategory = await getCatalogByCategory(signal);
  return Object.values(byCategory).flat();
}

export async function searchProducts(query, signal) {
  const data = await request(`/products/search?q=${encodeURIComponent(query)}&limit=0`, signal);
  return (data.products ?? []).filter((p) => isCatalogCategory(p.category));
}
