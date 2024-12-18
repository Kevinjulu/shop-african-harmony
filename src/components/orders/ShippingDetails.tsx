import { OrderDetails } from "@/hooks/useOrders";
import { MapPin } from "lucide-react";

interface ShippingDetailsProps {
  address: NonNullable<OrderDetails['shipping_address']>;
}

export const ShippingDetails = ({ address }: ShippingDetailsProps) => {
  return (
    <div>
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <MapPin className="w-4 h-4" />
        Shipping Address
      </h3>
      <div className="text-sm text-gray-600">
        <p>{address.full_name}</p>
        <p>{address.address_line1}</p>
        {address.address_line2 && (
          <p>{address.address_line2}</p>
        )}
        <p>
          {address.city}, {address.state} {address.postal_code}
        </p>
        <p>{address.country}</p>
      </div>
    </div>
  );
};