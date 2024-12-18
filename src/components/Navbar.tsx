import { ShoppingCart, Search, Menu, Heart, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/components/AuthProvider";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate();
  const { itemsCount } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      console.log("Search query:", searchQuery);
    }
  };

  const mobileMenuItems = [
    { title: "Home", path: "/" },
    { title: "Shop", path: "/products" },
    { title: "About Us", path: "/about" },
    { title: "Contact", path: "/contact" },
    { title: "FAQ", path: "/faq" },
    { title: "Stores", path: "/stores" },
    { title: "Shipping Policy", path: "/shipping-policy" },
    { title: "Returns Policy", path: "/returns-policy" },
    { title: "Careers", path: "/careers" },
    { title: "Affiliate", path: "/affiliate" },
    { title: "Terms", path: "/terms" },
  ];

  return (
    <nav className={`relative z-50 transition-all duration-300 ${isSticky ? 'fixed top-0 left-0 right-0 shadow-md' : ''}`}>
      {/* Main Navigation */}
      <div className="bg-[#FDB813]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img 
                src="/lovable-uploads/dfdf98ce-6665-4af0-aa1d-71c82f1fe485.png" 
                alt="Shop African Brands" 
                className="h-12 w-auto"
              />
            </Link>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-3xl mx-8">
              <div className="flex w-full">
                <select 
                  className="h-full py-2 pl-4 pr-8 bg-white border-r rounded-l-md focus:outline-none text-sm"
                  defaultValue="all"
                >
                  <option value="all">All</option>
                  <option value="products">Products</option>
                  <option value="vendors">Vendors</option>
                </select>
                <form onSubmit={handleSearch} className="flex-1 flex">
                  <Input
                    type="text"
                    placeholder="I'm shopping for..."
                    className="w-full rounded-none border-0 focus-visible:ring-0"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button 
                    type="submit" 
                    className="rounded-l-none bg-black hover:bg-black/90 text-white"
                  >
                    Search
                  </Button>
                </form>
              </div>
            </div>

            {/* Right Navigation */}
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

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <form onSubmit={handleSearch} className="mb-4">
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            <div className="space-y-2 divide-y">
              {mobileMenuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="block py-3 text-gray-600 hover:text-[#FDB813] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
              <div className="pt-3">
                <Link to={user ? "/account" : "/auth"} className="block py-2 text-gray-600 hover:text-[#FDB813]">
                  {user ? "My Account" : "Sign In"}
                </Link>
                <Link to="/wishlist" className="block py-2 text-gray-600 hover:text-[#FDB813]">
                  Wishlist (0)
                </Link>
                <Link to="/cart" className="block py-2 text-gray-600 hover:text-[#FDB813]">
                  Cart ({itemsCount})
                </Link>
                <Link to="/vendor/register" className="block py-2 text-gray-600 hover:text-[#FDB813]">
                  Sell On Shop African Brands
                </Link>
                <Link to="/track-order" className="block py-2 text-gray-600 hover:text-[#FDB813]">
                  Track Your Order
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};