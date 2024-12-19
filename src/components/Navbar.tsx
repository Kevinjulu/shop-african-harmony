import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Logo } from "./navbar/Logo";
import { SearchBar } from "./navbar/SearchBar";
import { DesktopNav } from "./navbar/DesktopNav";
import { MobileMenuButton } from "./navbar/MobileMenuButton";
import { MobileMenu } from "./navbar/MobileMenu";
import { useIsMobile } from "@/hooks/use-mobile";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  return (
    <nav className="relative">
      <div className="container mx-auto px-3 md:px-4">
        <div className="flex items-center justify-between h-14 relative">
          <div className="absolute left-0 top-0 bottom-0 flex items-center">
            <MobileMenuButton 
              isOpen={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          </div>
          <Logo />
          <SearchBar 
            searchQuery={searchQuery}
            onSearchChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            onSearchSubmit={handleSearch}
          />
          <DesktopNav />
        </div>
      </div>

      <MobileMenu 
        isOpen={isMenuOpen}
        searchQuery={searchQuery}
        onSearchChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
        onSearchSubmit={handleSearch}
        onClose={() => setIsMenuOpen(false)}
      />
    </nav>
  );
};