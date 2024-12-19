import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";

export interface ChartData {
  date: string;
  orders: number;
  revenue: number;
}

export const useBulkOrderChartData = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["bulk-order-chart", user?.id],
    queryFn: async () => {
      console.log("Fetching bulk order chart data for vendor:", user?.id);
      const { data: vendorProfile } = await supabase
        .from("vendor_profiles")
        .select("id")
        .eq("user_id", user?.id)
        .single();

      if (!vendorProfile) throw new Error("Vendor profile not found");

      const { data, error } = await supabase
        .from("orders")
        .select(`
          created_at,
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
        .gte("created_at", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
        .order("created_at");

      if (error) throw error;

      const groupedData = data.reduce((acc: Record<string, ChartData>, order) => {
        const isBulkOrder = order.order_items.some(item => 
          item.product.is_bulk_only || 
          item.quantity >= (item.product.minimum_order_quantity || 0)
        );

        if (!isBulkOrder) return acc;

        const date = new Date(order.created_at).toLocaleDateString();
        if (!acc[date]) {
          acc[date] = { date, orders: 0, revenue: 0 };
        }
        acc[date].orders += 1;
        acc[date].revenue += order.total_amount;
        return acc;
      }, {});

      return Object.values(groupedData);
    },
    enabled: !!user
  });
};