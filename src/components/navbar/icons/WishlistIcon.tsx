import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

interface WishlistIconProps {
  count: number;
}

export const WishlistIcon = ({ count }: WishlistIconProps) => {
  return (
    <Link to="/wishlist" className="relative text-black hover:text-black/80">
      <Heart className="h-6 w-6" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
          {count}
        </span>
      )}
    </Link>
  );
};