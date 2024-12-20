import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { LoadingSpinner } from "./LoadingSpinner";
import { toast } from "sonner";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  console.log("ProtectedRoute - Loading:", loading, "User:", user?.email);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    console.log("ProtectedRoute - No user found, redirecting to auth");
    toast.error("Please sign in to access this page");
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};