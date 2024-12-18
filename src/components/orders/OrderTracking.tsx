import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Package, Truck, CheckCircle } from "lucide-react";
import type { TrackingUpdate } from "@/types/order";

interface OrderTrackingProps {
  orderId: string;
}

export const OrderTracking = ({ orderId }: OrderTrackingProps) => {
  const { data: trackingUpdates, isLoading } = useQuery({
    queryKey: ["order-tracking", orderId],
    queryFn: async () => {
      console.log('Fetching tracking updates for order:', orderId);
      const { data, error } = await supabase
        .from("order_tracking")
        .select("*")
        .eq("order_id", orderId)
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data as TrackingUpdate[];
    },
  });

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      </Card>
    );
  }

  if (!trackingUpdates?.length) {
    return (
      <Card className="p-6">
        <p className="text-gray-500">No tracking information available yet.</p>
      </Card>
    );
  }

  const getIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'in_transit':
        return <Truck className="w-6 h-6 text-blue-500" />;
      default:
        return <Package className="w-6 h-6 text-gray-500" />;
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {trackingUpdates.map((update, index) => (
          <div key={update.id} className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              {getIcon(update.status)}
            </div>
            <div className="flex-grow">
              <p className="font-medium">{update.status}</p>
              <p className="text-sm text-gray-500">{update.location}</p>
              <p className="text-xs text-gray-400">
                {new Date(update.created_at).toLocaleString()}
              </p>
              {update.notes && (
                <p className="text-sm text-gray-600 mt-1">{update.notes}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};