import { Link } from "react-router-dom";
import { Heart, ShoppingCart, User } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { useCart } from "@/contexts/CartContext";

export const DesktopNav = () => {
  const { user } = useAuth();
  const { itemsCount } = useCart();

  return (
    <div className="hidden md:flex items-center space-x-6">
      <Link to="/wishlist" className="relative text-black hover:text-black/80">
        <Heart className="h-6 w-6" />
        <span className="absolute -top-1 -right-1 bg-white text-black text-xs rounded-full h-4 w-4 flex items-center justify-center">
          0
        </span>
      </Link>
      <Link to="/cart" className="relative text-black hover:text-black/80">
        <ShoppingCart className="h-6 w-6" />
        <span className="absolute -top-1 -right-1 bg-white text-black text-xs rounded-full h-4 w-4 flex items-center justify-center">
          {itemsCount}
        </span>
      </Link>
      <div className="flex items-center space-x-1">
        <User className="h-6 w-6 text-black" />
        {user ? (
          <Link to="/account" className="text-black hover:text-black/80">
            My Account
          </Link>
        ) : (
          <div className="flex flex-col">
            <Link to="/auth" className="text-black hover:text-black/80 text-sm">
              Log in
            </Link>
            <Link to="/auth" className="text-black hover:text-black/80 text-sm">
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};