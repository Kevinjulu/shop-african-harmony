import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
  max: number;
}

export const QuantitySelector = ({ quantity, setQuantity, max }: QuantitySelectorProps) => {
  return (
    <div className="flex items-center border rounded-md">
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "h-9 w-9",
          quantity <= 1 && "opacity-50 cursor-not-allowed"
        )}
        onClick={() => setQuantity(Math.max(1, quantity - 1))}
        disabled={quantity <= 1}
      >
        <Minus className="w-4 h-4" />
      </Button>
      <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "h-9 w-9",
          quantity >= max && "opacity-50 cursor-not-allowed"
        )}
        onClick={() => setQuantity(Math.min(max, quantity + 1))}
        disabled={quantity >= max}
      >
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  );
};