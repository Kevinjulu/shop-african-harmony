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
  const menuItems = [
    { label: "New Arrivals", path: "/products?collection=new" },
    { label: "Best Sellers", path: "/products?collection=best-sellers" },
    { label: "On Sale", path: "/products?collection=sale" },
    { label: "Traditional", path: "/products?category=traditional" },
    { label: "Featured Stores", path: "/stores" },
  ];

  return (
    <div className="bg-mart-orange">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-12">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="h-12 px-6 gap-2 bg-black/10 text-white hover:bg-black/20 hover:text-white font-medium"
              >
                <span>Browse Categories</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64" align="start">
              <DropdownMenuGroup>
                {categories.map((category) => (
                  <DropdownMenuItem key={category.name} asChild>
                    <Link
                      to={category.path}
                      className="flex items-center justify-between w-full py-2 hover:bg-muted"
                    >
                      <span>{category.name}</span>
                      <ArrowRight className="w-4 h-4 opacity-50" />
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <nav className="ml-8">
            <ul className="flex items-center space-x-8">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <Link 
                    to={item.path} 
                    className="text-sm text-white hover:text-white/80 transition-colors font-medium"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};