import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { toast } from "sonner";
import {
  BarChart,
  Package,
  ShoppingBag,
  TrendingUp,
  Users,
  DollarSign,
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface VendorProfile {
  id: string;
  business_name: string;
  description: string;
  logo_url: string;
  status: string;
}

interface SalesData {
  date: string;
  amount: number;
}

const mockSalesData: SalesData[] = [
  { date: '2024-01', amount: 4000 },
  { date: '2024-02', amount: 3000 },
  { date: '2024-03', amount: 5000 },
  { date: '2024-04', amount: 2780 },
  { date: '2024-05', amount: 1890 },
  { date: '2024-06', amount: 6390 },
];

export const VendorDashboard = () => {
  const [vendorProfile, setVendorProfile] = useState<VendorProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVendorProfile = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('vendor_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error) throw error;

        if (data) {
          setVendorProfile(data);
        }
      } catch (error) {
        console.error('Error fetching vendor profile:', error);
        toast.error("Failed to load vendor profile");
      } finally {
        setIsLoading(false);
      }
    };

    fetchVendorProfile();
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!vendorProfile) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Become a Vendor</h1>
        <Button onClick={() => navigate("/vendor/register")}>
          Register as Vendor
        </Button>
      </div>
    );
  }

  const stats = [
    {
      title: "Total Sales",
      value: "$12,345",
      icon: DollarSign,
      change: "+12%",
    },
    {
      title: "Active Products",
      value: "45",
      icon: Package,
      change: "+3",
    },
    {
      title: "Orders",
      value: "126",
      icon: ShoppingBag,
      change: "+18%",
    },
    {
      title: "Customers",
      value: "89",
      icon: Users,
      change: "+7%",
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {vendorProfile.business_name}
            </h1>
            <p className="text-gray-500">Vendor Dashboard</p>
          </div>
          <Button onClick={() => navigate("/vendor/products/new")}>
            Add New Product
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockSalesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="amount"
                      stroke="#8884d8"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Detailed analytics content will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>Product Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Product management interface will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Order management interface will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default VendorDashboard;