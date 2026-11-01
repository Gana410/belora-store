import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";
import Header from "./component/header/Header";
import Footer from "./component/layout/Footer";
import ScrollToTop from "./component/ScrollToTop";
import PageTransition from "./component/PageTransition";
import Home from "./page/home/Home";
const Shop = lazy(() => import("./page/shop/Shop"));
const CategoryPage = lazy(() => import("./page/categoryPage/CategoryPage"));
const ProductDetails = lazy(() => import("./page/productDetails/ProductDetails"));
const SearchResults = lazy(() => import("./page/search/SearchResults"));
const Cart = lazy(() => import("./page/cart/Cart"));
const Checkout = lazy(() => import("./page/checkout/Checkout"));
const Wishlist = lazy(() => import("./page/wishlist/Wishlist"));
const About = lazy(() => import("./page/about/About"));
const Contact = lazy(() => import("./page/contact/Contact"));
const NotFound = lazy(() => import("./page/notFound/NotFound"));

function App() {
  const location = useLocation();

  return (
    <div className="app">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: { background: "#1E1B2E", color: "#fff", borderRadius: "12px", padding: "12px 16px", fontSize: "14px" },
          success: { iconTheme: { primary: "#7C3AED", secondary: "#fff" } },
        }}
      />
      <ScrollToTop />

      <main id="main" className="main">
        <AnimatePresence mode="wait" initial={false}>
          <PageTransition key={location.pathname}>
            <Suspense fallback={<div className="route-loading" role="status" aria-label="Loading page" />}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            </Suspense>
          </PageTransition>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

export default App;
