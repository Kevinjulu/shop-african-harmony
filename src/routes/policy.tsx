import { Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LoadingFallback } from "./LoadingFallback";

const ShippingPolicy = lazy(() => import("@/pages/ShippingPolicy"));
const ReturnsPolicy = lazy(() => import("@/pages/ReturnsPolicy"));
const Careers = lazy(() => import("@/pages/Careers"));
const Affiliate = lazy(() => import("@/pages/Affiliate"));
const Terms = lazy(() => import("@/pages/Terms"));
const FAQ = lazy(() => import("@/pages/FAQ"));

export const policyRoutes = [
  <Route 
    key="shipping-policy"
    path="/shipping-policy" 
    element={
      <Suspense fallback={<LoadingFallback />}>
        <ShippingPolicy />
      </Suspense>
    }
  />,
  <Route 
    key="returns-policy"
    path="/returns-policy" 
    element={
      <Suspense fallback={<LoadingFallback />}>
        <ReturnsPolicy />
      </Suspense>
    }
  />,
  <Route 
    key="careers"
    path="/careers" 
    element={
      <Suspense fallback={<LoadingFallback />}>
        <Careers />
      </Suspense>
    }
  />,
  <Route 
    key="affiliate"
    path="/affiliate" 
    element={
      <Suspense fallback={<LoadingFallback />}>
        <Affiliate />
      </Suspense>
    }
  />,
  <Route 
    key="terms"
    path="/terms" 
    element={
      <Suspense fallback={<LoadingFallback />}>
        <Terms />
      </Suspense>
    }
  />,
  <Route 
    key="faq"
    path="/faq" 
    element={
      <Suspense fallback={<LoadingFallback />}>
        <FAQ />
      </Suspense>
    }
  />
];