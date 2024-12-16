import { Navbar } from "@/components/Navbar";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { AnalyticsChart } from "@/components/admin/AnalyticsChart";
import { VendorTable } from "@/components/admin/VendorTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>

        <div className="space-y-6">
          <DashboardStats />
          
          <div className="grid gap-6 md:grid-cols-4">
            <AnalyticsChart />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Vendors</CardTitle>
            </CardHeader>
            <CardContent>
              <VendorTable />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;