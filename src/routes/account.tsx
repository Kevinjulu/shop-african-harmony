import { Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LoadingFallback } from "./LoadingFallback";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Lazy load components with error boundaries
const Account = lazy(() => 
  import("@/pages/Account")
    .then(module => ({ default: module.default }))
    .catch(error => {
      console.error("Error loading Account page:", error);
      return import("./LoadingFallback");
    })
);

const AuthPage = lazy(() => 
  import("@/pages/Auth")
    .then(module => ({ default: module.default }))
);

const Wishlist = lazy(() => 
  import("@/pages/Wishlist")
    .then(module => ({ default: module.default }))
);

const OrderHistory = lazy(() => 
  import("@/pages/OrderHistory")
    .then(module => ({ default: module.default }))
);

const OrderConfirmation = lazy(() => 
  import("@/pages/OrderConfirmation")
    .then(module => ({ default: module.default }))
);

const withSuspense = (Component: React.ComponentType, isProtected = false) => {
  return (props: any) => {
    const element = (
      <Suspense fallback={<LoadingFallback />}>
        <Component {...props} />
      </Suspense>
    );

    return isProtected ? <ProtectedRoute>{element}</ProtectedRoute> : element;
  };
};

export const accountRoutes = [
  <Route 
    key="account"
    path="/account" 
    element={withSuspense(Account, true)({})}
  />,
  <Route 
    key="auth"
    path="/auth" 
    element={withSuspense(AuthPage)({})}
  />,
  <Route 
    key="reset-password"
    path="/auth/reset-password" 
    element={withSuspense(AuthPage)({})}
  />,
  <Route 
    key="wishlist"
    path="/wishlist" 
    element={withSuspense(Wishlist, true)({})}
  />,
  <Route 
    key="orders"
    path="/account/orders" 
    element={withSuspense(OrderHistory, true)({})}
  />,
  <Route 
    key="order-confirmation"
    path="/order/:orderId" 
    element={withSuspense(OrderConfirmation, true)({})}
  />
];