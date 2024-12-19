import { lazy } from "react";
import { Route } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { VendorLayout } from "@/components/vendor/VendorLayout";

const VendorDashboard = lazy(() => import("@/pages/vendor/Dashboard"));
const VendorProducts = lazy(() => import("@/pages/vendor/Products"));
const VendorProfile = lazy(() => import("@/pages/vendor/Profile"));
const VendorPayouts = lazy(() => import("@/pages/vendor/Payouts"));
const VendorRegister = lazy(() => import("@/pages/vendor/Register"));
const SellOnShopAfrican = lazy(() => import("@/pages/vendor/SellOnShopAfrican"));

export const vendorRoutes = (
  <>
    <Route path="/vendor" element={<ProtectedRoute><VendorLayout /></ProtectedRoute>}>
      <Route index element={<VendorDashboard />} />
      <Route path="products" element={<VendorProducts />} />
      <Route path="profile" element={<VendorProfile />} />
      <Route path="payouts" element={<VendorPayouts />} />
    </Route>
    <Route path="/vendor/register" element={<VendorRegister />} />
    <Route path="/sell" element={<SellOnShopAfrican />} />
  </>
);