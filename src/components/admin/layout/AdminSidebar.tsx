import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  FileText,
  Settings,
  BarChart2,
  Store,
  FolderTree,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const AdminSidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { to: "/admin", icon: LayoutDashboard, label: "Dashboard", exact: true },
    { to: "/admin/products", icon: Package, label: "Products" },
    { to: "/admin/categories", icon: FolderTree, label: "Categories" },
    { to: "/admin/vendors", icon: Store, label: "Vendors" },
    { to: "/admin/orders", icon: ShoppingCart, label: "Orders" },
    { to: "/admin/customers", icon: Users, label: "Customers" },
    { to: "/admin/content", icon: FileText, label: "Content" },
    { to: "/admin/analytics", icon: BarChart2, label: "Analytics" },
    { to: "/admin/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="h-full w-64 bg-white border-r">
      <div className="p-6">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>
      <nav className="px-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.exact}
            className={({ isActive }) =>
              cn(
                "flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-gray-600 hover:bg-gray-100"
              )
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};