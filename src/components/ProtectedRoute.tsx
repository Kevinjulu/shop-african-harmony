import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { LoadingSpinner } from "./LoadingSpinner";
import { toast } from "sonner";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  console.log("ProtectedRoute - loading:", loading, "user:", user?.email);

  if (loading) {
    return (
      <div className="container mx-auto py-8 flex items-center justify-center min-h-[60vh]">
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