import { Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LoadingFallback } from "./LoadingFallback";

const AdminDashboard = lazy(() => import("@/pages/admin/Dashboard"));

export const adminRoutes = [
  <Route 
    key="admin"
    path="/admin/*" 
    element={
      <Suspense fallback={<LoadingFallback />}>
        <AdminDashboard />
      </Suspense>
    }
  />
];