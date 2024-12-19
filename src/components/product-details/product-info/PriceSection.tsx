import { useCurrency } from "@/hooks/useCurrency";

interface PriceSectionProps {
  price: number;
  quantity: number;
  origin_country?: string;
}

export const PriceSection = ({ price, quantity, origin_country }: PriceSectionProps) => {
  const { formatPrice } = useCurrency();
  
  return (
    <div className="flex items-baseline gap-4">
      <span className="text-3xl md:text-4xl font-bold text-primary">
        {formatPrice(price, origin_country)}
      </span>
      {quantity > 1 && (
        <span className="text-sm text-gray-500">
          Total: {formatPrice(price * quantity, origin_country)}
        </span>
      )}
    </div>
  );
};