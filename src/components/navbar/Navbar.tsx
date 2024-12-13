import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NavTopBar } from "./NavTopBar";
import { SearchBar } from "./SearchBar";
import { NavIcons } from "./NavIcons";
import { CategoryMenu } from "./CategoryMenu";

const categories = [
  { name: "All Categories", path: "/products" },
  { name: "New Arrivals", path: "/products?category=new" },
  { name: "Best Sellers", path: "/products?category=best" },
  { name: "Special Offers", path: "/products?category=special" },
  { name: "Traditional", path: "/products?category=traditional" },
  { name: "Modern", path: "/products?category=modern" }
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <NavTopBar />
      
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex-shrink-0">
            <img 
              src="/lovable-uploads/dfdf98ce-6665-4af0-aa1d-71c82f1fe485.png" 
              alt="Shop African Brands" 
              className="h-12 w-auto"
            />
          </Link>

          <SearchBar />

          <NavIcons />

          <div className="md:hidden flex items-center">
            <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        <CategoryMenu categories={categories} />

        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <form onSubmit={handleSearch} className="mb-2">
                <Input
                  type="text"
                  placeholder="Search for African crafts..."
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
              <CategoryMenu categories={categories} isMobile />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};