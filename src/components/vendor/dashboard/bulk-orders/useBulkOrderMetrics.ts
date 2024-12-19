import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";

export interface BulkOrderMetrics {
  total_bulk_orders: number;
  total_bulk_revenue: number;
  average_order_size: number;
  largest_order: number;
}

export const useBulkOrderMetrics = () => {
  const { user } = useAuth();

  return useQuery({
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
};