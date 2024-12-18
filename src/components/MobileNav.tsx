import { Home, Search, ShoppingCart, Heart, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "./AuthProvider";
import { useCart } from "@/contexts/CartContext";

export const MobileNav = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { itemsCount } = useCart();

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
      count: 0
    },
    {
      icon: User,
      label: "My Account",
      href: user ? "/account" : "/auth",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t md:hidden z-50">
      <nav className="flex items-center justify-around h-16">
        {items.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full relative",
                isActive ? "text-primary" : "text-gray-500"
              )}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs mt-1">{item.label}</span>
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