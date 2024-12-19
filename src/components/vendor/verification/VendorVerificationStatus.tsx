import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, ShieldCheck, ShieldAlert } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface VendorVerificationProps {
  vendorId: string;
}

export const VendorVerificationStatus = ({ vendorId }: VendorVerificationProps) => {
  const { data: vendor, isLoading } = useQuery({
    queryKey: ['vendor-verification', vendorId],
    queryFn: async () => {
      console.log('Fetching vendor verification status:', vendorId);
      const { data, error } = await supabase
        .from('vendor_profiles')
        .select(`
          verification_status,
          verification_date,
          business_registration_number,
          business_category,
          commission_rate
        `)
        .eq('id', vendorId)
        .single();

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading verification status...</div>;
  }

  const getVerificationIcon = () => {
    switch (vendor?.verification_status) {
      case 'verified':
        return <ShieldCheck className="h-8 w-8 text-green-500" />;
      case 'pending':
        return <Shield className="h-8 w-8 text-yellow-500" />;
      default:
        return <ShieldAlert className="h-8 w-8 text-red-500" />;
    }
  };

  const getVerificationBadge = () => {
    switch (vendor?.verification_status) {
      case 'verified':
        return <Badge className="bg-green-500">Verified Business</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">Verification Pending</Badge>;
      default:
        return <Badge className="bg-red-500">Unverified</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getVerificationIcon()}
          Business Verification Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Status</span>
            {getVerificationBadge()}
          </div>
          
          {vendor?.verification_date && (
            <div className="flex justify-between items-center">
              <span>Verified On</span>
              <span>{new Date(vendor.verification_date).toLocaleDateString()}</span>
            </div>
          )}
          
          {vendor?.business_registration_number && (
            <div className="flex justify-between items-center">
              <span>Registration Number</span>
              <span>{vendor.business_registration_number}</span>
            </div>
          )}
          
          {vendor?.business_category && (
            <div className="flex justify-between items-center">
              <span>Business Category</span>
              <span>{vendor.business_category}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};