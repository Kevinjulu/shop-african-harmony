import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Settings,
  FileText,
  Bell,
  Image,
  Store,
  Users,
  Navigation,
  MessageSquare,
  FileQuestion,
} from "lucide-react";

interface AdminSidebarProps {
  onNavigate?: () => void;
}

export const AdminSidebar = ({ onNavigate }: AdminSidebarProps) => {
  const menuItems = [
    { to: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/admin/content", icon: FileText, label: "Content" },
    { to: "/admin/products", icon: Package, label: "Products" },
    { to: "/admin/customers", icon: Users, label: "Customers" },
    { to: "/admin/vendors", icon: Store, label: "Vendors" },
    { to: "/admin/banners", icon: Image, label: "Banners" },
    { to: "/admin/navigation", icon: Navigation, label: "Navigation" },
    { to: "/admin/announcements", icon: Bell, label: "Announcements" },
    { to: "/admin/faqs", icon: FileQuestion, label: "FAQs" },
    { to: "/admin/pages", icon: FileText, label: "Pages" },
    { to: "/admin/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="h-full px-3 py-4 bg-white border-r">
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
              `flex items-center space-x-3 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-gray-900 hover:bg-gray-100"
              }`
            }
            onClick={onNavigate}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};