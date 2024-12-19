import { Link } from "react-router-dom";
import { Heart, ShoppingCart, User } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { useCart } from "@/contexts/CartContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export const DesktopNav = () => {
  const { user, signOut } = useAuth();
  const { itemsCount } = useCart();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out");
    }
  };

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

      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center space-x-2 hover:text-black/80">
          <User className="h-6 w-6" />
          <span>{user ? 'Account' : 'Sign In'}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {user ? (
            <>
              <DropdownMenuItem asChild>
                <Link to="/account" className="w-full">My Account</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/account/orders" className="w-full">Orders</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/wishlist" className="w-full">Wishlist</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut}>
                Sign Out
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem asChild>
                <Link to="/auth" className="w-full">Sign In</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/auth?tab=sign-up" className="w-full">Register</Link>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};