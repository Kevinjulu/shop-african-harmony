import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown, ArrowRight, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { categories } from "@/data/categories";

const AFRICAN_COUNTRIES = [
  { code: 'KE', name: 'Kenya' },
  { code: 'NG', name: 'Nigeria' },
  { code: 'GH', name: 'Ghana' },
  { code: 'TZ', name: 'Tanzania' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'EG', name: 'Egypt' },
  { code: 'ET', name: 'Ethiopia' },
  { code: 'UG', name: 'Uganda' },
  { code: 'RW', name: 'Rwanda' },
  { code: 'SN', name: 'Senegal' }
].sort((a, b) => a.name.localeCompare(b.name));

export const SubMenu = () => {
  const menuItems = [
    { label: "New Arrivals", path: "/new-arrivals" },
    { label: "Best Sellers", path: "/best-sellers" },
    { label: "On Sale", path: "/on-sale" },
    { label: "Traditional", path: "/traditional" },
    { label: "All Stores", path: "/stores" },
  ];

  console.log("SubMenu rendering");

  return (
    <div className="border-t border-black/10">
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
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="h-8 px-3 gap-1.5 hover:bg-black/10 hover:text-black font-medium text-sm"
                  >
                    <Globe className="h-4 w-4" />
                    <span>Visit Country</span>
                    <ChevronDown className="h-3.5 w-3.5 opacity-70" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  className="w-48 bg-white border border-gray-200 shadow-lg max-h-[70vh] overflow-y-auto" 
                  align="end"
                  sideOffset={8}
                >
                  <DropdownMenuGroup>
                    {AFRICAN_COUNTRIES.map((country) => (
                      <DropdownMenuItem key={country.code} asChild>
                        <Link
                          to={`/products?country=${country.code}`}
                          className="flex items-center w-full py-2 px-3 text-sm text-gray-700 hover:bg-primary/10 hover:text-primary transition-colors"
                        >
                          <span className="font-medium">{country.name}</span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};