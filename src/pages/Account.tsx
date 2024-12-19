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

const Account = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { role, loading: roleLoading } = useUserRole();

  useEffect(() => {
    console.log("Account page mounted, auth loading:", authLoading, "user:", user?.email);
    if (!authLoading && !user) {
      console.log("No user found, redirecting to auth page");
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  if (authLoading || roleLoading) {
    console.log("Loading state active");
    return (
      <div className="container mx-auto py-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    console.log("No user found after loading");
    return null;
  }

  console.log("Rendering account page for user:", user.email);
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <AccountHeader role={role} />
        
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <AccountOverview />
          </TabsContent>

          <TabsContent value="orders">
            <AccountOrders />
          </TabsContent>

          <TabsContent value="wishlist">
            <AccountWishlist />
          </TabsContent>

          <TabsContent value="history">
            <AccountHistory />
          </TabsContent>

          <TabsContent value="settings">
            <AccountSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Account;