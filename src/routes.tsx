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
const Index = lazy(() => import("@/pages/Index"));

const isDevelopment = import.meta.env.MODE === 'development';
const baseUrl = isDevelopment ? '/' : '/shop-african-brand';

console.log("Creating router with baseUrl:", baseUrl);

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthProvider><Layout /></AuthProvider>}>
      <Route 
        path="/" 
        element={
          <Suspense fallback={<LoadingFallback />}>
            <Index />
          </Suspense>
        } 
      />
      {publicRoutes}
      {shopRoutes}
      {accountRoutes}
      {vendorRoutes}
      {adminRoutes}
      {policyRoutes}
      <Route 
        path="*" 
        element={
          <Suspense fallback={<LoadingFallback />}>
            <NotFound />
          </Suspense>
        } 
      />
    </Route>
  ),
  {
    basename: baseUrl
  }
);