import { Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LoadingFallback } from "./LoadingFallback";

const Products = lazy(() => import("@/pages/Products"));
const ProductDetails = lazy(() => import("@/pages/ProductDetails"));
const Cart = lazy(() => import("@/pages/Cart"));
const Checkout = lazy(() => import("@/pages/Checkout"));
const NewArrivals = lazy(() => import("@/pages/NewArrivals"));
const BestSellers = lazy(() => import("@/pages/BestSellers"));
const OnSale = lazy(() => import("@/pages/OnSale"));
const Traditional = lazy(() => import("@/pages/Traditional"));

export const shopRoutes = [
  <Route 
    key="products"
    path="/products" 
    element={
      <Suspense fallback={<LoadingFallback />}>
        <Products />
      </Suspense>
    }
  />,
  <Route 
    key="product-details"
    path="/product/:id" 
    element={
      <Suspense fallback={<LoadingFallback />}>
        <ProductDetails />
      </Suspense>
    }
  />,
  <Route 
    key="cart"
    path="/cart" 
    element={
      <Suspense fallback={<LoadingFallback />}>
        <Cart />
      </Suspense>
    }
  />,
  <Route 
    key="checkout"
    path="/checkout" 
    element={
      <Suspense fallback={<LoadingFallback />}>
        <Checkout />
      </Suspense>
    }
  />,
  <Route 
    key="new-arrivals"
    path="/new-arrivals" 
    element={
      <Suspense fallback={<LoadingFallback />}>
        <NewArrivals />
      </Suspense>
    }
  />,
  <Route 
    key="best-sellers"
    path="/best-sellers" 
    element={
      <Suspense fallback={<LoadingFallback />}>
        <BestSellers />
      </Suspense>
    }
  />,
  <Route 
    key="on-sale"
    path="/on-sale" 
    element={
      <Suspense fallback={<LoadingFallback />}>
        <OnSale />
      </Suspense>
    }
  />,
  <Route 
    key="traditional"
    path="/traditional" 
    element={
      <Suspense fallback={<LoadingFallback />}>
        <Traditional />
      </Suspense>
    }
  />
];