import { ShoppingCart, Search, Menu, Heart, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      console.log("Search query:", searchQuery); // Debug log
    }
  };

  const categories = [
    { name: "All Categories", path: "/products" },
    { name: "New Arrivals", path: "/products?category=new" },
    { name: "Best Sellers", path: "/products?category=best" },
    { name: "Special Offers", path: "/products?category=special" },
    { name: "Traditional", path: "/products?category=traditional" },
    { name: "Modern", path: "/products?category=modern" }
  ];

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-secondary text-white py-2 text-sm hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <p>Welcome to Shop African Brands Marketplace</p>
            <div className="flex items-center space-x-4">
              <Link to="/about" className="hover:text-accent transition-colors">About Us</Link>
              <Link to="/contact" className="hover:text-accent transition-colors">Contact</Link>
              <Link to="/help" className="hover:text-accent transition-colors">Help & FAQs</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img 
              src="/lovable-uploads/dfdf98ce-6665-4af0-aa1d-71c82f1fe485.png" 
              alt="Shop African Brands" 
              className="h-12 w-auto"
            />
          </Link>

          {/* Search bar - hidden on mobile */}
          <form onSubmit={handleSearch} className="hidden md:block flex-1 max-w-xl mx-8">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search for African products..."
                className="w-full pl-10 pr-4 py-2 border-primary/20 focus:border-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
          </form>

          {/* Navigation Links - hidden on mobile */}
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

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Categories Menu - Desktop */}
        <div className="hidden md:flex items-center space-x-8 py-4 overflow-x-auto">
          {categories.map((category) => (
            <Link 
              key={category.name}
              to={category.path}
              className="text-sm font-medium hover:text-primary whitespace-nowrap transition-colors"
            >
              {category.name}
            </Link>
          ))}
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <form onSubmit={handleSearch} className="mb-2">
                <Input
                  type="text"
                  placeholder="Search for African products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
              <Link to="/account">
                <Button variant="ghost" className="w-full text-left">Account</Button>
              </Link>
              <Link to="/wishlist">
                <Button variant="ghost" className="w-full text-left">Wishlist (0)</Button>
              </Link>
              <Link to="/cart">
                <Button variant="ghost" className="w-full text-left">Cart (0)</Button>
              </Link>
              <div className="pt-2 border-t">
                {categories.map((category) => (
                  <Link 
                    key={category.name}
                    to={category.path}
                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};