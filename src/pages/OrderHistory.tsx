import { useOrders } from "@/hooks/useOrders";
import { OrderItem } from "@/components/orders/OrderItem";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import { OrderHistoryHeader } from "@/components/orders/OrderHistoryHeader";
import { EmptyOrderHistory } from "@/components/orders/EmptyOrderHistory";

const OrderHistory = () => {
  const { orders, isLoading, error } = useOrders();
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user) {
    navigate("/auth");
    return null;
  }

  if (isLoading) {
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

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-500 mb-4">Failed to load orders</p>
        <Button onClick={() => navigate("/")}>Return Home</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <OrderHistoryHeader />

        {!orders?.length ? (
          <EmptyOrderHistory />
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <OrderItem key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;