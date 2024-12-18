import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, Heart, ShoppingCart, ChevronDown, LogOut } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { useCart } from "@/contexts/CartContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export const NavIcons = () => {
  const { user, signOut } = useAuth();
  const { itemsCount } = useCart();

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out successfully");
  };

  return (
    <div className="hidden md:flex items-center space-x-6">
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
            {itemsCount}
          </span>
        </Button>
      </Link>

      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-1">
              <User className="h-5 w-5" />
              <span>Account</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem asChild>
              <Link to="/account" className="w-full">My Account</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/account/orders" className="w-full">Orders</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/wishlist" className="w-full">Wishlist</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <button onClick={handleSignOut} className="w-full flex items-center">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-1">
              <User className="h-5 w-5" />
              <span>Sign In</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem asChild>
              <Link to="/auth" className="w-full">Sign In</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/auth?tab=sign-up" className="w-full">Register</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};