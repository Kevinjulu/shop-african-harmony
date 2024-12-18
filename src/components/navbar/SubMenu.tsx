import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown, ArrowRight } from "lucide-react";
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
    { label: "New Arrivals", path: "/new-arrivals" },
    { label: "Best Sellers", path: "/best-sellers" },
    { label: "On Sale", path: "/on-sale" },
    { label: "Traditional", path: "/traditional" },
    { label: "All Stores", path: "/stores" },
  ];

  return (
    <div className="w-full border-t border-black/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-10">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="h-10 px-4 gap-2 hover:bg-black/10 hover:text-black font-medium"
              >
                <span>Browse Categories</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              className="w-64 bg-white/95 backdrop-blur-sm border border-gray-200 shadow-lg" 
              align="start"
              sideOffset={0}
            >
              <DropdownMenuGroup>
                {categories.map((category) => (
                  <DropdownMenuItem key={category.name} asChild>
                    <Link
                      to={category.path}
                      className="flex items-center justify-between w-full py-2.5 px-4 text-gray-700 hover:bg-primary/10 hover:text-primary transition-colors rounded-md"
                    >
                      <span className="font-medium">{category.name}</span>
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
                    className="text-sm hover:text-black/70 transition-colors font-medium"
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