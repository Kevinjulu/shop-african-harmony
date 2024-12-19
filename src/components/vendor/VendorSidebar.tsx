import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  UserCircle,
  DollarSign,
  Settings,
} from "lucide-react";

export const VendorSidebar = () => {
  const menuItems = [
    { to: "/vendor", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/vendor/products", icon: Package, label: "Products" },
    { to: "/vendor/profile", icon: UserCircle, label: "Profile" },
    { to: "/vendor/payouts", icon: DollarSign, label: "Payouts" },
    { to: "/vendor/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="w-64 min-h-screen bg-white border-r">
      <div className="p-6">
        <h1 className="text-xl font-bold">Vendor Dashboard</h1>
      </div>
      <nav className="px-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/vendor"}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-gray-600 hover:bg-gray-100"
              }`
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