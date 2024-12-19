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
import { format } from "date-fns";
import { Loader2 } from "lucide-react";

export const RFQStatus = () => {
  const { user } = useAuth();

  const { data: rfqs, isLoading } = useQuery({
    queryKey: ["rfqs", user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from("rfq_requests")
        .select(`
          *,
          products (name, price),
          vendor_profiles (business_name)
        `)
        .eq("buyer_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  if (!rfqs?.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No RFQ requests found
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Vendor</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Submitted</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rfqs.map((rfq) => (
            <TableRow key={rfq.id}>
              <TableCell>{rfq.products?.name}</TableCell>
              <TableCell>{rfq.vendor_profiles?.business_name}</TableCell>
              <TableCell>{rfq.quantity}</TableCell>
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
              <TableCell>
                {format(new Date(rfq.created_at), "MMM d, yyyy")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};