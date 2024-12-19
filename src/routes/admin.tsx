import { lazy } from "react";
import { Route } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AdminSidebar } from "@/components/admin/layout/AdminSidebar";

const Dashboard = lazy(() => import("@/pages/admin/Dashboard"));
const ContentManagement = lazy(() => import("@/pages/admin/ContentManagement"));
const ProductManager = lazy(() => import("@/pages/admin/products/ProductManager"));
const CustomersPage = lazy(() => import("@/pages/admin/customers/CustomersPage"));
const VendorsPage = lazy(() => import("@/pages/admin/vendors/VendorsPage"));
const SettingsPage = lazy(() => import("@/pages/admin/settings/SettingsPage"));

export const adminRoutes = (
  <Route path="/admin" element={<ProtectedRoute><AdminSidebar /></ProtectedRoute>}>
    <Route index element={<Dashboard />} />
    <Route path="content/*" element={<ContentManagement />} />
    <Route path="products" element={<ProductManager />} />
    <Route path="customers" element={<CustomersPage />} />
    <Route path="vendors" element={<VendorsPage />} />
    <Route path="settings" element={<SettingsPage />} />
  </Route>
);