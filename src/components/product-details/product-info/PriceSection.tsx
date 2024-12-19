import { useCurrency } from "@/hooks/useCurrency";

interface PriceSectionProps {
  price: number;
  quantity: number;
}

export const PriceSection = ({ price, quantity }: PriceSectionProps) => {
  const { formatPrice } = useCurrency();
  
  return (
    <div className="flex items-baseline gap-4">
      <span className="text-3xl md:text-4xl font-bold text-primary">
        {formatPrice(price)}
      </span>
      {quantity > 1 && (
        <span className="text-sm text-gray-500">
          Total: {formatPrice(price * quantity)}
        </span>
      )}
    </div>
  );
};