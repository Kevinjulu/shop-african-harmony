import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Loader2 } from "lucide-react";

interface ChartData {
  date: string;
  orders: number;
  revenue: number;
}

export const BulkOrderChart = () => {
  const { user } = useAuth();

  const { data: chartData, isLoading } = useQuery({
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

      // Group orders by date
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-72">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!chartData?.length) return null;

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Bulk Order Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" orientation="left" stroke="#82ca9d" />
              <YAxis yAxisId="right" orientation="right" stroke="#8884d8" />
              <Tooltip />
              <Bar yAxisId="left" dataKey="orders" fill="#82ca9d" name="Orders" />
              <Bar yAxisId="right" dataKey="revenue" fill="#8884d8" name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};