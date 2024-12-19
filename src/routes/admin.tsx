import { Route } from "react-router-dom";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { AdminRoute } from "@/components/AdminRoute";
import Dashboard from "@/pages/admin/Dashboard";
import ContentManagement from "@/pages/admin/ContentManagement";
import OrdersPage from "@/pages/admin/orders/OrdersPage";
import ProductManager from "@/pages/admin/products/ProductManager";
import SettingsPage from "@/pages/admin/settings/SettingsPage";
import AnnouncementsPage from "@/pages/admin/announcements/AnnouncementsPage";
import BannersPage from "@/pages/admin/banners/BannersPage";
import MarketplacesPage from "@/pages/admin/marketplaces/MarketplacesPage";

export const adminRoutes = (
  <Route
    path="/admin"
    element={
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    }
  >
    <Route index element={<Dashboard />} />
    <Route path="content" element={<ContentManagement />} />
    <Route path="orders" element={<OrdersPage />} />
    <Route path="products" element={<ProductManager />} />
    <Route path="settings" element={<SettingsPage />} />
    <Route path="announcements" element={<AnnouncementsPage />} />
    <Route path="banners" element={<BannersPage />} />
    <Route path="marketplaces" element={<MarketplacesPage />} />
  </Route>
);