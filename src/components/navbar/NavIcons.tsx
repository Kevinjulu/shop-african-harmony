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
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const NavIcons = () => {
  const { user, signOut } = useAuth();
  const { itemsCount } = useCart();
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const fetchWishlistCount = async () => {
      if (!user) {
        setWishlistCount(0);
        return;
      }

      try {
        const { count, error } = await supabase
          .from('wishlists')
          .select('*', { count: 'exact' })
          .eq('user_id', user.id);

        if (error) throw error;
        setWishlistCount(count || 0);
      } catch (error) {
        console.error('Error fetching wishlist count:', error);
        toast.error("Failed to fetch wishlist count");
      }
    };

    fetchWishlistCount();

    // Subscribe to wishlist changes
    const channel = supabase
      .channel('wishlist_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'wishlists',
          filter: `user_id=eq.${user?.id}`,
        },
        () => {
          fetchWishlistCount();
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [user]);

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
        {wishlistCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {wishlistCount}
          </span>
        )}
      </Link>
      <Link to="/cart" className="relative text-black hover:text-black/80">
        <ShoppingCart className="h-6 w-6" />
        {itemsCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {itemsCount}
          </span>
        )}
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center space-x-2 hover:text-black/80 focus:outline-none">
          <User className="h-6 w-6" />
          <span>{user ? 'Account' : 'Sign In'}</span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className="w-56 bg-white border border-gray-200 shadow-lg rounded-md p-1"
        >
          {user ? (
            <>
              <DropdownMenuItem asChild>
                <Link 
                  to="/account" 
                  className="w-full flex items-center px-3 py-2 text-sm rounded-sm hover:bg-gray-100 cursor-pointer"
                >
                  My Account
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link 
                  to="/account/orders" 
                  className="w-full flex items-center px-3 py-2 text-sm rounded-sm hover:bg-gray-100 cursor-pointer"
                >
                  Orders
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link 
                  to="/wishlist" 
                  className="w-full flex items-center px-3 py-2 text-sm rounded-sm hover:bg-gray-100 cursor-pointer"
                >
                  Wishlist
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={handleSignOut}
                className="w-full flex items-center px-3 py-2 text-sm rounded-sm hover:bg-gray-100 cursor-pointer text-red-600 hover:text-red-700"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem asChild>
                <Link 
                  to="/auth" 
                  className="w-full flex items-center px-3 py-2 text-sm rounded-sm hover:bg-gray-100 cursor-pointer"
                >
                  Sign In
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link 
                  to="/auth?tab=sign-up" 
                  className="w-full flex items-center px-3 py-2 text-sm rounded-sm hover:bg-gray-100 cursor-pointer"
                >
                  Register
                </Link>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};