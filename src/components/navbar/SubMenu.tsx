import { Button } from "@/components/ui/button";
import { ChevronDown, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { categories } from "@/data/categories";

export const SubMenu = () => {
  return (
    <div className="hidden lg:block bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-12">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="h-12 px-4 gap-2 bg-primary text-white hover:bg-primary-dark hover:text-white"
              >
                <span>Browse Categories</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuGroup>
                {categories.map((category) => (
                  <DropdownMenuItem key={category.name} asChild>
                    <Link
                      to={`/products?category=${encodeURIComponent(category.name.toLowerCase())}`}
                      className="flex items-center justify-between w-full"
                    >
                      {category.name}
                      <ArrowRight className="w-4 h-4 opacity-50" />
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <nav className="ml-8">
            <ul className="flex items-center space-x-8">
              <li>
                <Link to="/products?collection=new" className="text-sm hover:text-primary">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/products?collection=best-sellers" className="text-sm hover:text-primary">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link to="/products?collection=trending" className="text-sm hover:text-primary">
                  Trending
                </Link>
              </li>
              <li>
                <Link to="/products?collection=deals" className="text-sm hover:text-primary">
                  Deals
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};