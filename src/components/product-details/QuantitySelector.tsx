import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
}

export const QuantitySelector = ({ quantity, setQuantity }: QuantitySelectorProps) => {
  return (
    <div className="flex items-center border rounded-md">
      <button
        className="p-2 hover:bg-gray-100 transition-colors"
        onClick={() => setQuantity(Math.max(1, quantity - 1))}
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
      <button
        className="p-2 hover:bg-gray-100 transition-colors"
        onClick={() => setQuantity(Math.min(10, quantity + 1))}
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
};