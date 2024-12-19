import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useBulkOrderMetrics = () => {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ["bulk-order-metrics"],
    queryFn: async () => {
      // This would normally fetch from your API
      return {
        totalOrders: 150,
        averageOrderValue: 2500,
        conversionRate: 15.5
      };
    }
  });

  return {
    metrics: metrics || { totalOrders: 0, averageOrderValue: 0, conversionRate: 0 },
    isLoading
  };
};