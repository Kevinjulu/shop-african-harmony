import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Users,
  Settings,
  FileText,
  Image,
  ShoppingCart,
  Store,
} from "lucide-react";

interface AdminSidebarProps {
  onNavigate?: () => void;
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
  { icon: Package, label: "Products", path: "/admin/products" },
  { icon: ShoppingCart, label: "Orders", path: "/admin/orders" },
  { icon: Users, label: "Customers", path: "/admin/customers" },
  { icon: Store, label: "Vendors", path: "/admin/vendors" },
  { icon: FileText, label: "Content", path: "/admin/content" },
  { icon: Image, label: "Banners", path: "/admin/banners" },
  { icon: Settings, label: "Settings", path: "/admin/settings" },
];

export const AdminSidebar = ({ onNavigate }: AdminSidebarProps) => {
  return (
    <div className="bg-white h-full border-r">
      <div className="p-6">
        <h2 className="text-xl font-bold">Admin Panel</h2>
      </div>
      <nav className="px-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg mb-1 transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};