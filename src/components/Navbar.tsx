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
      console.log("Search query:", searchQuery);
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
    <nav className="relative z-50">
      {/* Top Bar */}
      <div className="bg-mart-yellow text-mart-black py-2 text-sm hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <p>Welcome to Shop African Brands Marketplace</p>
            <div className="flex items-center space-x-4">
              <Link to="/about" className="hover:text-secondary transition-colors">About Us</Link>
              <Link to="/contact" className="hover:text-secondary transition-colors">Contact</Link>
              <Link to="/help" className="hover:text-secondary transition-colors">Help & FAQs</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-white border-b">
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

            {/* Categories Dropdown and Search */}
            <div className="hidden md:flex flex-1 max-w-4xl mx-8">
              <div className="flex w-full">
                <div className="relative">
                  <select 
                    className="h-full py-2 pl-4 pr-8 bg-gray-100 border-r rounded-l-md focus:outline-none text-sm"
                    defaultValue=""
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category.path} value={category.path}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <form onSubmit={handleSearch} className="flex-1 flex">
                  <Input
                    type="text"
                    placeholder="I'm shopping for..."
                    className="w-full rounded-l-none rounded-r-none border-x-0 focus-visible:ring-0"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button 
                    type="submit" 
                    className="rounded-l-none bg-mart-black hover:bg-secondary text-white px-8"
                  >
                    Search
                  </Button>
                </form>
              </div>
            </div>

            {/* Navigation Icons */}
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/account" className="flex items-center space-x-1 text-mart-black hover:text-primary transition-colors">
                <User className="h-5 w-5" />
                <div className="text-sm">
                  <div>Log in</div>
                  <div>Register</div>
                </div>
              </Link>
              <Link to="/wishlist" className="relative text-mart-black hover:text-primary transition-colors">
                <Heart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-mart-yellow text-mart-black text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  0
                </span>
              </Link>
              <Link to="/cart" className="relative text-mart-black hover:text-primary transition-colors">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-mart-yellow text-mart-black text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  0
                </span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>

          {/* Categories Menu - Desktop */}
          <div className="hidden md:flex items-center space-x-8 py-4">
            <Button variant="ghost" className="flex items-center space-x-2 text-mart-black hover:text-primary">
              <Menu className="h-5 w-5" />
              <span>Shop By Department</span>
            </Button>
            {categories.slice(0, 5).map((category) => (
              <Link 
                key={category.name}
                to={category.path}
                className="text-sm font-medium text-mart-black hover:text-primary whitespace-nowrap transition-colors"
              >
                {category.name}
              </Link>
            ))}
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
                placeholder="Search for African products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            <div className="space-y-2">
              <Link to="/account" className="block py-2 text-mart-black hover:text-primary">Account</Link>
              <Link to="/wishlist" className="block py-2 text-mart-black hover:text-primary">Wishlist (0)</Link>
              <Link to="/cart" className="block py-2 text-mart-black hover:text-primary">Cart (0)</Link>
              <div className="border-t pt-2 mt-2">
                {categories.map((category) => (
                  <Link 
                    key={category.name}
                    to={category.path}
                    className="block py-2 text-sm text-mart-black hover:text-primary"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};