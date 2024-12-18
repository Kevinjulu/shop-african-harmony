import { Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LoadingFallback } from "./LoadingFallback";

const Account = lazy(() => import("@/pages/Account"));
const AuthPage = lazy(() => import("@/pages/Auth"));
const Wishlist = lazy(() => import("@/pages/Wishlist"));

export const accountRoutes = [
  <Route 
    key="account"
    path="/account" 
    element={
      <Suspense fallback={<LoadingFallback />}>
        <Account />
      </Suspense>
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
    key="wishlist"
    path="/wishlist" 
    element={
      <Suspense fallback={<LoadingFallback />}>
        <Wishlist />
      </Suspense>
    }
  />
];