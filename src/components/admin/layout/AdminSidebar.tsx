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
  Layout,
  FileCode,
  File,
  Store as StoreIcon
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
    {
      to: "/admin/content",
      icon: FileText,
      label: "Content",
      submenu: [
        { to: "/admin/content/banners", icon: Layout, label: "Banners" },
        { to: "/admin/content/blocks", icon: FileCode, label: "Content Blocks" },
        { to: "/admin/content/pages", icon: File, label: "Static Pages" },
      ]
    },
    { to: "/admin/marketplaces", icon: StoreIcon, label: "Marketplaces" },
    { to: "/admin/analytics", icon: BarChart2, label: "Analytics" },
    { to: "/admin/settings", icon: Settings, label: "Settings" },
  ];

  const isSubmenuActive = (submenu: any[]) => {
    return submenu.some(item => location.pathname.startsWith(item.to));
  };

  return (
    <div className="h-full w-64 bg-white border-r">
      <div className="p-6">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>
      <nav className="px-4 space-y-2">
        {menuItems.map((item) => (
          <div key={item.to}>
            <NavLink
              to={item.submenu ? '#' : item.to}
              end={item.exact}
              className={({ isActive }) =>
                cn(
                  "flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors",
                  (isActive || (item.submenu && isSubmenuActive(item.submenu)))
                    ? "bg-primary text-primary-foreground"
                    : "text-gray-600 hover:bg-gray-100"
                )
              }
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>

            {item.submenu && (
              <div className="ml-6 mt-2 space-y-1">
                {item.submenu.map((subItem) => (
                  <NavLink
                    key={subItem.to}
                    to={subItem.to}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors text-sm",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-gray-600 hover:bg-gray-100"
                      )
                    }
                  >
                    <subItem.icon className="w-4 h-4" />
                    <span>{subItem.label}</span>
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};