import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "swiper/css";
import "./index.css";
import App from "./App.jsx";
import CartProvider from "./component/context/CartProvider.jsx";
import WishlistProvider from "./component/context/WishlistProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>
          <App />
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
);
