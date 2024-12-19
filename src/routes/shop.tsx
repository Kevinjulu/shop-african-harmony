import { Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LoadingFallback } from "./LoadingFallback";

// Lazy load components with error boundaries
const Products = lazy(() => 
  import("@/pages/Products")
    .then(module => ({ default: module.default }))
    .catch(error => {
      console.error("Error loading Products page:", error);
      return import("./LoadingFallback");
    })
);

const ProductDetails = lazy(() => 
  import("@/pages/ProductDetails")
    .then(module => ({ default: module.default }))
    .catch(error => {
      console.error("Error loading Product Details page:", error);
      return import("./LoadingFallback");
    })
);

const Cart = lazy(() => import("@/pages/Cart"));
const Checkout = lazy(() => import("@/pages/Checkout"));
const NewArrivals = lazy(() => import("@/pages/NewArrivals"));
const BestSellers = lazy(() => import("@/pages/BestSellers"));
const OnSale = lazy(() => import("@/pages/OnSale"));
const Traditional = lazy(() => import("@/pages/Traditional"));

const withSuspense = (Component: React.ComponentType) => {
  return (props: any) => (
    <Suspense fallback={<LoadingFallback />}>
      <Component {...props} />
    </Suspense>
  );
};

export const shopRoutes = [
  <Route 
    key="products"
    path="/products" 
    element={withSuspense(Products)({})}
  />,
  <Route 
    key="product-details"
    path="/product/:id" 
    element={withSuspense(ProductDetails)({})}
  />,
  <Route 
    key="cart"
    path="/cart" 
    element={withSuspense(Cart)({})}
  />,
  <Route 
    key="checkout"
    path="/checkout" 
    element={withSuspense(Checkout)({})}
  />,
  <Route 
    key="new-arrivals"
    path="/new-arrivals" 
    element={withSuspense(NewArrivals)({})}
  />,
  <Route 
    key="best-sellers"
    path="/best-sellers" 
    element={withSuspense(BestSellers)({})}
  />,
  <Route 
    key="on-sale"
    path="/on-sale" 
    element={withSuspense(OnSale)({})}
  />,
  <Route 
    key="traditional"
    path="/traditional" 
    element={withSuspense(Traditional)({})}
  />
];