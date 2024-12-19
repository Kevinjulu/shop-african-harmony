import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Settings,
  FileText,
  Bell,
  Image,
  Store,
} from "lucide-react";

interface AdminSidebarProps {
  onNavigate?: () => void;
}

export const AdminSidebar = ({ onNavigate }: AdminSidebarProps) => {
  const menuItems = [
    { to: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/admin/products", icon: Package, label: "Products" },
    { to: "/admin/content", icon: FileText, label: "Content" },
    { to: "/admin/announcements", icon: Bell, label: "Announcements" },
    { to: "/admin/banners", icon: Image, label: "Banners" },
    { to: "/admin/marketplaces", icon: Store, label: "Marketplaces" },
    { to: "/admin/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="h-full px-3 py-4 bg-white">
      <div className="mb-8 px-4">
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/admin"}
            className={({ isActive }) =>
              `flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-gray-900 hover:bg-gray-100"
              }`
            }
            onClick={onNavigate}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};