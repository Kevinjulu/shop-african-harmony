import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { VendorRating } from "../ratings/VendorRating";
import { VendorRatingDisplay } from "../ratings/VendorRatingDisplay";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
      <Card>
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
        <CardContent>
          <div className="space-y-6">
            <VendorRatingDisplay vendorId={vendor.id} />
            
            <div className="border-t pt-6">
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
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorStore;