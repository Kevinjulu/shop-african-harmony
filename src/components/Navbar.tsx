import { ShoppingCart, Search, Menu, Heart, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/components/AuthProvider";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { itemsCount } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setIsMenuOpen(false);
    }
  };

  const mobileMenuItems = [
    { title: "Home", path: "/" },
    { title: "Shop", path: "/products" },
    { title: "About Us", path: "/about" },
    { title: "Contact", path: "/contact" },
    { title: "FAQ", path: "/faq" },
    { title: "Stores", path: "/stores" },
  ];

  const secondaryMenuItems = [
    { title: "Shipping Policy", path: "/shipping-policy" },
    { title: "Returns Policy", path: "/returns-policy" },
    { title: "Careers", path: "/careers" },
    { title: "Affiliate", path: "/affiliate" },
    { title: "Terms", path: "/terms" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isSticky ? 'shadow-md' : ''}`}>
      <div className="bg-[#FDB813]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0" onClick={() => setIsMenuOpen(false)}>
              <img 
                src="/lovable-uploads/dfdf98ce-6665-4af0-aa1d-71c82f1fe485.png" 
                alt="Shop African Brands" 
                className="h-12 w-auto"
              />
            </Link>

            {/* Search Bar - Desktop */}
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

            {/* Desktop Navigation Icons */}
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
              <Button 
                variant="ghost" 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2"
              >
                <Menu className="h-6 w-6 text-black" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search and Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto">
          {/* Mobile Search */}
          <div className="p-4 border-b">
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" className="bg-[#FDB813] hover:bg-[#FDB813]/90 text-black">
                <Search className="h-5 w-5" />
              </Button>
            </form>
          </div>

          {/* Mobile Menu Items */}
          <div className="divide-y">
            {/* Primary Navigation */}
            <div className="py-2">
              {mobileMenuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#FDB813]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
            </div>

            {/* User Section */}
            <div className="py-2">
              {user ? (
                <Link
                  to="/account"
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#FDB813]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-5 w-5 mr-3" />
                  My Account
                </Link>
              ) : (
                <Link
                  to="/auth"
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#FDB813]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-5 w-5 mr-3" />
                  Sign In / Register
                </Link>
              )}
            </div>

            {/* Secondary Navigation */}
            <div className="py-2 bg-gray-50">
              {secondaryMenuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center px-4 py-2 text-sm text-gray-600 hover:text-[#FDB813]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
            </div>

            {/* Additional Links */}
            <div className="py-2">
              <Link
                to="/vendor/register"
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#FDB813]"
                onClick={() => setIsMenuOpen(false)}
              >
                Sell On Shop African Brands
              </Link>
              <Link
                to="/track-order"
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#FDB813]"
                onClick={() => setIsMenuOpen(false)}
              >
                Track Your Order
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};