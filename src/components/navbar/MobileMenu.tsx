import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface MobileMenuProps {
  isOpen: boolean;
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

export const MobileMenu = ({ 
  isOpen, 
  searchQuery, 
  onSearchChange, 
  onSearchSubmit,
  onClose 
}: MobileMenuProps) => {
  if (!isOpen) return null;

  const mobileMenuItems = [
    { title: "Home", path: "/" },
    { title: "Shop", path: "/products" },
    { title: "Stores", path: "/stores" },
    { title: "About Us", path: "/about" },
    { title: "Contact", path: "/contact" },
    { title: "FAQ", path: "/faq" },
  ];

  const secondaryMenuItems = [
    { title: "Shipping Policy", path: "/shipping-policy" },
    { title: "Returns Policy", path: "/returns-policy" },
    { title: "Careers", path: "/careers" },
    { title: "Affiliate", path: "/affiliate" },
    { title: "Terms", path: "/terms" },
  ];

  console.log("Mobile menu rendering, isOpen:", isOpen);

  return (
    <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="p-4 border-b bg-gray-50/50">
        <form onSubmit={onSearchSubmit} className="flex gap-2">
          <Input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={onSearchChange}
            className="flex-1 border-gray-200 focus:border-[#FDB813] transition-colors"
          />
          <Button 
            type="submit" 
            className="bg-[#FDB813] hover:bg-[#FDB813]/90 text-black shadow-sm"
          >
            <Search className="h-5 w-5" />
          </Button>
        </form>
      </div>

      <div className="divide-y divide-gray-100">
        <div className="py-2 bg-white">
          {mobileMenuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#FDB813] transition-colors"
              onClick={() => {
                console.log("Mobile menu item clicked:", item.title);
                onClose();
              }}
            >
              {item.title}
            </Link>
          ))}
        </div>

        <div className="py-2 bg-gray-50">
          {secondaryMenuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center px-4 py-2.5 text-sm text-gray-600 hover:text-[#FDB813] hover:bg-gray-100/50 transition-colors"
              onClick={() => {
                console.log("Secondary menu item clicked:", item.title);
                onClose();
              }}
            >
              {item.title}
            </Link>
          ))}
        </div>

        <div className="py-2 bg-[#FDB813]/5">
          <Link
            to="/vendor/register"
            className="flex items-center px-4 py-3 text-gray-700 hover:bg-[#FDB813]/10 transition-colors"
            onClick={onClose}
          >
            Sell On Shop African Brands
          </Link>
          <Link
            to="/track-order"
            className="flex items-center px-4 py-3 text-gray-700 hover:bg-[#FDB813]/10 transition-colors"
            onClick={onClose}
          >
            Track Your Order
          </Link>
        </div>
      </div>
    </div>
  );
};