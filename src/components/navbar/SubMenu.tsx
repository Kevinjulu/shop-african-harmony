import { Link } from "react-router-dom";
import { CategoryDropdown } from "./submenu/CategoryDropdown";
import { CountrySelector } from "./submenu/CountrySelector";

export const SubMenu = () => {
  const menuItems = [
    { label: "New Arrivals", path: "/new-arrivals" },
    { label: "Best Sellers", path: "/best-sellers" },
    { label: "On Sale", path: "/on-sale" },
    { label: "Traditional", path: "/traditional" },
    { label: "All Stores", path: "/stores" },
  ];

  return (
    <div className="border-t border-black/10">
      <div className="flex items-center h-10">
        <CategoryDropdown />
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
              <CountrySelector />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};