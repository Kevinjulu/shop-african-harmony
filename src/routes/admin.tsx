import { Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LoadingFallback } from "./LoadingFallback";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { AdminRoute } from "@/components/AdminRoute";

// Lazy load admin pages
const AdminDashboard = lazy(() => import("@/pages/admin/Dashboard"));
const ProductManager = lazy(() => import("@/components/admin/products/ProductManager"));
const ContentManagement = lazy(() => import("@/pages/admin/ContentManagement"));
const CustomersPage = lazy(() => import("@/pages/admin/customers/CustomersPage"));
const VendorsPage = lazy(() => import("@/pages/admin/vendors/VendorsPage"));
const OrdersPage = lazy(() => import("@/pages/admin/orders/OrdersPage"));
const SettingsPage = lazy(() => import("@/pages/admin/settings/SettingsPage"));

export const adminRoutes = [
  <Route
    key="admin"
    path="/admin"
    element={
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    }
  >
    <Route
      index
      element={
        <Suspense fallback={<LoadingFallback />}>
          <AdminDashboard />
        </Suspense>
      }
    />
    <Route
      path="products"
      element={
        <Suspense fallback={<LoadingFallback />}>
          <ProductManager />
        </Suspense>
      }
    />
    <Route
      path="content"
      element={
        <Suspense fallback={<LoadingFallback />}>
          <ContentManagement />
        </Suspense>
      }
    />
    <Route
      path="customers"
      element={
        <Suspense fallback={<LoadingFallback />}>
          <CustomersPage />
        </Suspense>
      }
    />
    <Route
      path="vendors"
      element={
        <Suspense fallback={<LoadingFallback />}>
          <VendorsPage />
        </Suspense>
      }
    />
    <Route
      path="orders"
      element={
        <Suspense fallback={<LoadingFallback />}>
          <OrdersPage />
        </Suspense>
      }
    />
    <Route
      path="settings"
      element={
        <Suspense fallback={<LoadingFallback />}>
          <SettingsPage />
        </Suspense>
      }
    />
  </Route>
];