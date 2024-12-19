import { lazy } from "react";
import { Route } from "react-router-dom";
import { AdminRoute } from "@/components/AdminRoute";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";

// Lazy load admin pages
const Dashboard = lazy(() => import("@/pages/admin/Dashboard"));
const Products = lazy(() => import("@/pages/admin/products/ProductManager"));
const Categories = lazy(() => import("@/pages/admin/categories/CategoriesPage"));
const Vendors = lazy(() => import("@/pages/admin/vendors/VendorsPage"));
const Orders = lazy(() => import("@/pages/admin/orders/OrdersPage"));
const Customers = lazy(() => import("@/pages/admin/customers/CustomersPage"));
const ContentManagement = lazy(() => import("@/pages/admin/ContentManagement"));
const Settings = lazy(() => import("@/pages/admin/settings/SettingsPage"));
const Analytics = lazy(() => import("@/pages/admin/analytics/AnalyticsPage"));

export const adminRoutes = (
  <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
    <Route index element={<Dashboard />} />
    <Route path="products/*" element={<Products />} />
    <Route path="categories" element={<Categories />} />
    <Route path="vendors/*" element={<Vendors />} />
    <Route path="orders" element={<Orders />} />
    <Route path="customers" element={<Customers />} />
    <Route path="content/*" element={<ContentManagement />} />
    <Route path="analytics" element={<Analytics />} />
    <Route path="settings" element={<Settings />} />
  </Route>
);