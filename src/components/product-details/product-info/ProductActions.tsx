import { Button } from "@/components/ui/button";
import { QuantitySelector } from "../QuantitySelector";

interface ProductActionsProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
  maxStock: number;
  onAddToCart: () => void;
  onShare: (platform: string) => void;
  minimumOrder?: number;
}

export const ProductActions = ({
  quantity,
  setQuantity,
  maxStock,
  onAddToCart,
  onShare,
  minimumOrder = 1,
}: ProductActionsProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <QuantitySelector
          quantity={quantity}
          setQuantity={setQuantity}
          max={maxStock}
          min={minimumOrder}
        />
        <Button 
          onClick={onAddToCart}
          disabled={quantity < minimumOrder || quantity > maxStock}
          className="flex-1"
        >
          Add to Cart
        </Button>
      </div>
      {minimumOrder > 1 && (
        <p className="text-sm text-gray-500">
          Minimum order quantity: {minimumOrder} units
        </p>
      )}
    </div>
  );
};