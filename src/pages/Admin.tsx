import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Database,
  User,
  ShoppingCart,
  BarChart,
  Users,
  Settings,
  Package,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: Database },
    { id: "products", label: "Products", icon: Package },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "customers", label: "Customers", icon: User },
    { id: "analytics", label: "Analytics", icon: BarChart },
    { id: "vendors", label: "Vendors", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const stats = [
    { label: "Total Sales", value: "$15,234", change: "+12.5%" },
    { label: "Active Products", value: "1,234", change: "+3.2%" },
    { label: "Total Orders", value: "856", change: "+18.7%" },
    { label: "Total Customers", value: "2,456", change: "+8.1%" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <button className="lg:hidden fixed top-4 left-4 p-2 bg-white rounded-md shadow-sm">
            <Database className="h-6 w-6" />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64">
          <SheetHeader>
            <SheetTitle>Admin Dashboard</SheetTitle>
          </SheetHeader>
          <nav className="mt-6 space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-gray-100"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Desktop Layout */}
      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 bg-white border-r min-h-screen p-6">
          <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-gray-100"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p
                      className={`text-sm ${
                        stat.change.startsWith("+")
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {stat.change} from last month
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Content based on active tab */}
            <div className="space-y-6">
              {activeTab === "overview" && (
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Recent orders and activities will appear here.</p>
                    </CardContent>
                  </Card>
                </div>
              )}
              {/* Add other tab contents here */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;