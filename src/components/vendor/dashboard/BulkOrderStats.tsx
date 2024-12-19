import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { Loader2 } from "lucide-react";

interface BulkOrderMetrics {
  total_bulk_orders: number;
  total_bulk_revenue: number;
  average_order_size: number;
  largest_order: number;
}

export const BulkOrderStats = () => {
  const { user } = useAuth();

  const { data: metrics, isLoading } = useQuery({
    queryKey: ["bulk-order-metrics", user?.id],
    queryFn: async () => {
      console.log("Fetching bulk order metrics for vendor:", user?.id);
      const { data: vendorProfile } = await supabase
        .from("vendor_profiles")
        .select("id")
        .eq("user_id", user?.id)
        .single();

      if (!vendorProfile) throw new Error("Vendor profile not found");

      const { data, error } = await supabase
        .from("orders")
        .select(`
          id,
          total_amount,
          order_items (
            quantity,
            product:products (
              minimum_order_quantity,
              is_bulk_only
            )
          )
        `)
        .eq("products.vendor_id", vendorProfile.id)
        .gte("created_at", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

      if (error) throw error;

      // Calculate metrics
      const bulkOrders = data.filter(order => 
        order.order_items.some(item => 
          item.product.is_bulk_only || 
          item.quantity >= (item.product.minimum_order_quantity || 0)
        )
      );

      const metrics: BulkOrderMetrics = {
        total_bulk_orders: bulkOrders.length,
        total_bulk_revenue: bulkOrders.reduce((sum, order) => sum + order.total_amount, 0),
        average_order_size: bulkOrders.length ? 
          bulkOrders.reduce((sum, order) => sum + order.total_amount, 0) / bulkOrders.length : 
          0,
        largest_order: Math.max(...bulkOrders.map(order => order.total_amount), 0)
      };

      return metrics;
    },
    enabled: !!user
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!metrics) return null;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Bulk Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.total_bulk_orders}</div>
          <p className="text-xs text-muted-foreground">Last 30 days</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Bulk Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${metrics.total_bulk_revenue.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">Last 30 days</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Order Size</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${metrics.average_order_size.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">Per bulk order</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Largest Order</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${metrics.largest_order.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">Highest value</p>
        </CardContent>
      </Card>
    </div>
  );
};