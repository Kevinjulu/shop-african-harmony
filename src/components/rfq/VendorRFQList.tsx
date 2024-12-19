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
import { useCurrency } from "@/hooks/useCurrency";

export const VendorRFQList = () => {
  const { user } = useAuth();
  const { formatPrice } = useCurrency();

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

  if (isLoading) {
    return <div>Loading RFQs...</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">RFQ Requests</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Buyer</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Desired Price</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rfqs?.map((rfq) => (
            <TableRow key={rfq.id}>
              <TableCell>{rfq.products?.name}</TableCell>
              <TableCell>{rfq.profiles?.full_name}</TableCell>
              <TableCell>{rfq.quantity}</TableCell>
              <TableCell>{formatPrice(rfq.desired_price || 0)}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    rfq.status === "pending"
                      ? "secondary"
                      : rfq.status === "accepted"
                      ? "default"
                      : "destructive"
                  }
                >
                  {rfq.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};