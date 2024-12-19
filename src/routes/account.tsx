import { Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LoadingFallback } from "./LoadingFallback";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Lazy load components
const Account = lazy(() => import("@/pages/Account"));
const AuthPage = lazy(() => import("@/pages/Auth"));
const Wishlist = lazy(() => import("@/pages/Wishlist"));
const OrderHistory = lazy(() => import("@/pages/OrderHistory"));
const OrderConfirmation = lazy(() => import("@/pages/OrderConfirmation"));

export const accountRoutes = [
  <Route 
    key="account"
    path="/account" 
    element={
      <ProtectedRoute>
        <Suspense fallback={<LoadingFallback />}>
          <Account />
        </Suspense>
      </ProtectedRoute>
    }
  />,
  <Route 
    key="auth"
    path="/auth" 
    element={
      <Suspense fallback={<LoadingFallback />}>
        <AuthPage />
      </Suspense>
    }
  />,
  <Route 
    key="reset-password"
    path="/auth/reset-password" 
    element={
      <Suspense fallback={<LoadingFallback />}>
        <AuthPage />
      </Suspense>
    }
  />,
  <Route 
    key="wishlist"
    path="/wishlist" 
    element={
      <ProtectedRoute>
        <Suspense fallback={<LoadingFallback />}>
          <Wishlist />
        </Suspense>
      </ProtectedRoute>
    }
  />,
  <Route 
    key="orders"
    path="/account/orders" 
    element={
      <ProtectedRoute>
        <Suspense fallback={<LoadingFallback />}>
          <OrderHistory />
        </Suspense>
      </ProtectedRoute>
    }
  />,
  <Route 
    key="order-confirmation"
    path="/order/:orderId" 
    element={
      <ProtectedRoute>
        <Suspense fallback={<LoadingFallback />}>
          <OrderConfirmation />
        </Suspense>
      </ProtectedRoute>
    }
  />
];