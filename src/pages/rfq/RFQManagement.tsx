import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RFQList } from "@/components/rfq/RFQList";
import { VendorRFQList } from "@/components/rfq/VendorRFQList";
import { useAuth } from "@/components/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const RFQManagement = () => {
  const { user } = useAuth();

  const { data: isVendor } = useQuery({
    queryKey: ["is-vendor", user?.id],
    queryFn: async () => {
      if (!user) return false;

      const { data } = await supabase
        .from("vendor_profiles")
        .select("id")
        .eq("user_id", user.id)
        .single();

      return !!data;
    },
    enabled: !!user,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">RFQ Management</h1>

      <Tabs defaultValue="my-rfqs">
        <TabsList>
          <TabsTrigger value="my-rfqs">My RFQs</TabsTrigger>
          {isVendor && <TabsTrigger value="received-rfqs">Received RFQs</TabsTrigger>}
        </TabsList>

        <TabsContent value="my-rfqs" className="mt-6">
          <RFQList />
        </TabsContent>

        {isVendor && (
          <TabsContent value="received-rfqs" className="mt-6">
            <VendorRFQList />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default RFQManagement;