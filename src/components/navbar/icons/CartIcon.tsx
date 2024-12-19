import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

interface CartIconProps {
  count: number;
}

export const CartIcon = ({ count }: CartIconProps) => {
  return (
    <Link to="/cart" className="relative text-black hover:text-black/80">
      <ShoppingCart className="h-6 w-6" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
          {count}
        </span>
      )}
    </Link>
  );
};