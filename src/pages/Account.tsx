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
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { role, loading: roleLoading } = useUserRole();

  useEffect(() => {
    console.log("Account page mounted - Auth loading:", authLoading, "User:", user?.email);
    
    if (!authLoading && !user) {
      console.log("No authenticated user found, redirecting to auth page");
      toast.error("Please sign in to access your account");
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  if (authLoading || roleLoading) {
    console.log("Showing loading spinner - Auth loading:", authLoading, "Role loading:", roleLoading);
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    console.log("No user found, returning null");
    return null;
  }

  console.log("Rendering account page for user:", user.email, "with role:", role);
  
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