import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { formatPrice } from "@/utils/currency";

export const VendorRFQList = () => {
  const { user } = useAuth();

  const { data: rfqs, isLoading } = useQuery({
    queryKey: ["vendor-rfqs", user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data: vendorProfile } = await supabase
        .from("vendor_profiles")
        .select("id")
        .eq("user_id", user.id)
        .single();

      if (!vendorProfile) return [];

      const { data, error } = await supabase
        .from("rfq_requests")
        .select(`
          *,
          products (name, price),
          profiles (full_name)
        `)
        .eq("vendor_id", vendorProfile.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const handleResponse = async (rfqId: string, accept: boolean) => {
    try {
      const { error } = await supabase
        .from("rfq_requests")
        .update({ status: accept ? "accepted" : "rejected" })
        .eq("id", rfqId);

      if (error) throw error;

      toast.success(`RFQ ${accept ? "accepted" : "rejected"} successfully`);
    } catch (error) {
      console.error("Error updating RFQ:", error);
      toast.error("Failed to update RFQ");
    }
  };

  if (isLoading) {
    return <div>Loading RFQs...</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Received RFQ Requests</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Buyer</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Desired Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rfqs?.map((rfq) => (
            <TableRow key={rfq.id}>
              <TableCell>{rfq.products?.name}</TableCell>
              <TableCell>{rfq.profiles?.full_name}</TableCell>
              <TableCell>{rfq.quantity}</TableCell>
              <TableCell>{formatPrice(rfq.desired_price)}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    rfq.status === "pending"
                      ? "secondary"
                      : rfq.status === "accepted"
                      ? "success"
                      : "destructive"
                  }
                >
                  {rfq.status}
                </Badge>
              </TableCell>
              <TableCell>
                {rfq.status === "pending" && (
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="default"
                      onClick={() => handleResponse(rfq.id, true)}
                    >
                      Accept
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleResponse(rfq.id, false)}
                    >
                      Reject
                    </Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};