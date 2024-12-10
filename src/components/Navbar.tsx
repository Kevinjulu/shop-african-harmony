import { ShoppingCart, Search, Menu, Heart, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b">
      {/* Top Bar */}
      <div className="bg-secondary text-white py-2 text-sm hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <p>Welcome to Shop African Marketplace</p>
            <div className="flex items-center space-x-4">
              <Link to="/about" className="hover:text-accent">About Us</Link>
              <Link to="/contact" className="hover:text-accent">Contact</Link>
              <Link to="/help" className="hover:text-accent">Help & FAQs</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-primary">Shop African</h1>
          </Link>

          {/* Search bar - hidden on mobile */}
          <div className="hidden md:block flex-1 max-w-xl mx-8">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search for African crafts..."
                className="w-full pl-10 pr-4 py-2 border-primary/20 focus:border-primary"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
          </div>

          {/* Navigation Links - hidden on mobile */}
          <div className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" className="flex items-center space-x-1">
              <User className="h-5 w-5" />
              <span>Account</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
            <Button variant="ghost" className="relative">
              <Heart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </Button>
            <Button variant="ghost" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Categories Menu - Desktop */}
        <div className="hidden md:flex items-center space-x-8 py-4">
          {["All Categories", "New Arrivals", "Best Sellers", "Special Offers", "Traditional", "Modern"].map((item, index) => (
            <Button 
              key={index}
              variant="ghost" 
              className="text-sm font-medium hover:text-primary"
            >
              {item}
            </Button>
          ))}
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Input
                type="text"
                placeholder="Search for African crafts..."
                className="mb-2"
              />
              <Button variant="ghost" className="w-full text-left">Account</Button>
              <Button variant="ghost" className="w-full text-left">Wishlist (0)</Button>
              <Button variant="ghost" className="w-full text-left">Cart (0)</Button>
              <div className="pt-2 border-t">
                {["All Categories", "New Arrivals", "Best Sellers", "Special Offers"].map((item, index) => (
                  <Button 
                    key={index}
                    variant="ghost" 
                    className="w-full text-left"
                  >
                    {item}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};