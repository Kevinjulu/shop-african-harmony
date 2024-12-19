import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { VendorRating } from "../ratings/VendorRating";
import { VendorRatingDisplay } from "../ratings/VendorRatingDisplay";
import { VendorVerificationStatus } from "../verification/VendorVerificationStatus";
import { VendorAnalyticsDashboard } from "../analytics/VendorAnalyticsDashboard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface VendorProfile {
  id: string;
  business_name: string;
  description: string;
  logo_url: string;
}

const VendorStore = () => {
  const { id } = useParams<{ id: string }>();
  const [vendor, setVendor] = useState<VendorProfile | null>(null);
  const [showRatingForm, setShowRatingForm] = useState(false);

  useEffect(() => {
    const fetchVendor = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from("vendor_profiles")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setVendor(data);
      } catch (error) {
        console.error("Error fetching vendor:", error);
      }
    };

    fetchVendor();
  }, [id]);

  if (!vendor) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-4">
            {vendor.logo_url && (
              <img
                src={vendor.logo_url}
                alt={vendor.business_name}
                className="w-16 h-16 rounded-full object-cover"
              />
            )}
            <div>
              <CardTitle>{vendor.business_name}</CardTitle>
              <CardDescription>{vendor.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2">
          <VendorVerificationStatus vendorId={vendor.id} />
        </div>
        <div>
          <VendorRatingDisplay vendorId={vendor.id} />
        </div>
      </div>

      <Tabs defaultValue="analytics" className="space-y-4">
        <TabsList>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        
        <TabsContent value="analytics">
          <VendorAnalyticsDashboard vendorId={vendor.id} />
        </TabsContent>
        
        <TabsContent value="reviews">
          <Card>
            <CardContent className="pt-6">
              {showRatingForm ? (
                <VendorRating
                  vendorId={vendor.id}
                  onRatingSubmit={() => setShowRatingForm(false)}
                />
              ) : (
                <Button onClick={() => setShowRatingForm(true)}>
                  Write a Review
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VendorStore;