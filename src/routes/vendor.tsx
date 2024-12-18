import { Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LoadingFallback } from "./LoadingFallback";

const VendorDashboard = lazy(() => import("@/pages/vendor/Dashboard"));
const VendorProducts = lazy(() => import("@/pages/vendor/Products"));
const VendorRegister = lazy(() => import("@/pages/vendor/Register"));
const VendorStore = lazy(() => import("@/components/vendor/store/VendorStore"));
const StoreList = lazy(() => import("@/pages/StoreList"));

export const vendorRoutes = [
  <Route 
    key="vendor-dashboard"
    path="/vendor/dashboard" 
    element={
      <Suspense fallback={<LoadingFallback />}>
        <VendorDashboard />
      </Suspense>
    }
  />,
  <Route 
    key="vendor-products"
    path="/vendor/products" 
    element={
      <Suspense fallback={<LoadingFallback />}>
        <VendorProducts />
      </Suspense>
    }
  />,
  <Route 
    key="vendor-register"
    path="/vendor/register" 
    element={
      <Suspense fallback={<LoadingFallback />}>
        <VendorRegister />
      </Suspense>
    }
  />,
  <Route 
    key="vendor-store"
    path="/vendor/:id" 
    element={
      <Suspense fallback={<LoadingFallback />}>
        <VendorStore />
      </Suspense>
    }
  />,
  <Route 
    key="store-list"
    path="/stores" 
    element={
      <Suspense fallback={<LoadingFallback />}>
        <StoreList />
      </Suspense>
    }
  />
];