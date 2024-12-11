import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, Heart, ShoppingCart, ChevronDown } from "lucide-react";

export const NavIcons = () => {
  return (
    <div className="hidden md:flex items-center space-x-6">
      <Link to="/account">
        <Button variant="ghost" className="flex items-center space-x-1">
          <User className="h-5 w-5" />
          <span>Account</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </Link>
      <Link to="/wishlist">
        <Button variant="ghost" className="relative">
          <Heart className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            0
          </span>
        </Button>
      </Link>
      <Link to="/cart">
        <Button variant="ghost" className="relative">
          <ShoppingCart className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            0
          </span>
        </Button>
      </Link>
    </div>
  );
};