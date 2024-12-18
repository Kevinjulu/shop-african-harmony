import { Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LoadingFallback } from "./LoadingFallback";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const AdminDashboard = lazy(() => import("@/pages/admin/Dashboard"));
const ContentManagement = lazy(() => import("@/pages/admin/ContentManagement"));
const FAQsPage = lazy(() => import("@/pages/admin/content/FAQs"));
const StaticPagesPage = lazy(() => import("@/pages/admin/content/StaticPages"));

export const adminRoutes = [
  <Route
    key="admin"
    path="/admin"
    element={
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
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
      path="content"
      element={
        <Suspense fallback={<LoadingFallback />}>
          <ContentManagement />
        </Suspense>
      }
    />
    <Route
      path="faqs"
      element={
        <Suspense fallback={<LoadingFallback />}>
          <FAQsPage />
        </Suspense>
      }
    />
    <Route
      path="static-pages"
      element={
        <Suspense fallback={<LoadingFallback />}>
          <StaticPagesPage />
        </Suspense>
      }
    />
  </Route>
];