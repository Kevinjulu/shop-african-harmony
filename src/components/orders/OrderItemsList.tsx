import { OrderDetails } from "@/hooks/useOrders";
import { useCurrency } from "@/hooks/useCurrency";

interface OrderItemsListProps {
  items: OrderDetails['items'];
}

export const OrderItemsList = ({ items }: OrderItemsListProps) => {
  const { formatPrice } = useCurrency();

  return (
    <div className="space-y-4">
      {items.map((item) => (
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
  );
};