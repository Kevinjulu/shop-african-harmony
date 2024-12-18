import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useCurrency } from "@/hooks/useCurrency";
import { useAuth } from "@/components/AuthProvider";
import { OrderTracking } from "@/components/orders/OrderTracking";

interface OrderDetails {
  id: string;
  created_at: string;
  total_amount: number;
  status: string;
  shipping_method: string;
  tracking_number: string | null;
  shipping_address: {
    full_name: string;
    address_line1: string;
    address_line2: string | null;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  } | null;
  items: Array<{
    id: string;
    product_id: string;
    quantity: number;
    price_at_time: number;
    product: {
      name: string;
      image_url: string;
    };
  }>;
}

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { formatPrice } = useCurrency();
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
          toast({
            title: "Order not found",
            description: "We couldn't find the order you're looking for.",
            variant: "destructive",
          });
          navigate("/");
          return;
        }

        setOrder(orderData as OrderDetails);
      } catch (error) {
        console.error("Error fetching order:", error);
        toast({
          title: "Error",
          description: "Failed to load order details.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, user, navigate, toast]);

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
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Order #{order.id}</h2>
              <p className="text-sm text-gray-500">
                Placed on {new Date(order.created_at).toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <p className="font-semibold">Total</p>
              <p className="text-xl font-bold text-primary">
                {formatPrice(order.total_amount)}
              </p>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-4">Items</h3>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <img
                    src={item.product.image_url || "/placeholder.svg"}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">
                    {formatPrice(item.price_at_time * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {order.shipping_address && (
            <div>
              <h3 className="font-semibold mb-4">Shipping Address</h3>
              <div className="text-sm text-gray-600">
                <p>{order.shipping_address.full_name}</p>
                <p>{order.shipping_address.address_line1}</p>
                {order.shipping_address.address_line2 && (
                  <p>{order.shipping_address.address_line2}</p>
                )}
                <p>
                  {order.shipping_address.city}, {order.shipping_address.state}{" "}
                  {order.shipping_address.postal_code}
                </p>
                <p>{order.shipping_address.country}</p>
              </div>
            </div>
          )}

          {order.tracking_number && (
            <>
              <Separator />
              <div>
                <h3 className="font-semibold mb-4">Tracking Information</h3>
                <OrderTracking orderId={order.id} />
              </div>
            </>
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