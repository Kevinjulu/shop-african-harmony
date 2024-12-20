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

export const CategoryDropdown = () => {
  return (
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
        className="w-64 bg-white border border-gray-200 shadow-lg" 
        align="start"
        sideOffset={0}
      >
        <DropdownMenuGroup>
          {categories.map((category) => (
            <DropdownMenuItem key={category.name} asChild>
              <Link
                to={`/products?category=${encodeURIComponent(category.name)}`}
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
  );
};