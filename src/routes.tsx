import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AuthProvider } from "@/components/AuthProvider";
import { Layout } from "@/components/Layout";
import { LoadingFallback } from "./routes/LoadingFallback";

// Import route groups
import { publicRoutes } from "./routes/public";
import { shopRoutes } from "./routes/shop";
import { accountRoutes } from "./routes/account";
import { vendorRoutes } from "./routes/vendor";
import { adminRoutes } from "./routes/admin";
import { policyRoutes } from "./routes/policy";

// Lazy load NotFound page
const NotFound = lazy(() => import("@/pages/NotFound"));

const isDevelopment = import.meta.env.MODE === 'development';
const baseUrl = isDevelopment ? '/' : '/shop-african-brand';

console.log("Creating router with baseUrl:", baseUrl);

// Add a small delay to prevent flash of loading state
const withDelayedLoading = (Component: React.ComponentType) => {
  return (props: any) => (
    <Suspense fallback={<LoadingFallback />}>
      <Component {...props} />
    </Suspense>
  );
};

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthProvider><Layout /></AuthProvider>}>
      {publicRoutes}
      {shopRoutes}
      {accountRoutes}
      {vendorRoutes}
      {adminRoutes}
      {policyRoutes}
      <Route 
        path="*" 
        element={withDelayedLoading(NotFound)({})} 
      />
    </Route>
  ),
  {
    basename: baseUrl
  }
);