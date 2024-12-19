import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/components/AuthProvider";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { AccountHeader } from "@/components/account/AccountHeader";
import { AccountOverview } from "@/components/account/AccountOverview";
import { AccountOrders } from "@/components/account/AccountOrders";
import { AccountWishlist } from "@/components/account/AccountWishlist";
import { AccountHistory } from "@/components/account/AccountHistory";
import { AccountSettings } from "@/components/account/AccountSettings";
import { useUserRole } from "@/hooks/useUserRole";
import { toast } from "sonner";

const Account = () => {
  const { user, loading: authLoading, error: authError } = useAuth();
  const navigate = useNavigate();
  const { role, loading: roleLoading, error: roleError } = useUserRole();

  useEffect(() => {
    console.log("Account page: Initialization", {
      authStatus: user ? 'authenticated' : 'unauthenticated',
      userEmail: user?.email,
      role,
      authLoading,
      roleLoading
    });

    if (!authLoading && !user) {
      console.log("Account page: No authenticated user, redirecting to auth");
      toast.error("Please sign in to access your account");
      navigate("/auth");
    }
  }, [user, authLoading, navigate, role]);

  if (authLoading || roleLoading) {
    console.log("Account page: Loading state", { authLoading, roleLoading });
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (authError || roleError) {
    console.error("Account page: Error state", { authError, roleError });
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600">
            Error loading account
          </h2>
          <p className="mt-2 text-gray-600">
            {authError?.message || roleError?.message || "Please try again later"}
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    console.log("Account page: No user found, returning null");
    return null;
  }

  console.log("Account page: Rendering for user", {
    email: user.email,
    role,
    path: window.location.pathname
  });
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <AccountHeader role={role} />
        
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="bg-white border">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="bg-transparent">
            <AccountOverview />
          </TabsContent>

          <TabsContent value="orders" className="bg-transparent">
            <AccountOrders />
          </TabsContent>

          <TabsContent value="wishlist" className="bg-transparent">
            <AccountWishlist />
          </TabsContent>

          <TabsContent value="history" className="bg-transparent">
            <AccountHistory />
          </TabsContent>

          <TabsContent value="settings" className="bg-transparent">
            <AccountSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Account;