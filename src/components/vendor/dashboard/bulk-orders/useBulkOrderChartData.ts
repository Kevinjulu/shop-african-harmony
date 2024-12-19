import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useBulkOrderChartData = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["bulk-order-chart"],
    queryFn: async () => {
      // This would normally fetch from your API
      return [
        { date: "Jan", orders: 65 },
        { date: "Feb", orders: 85 },
        { date: "Mar", orders: 75 },
        { date: "Apr", orders: 95 },
        { date: "May", orders: 115 },
        { date: "Jun", orders: 125 }
      ];
    }
  });

  return {
    data: data || [],
    isLoading
  };
};