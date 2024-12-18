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

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthProvider><Layout /></AuthProvider>}>
      {/* Public Routes */}
      {publicRoutes}

      {/* Shop Routes */}
      {shopRoutes}

      {/* Account Routes */}
      {accountRoutes}

      {/* Vendor Routes */}
      {vendorRoutes}

      {/* Admin Routes */}
      {adminRoutes}

      {/* Policy Routes */}
      {policyRoutes}

      {/* 404 Route */}
      <Route 
        path="*" 
        element={
          <Suspense fallback={<LoadingFallback />}>
            <NotFound />
          </Suspense>
        } 
      />
    </Route>
  )
);