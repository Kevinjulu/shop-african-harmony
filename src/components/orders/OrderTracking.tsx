import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrackingUpdate } from "@/types/order";

interface OrderTrackingProps {
  orderId: string;
}

export const OrderTracking = ({ orderId }: OrderTrackingProps) => {
  const [updates, setUpdates] = useState<TrackingUpdate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTracking = async () => {
      const { data, error } = await supabase
        .from('order_tracking')
        .select('*')
        .eq('order_id', orderId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching tracking:', error);
        return;
      }

      // Map the data to include timestamp from created_at
      const formattedUpdates = data.map(update => ({
        ...update,
        timestamp: update.created_at
      }));

      setUpdates(formattedUpdates);
      setLoading(false);
    };

    fetchTracking();

    // Subscribe to realtime updates
    const channel = supabase
      .channel(`order_tracking:${orderId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'order_tracking',
        filter: `order_id=eq.${orderId}`
      }, (payload) => {
        console.log('Received tracking update:', payload);
        fetchTracking();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [orderId]);

  if (loading) {
    return <div>Loading tracking information...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Tracking</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {updates.map((update) => (
            <div key={update.id} className="flex items-start space-x-4">
              <div className="min-w-[120px]">
                <Badge variant={update.status === 'delivered' ? 'default' : 'secondary'}>
                  {update.status}
                </Badge>
              </div>
              <div>
                <p className="font-medium">{update.location}</p>
                <p className="text-sm text-gray-500">
                  {new Date(update.timestamp).toLocaleString()}
                </p>
                {update.notes && (
                  <p className="text-sm text-gray-600 mt-1">{update.notes}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};