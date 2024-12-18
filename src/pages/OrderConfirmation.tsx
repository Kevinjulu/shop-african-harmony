import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { OrderTracking } from "@/components/orders/OrderTracking";
import { OrderDetailsCard } from "@/components/orders/OrderDetails";
import { OrderItemsList } from "@/components/orders/OrderItemsList";
import { ShippingDetails } from "@/components/orders/ShippingDetails";
import type { OrderDetails } from "@/hooks/useOrders";

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId || !user) {
        navigate("/");
        return;
      }

      try {
        const { data: orderData, error: orderError } = await supabase
          .from("orders")
          .select(`
            *,
            shipping_address:shipping_addresses(*),
            items:order_items(
              *,
              product:products(name, image_url)
            )
          `)
          .eq("id", orderId)
          .eq("user_id", user.id)
          .single();

        if (orderError) throw orderError;
        if (!orderData) {
          toast.error("Order not found");
          navigate("/");
          return;
        }

        setOrder(orderData as OrderDetails);
      } catch (error) {
        console.error("Error fetching order:", error);
        toast.error("Failed to load order details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, user, navigate]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!order) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-green-600">Order Confirmed!</h1>
          <p className="text-gray-600">
            Thank you for your order. We'll send you a confirmation email shortly.
          </p>
        </div>

        <Card className="p-6 space-y-6">
          <OrderDetailsCard order={order} />
          <Separator />

          <div>
            <h3 className="font-semibold mb-4">Items</h3>
            <OrderItemsList items={order.items} />
          </div>

          <Separator />

          {order.shipping_address && (
            <>
              <ShippingDetails address={order.shipping_address} />
              <Separator />
            </>
          )}

          {order.tracking_number && (
            <div>
              <h3 className="font-semibold mb-4">Tracking Information</h3>
              <OrderTracking orderId={order.id} />
            </div>
          )}
        </Card>

        <div className="flex justify-center space-x-4">
          <Button onClick={() => navigate("/")}>Continue Shopping</Button>
          <Button variant="outline" onClick={() => navigate("/account/orders")}>
            View All Orders
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;