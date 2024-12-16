import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Vendor {
  id: string;
  business_name: string;
  products_count: number;
  total_revenue: string;
  status: "active" | "pending" | "suspended";
}

export const VendorTable = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const { data: vendorProfiles, error } = await supabase
          .from("vendor_profiles")
          .select(`
            id,
            business_name,
            status,
            products (count),
            analytics (total_sales)
          `);

        if (error) throw error;

        const formattedVendors = vendorProfiles?.map((vendor: any) => ({
          id: vendor.id,
          business_name: vendor.business_name,
          products_count: vendor.products?.[0]?.count || 0,
          total_revenue: new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(vendor.analytics?.[0]?.total_sales || 0),
          status: vendor.status,
        }));

        setVendors(formattedVendors || []);
      } catch (error) {
        console.error('Error fetching vendors:', error);
        toast.error("Failed to load vendors");
      } finally {
        setIsLoading(false);
      }
    };

    // Initial fetch
    fetchVendors();

    // Set up real-time subscription
    const channel = supabase
      .channel('vendor-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'vendor_profiles'
        },
        () => {
          fetchVendors(); // Refresh data when changes occur
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (isLoading) {
    return <div>Loading vendors...</div>;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Vendor</TableHead>
            <TableHead>Products</TableHead>
            <TableHead>Revenue</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vendors.map((vendor) => (
            <TableRow key={vendor.id}>
              <TableCell className="font-medium">{vendor.business_name}</TableCell>
              <TableCell>{vendor.products_count}</TableCell>
              <TableCell>{vendor.total_revenue}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    vendor.status === "active"
                      ? "default"
                      : vendor.status === "pending"
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {vendor.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};