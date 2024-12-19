import { Home, Search, ShoppingCart, Heart, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "./AuthProvider";
import { useCart } from "@/contexts/CartContext";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const MobileNav = () => {
  const location = useLocation();
  const { user } = useAuth();
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

  const items = [
    {
      icon: Home,
      label: "Home",
      href: "/",
    },
    {
      icon: Search,
      label: "Search",
      href: "/products",
    },
    {
      icon: ShoppingCart,
      label: "Cart",
      href: "/cart",
      count: itemsCount
    },
    {
      icon: Heart,
      label: "Wishlist",
      href: "/wishlist",
      count: wishlistCount
    },
    {
      icon: User,
      label: user ? "Account" : "Sign In",
      href: user ? "/account" : "/auth",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t md:hidden z-50 shadow-lg">
      <nav className="flex items-center justify-around h-16 px-2">
        {items.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full relative px-1",
                isActive ? "text-primary" : "text-gray-500"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs mt-1 whitespace-nowrap">{item.label}</span>
              {typeof item.count === 'number' && item.count > 0 && (
                <span className="absolute -top-1 right-1/4 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {item.count}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};