import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProductManager from "@/components/admin/products/ProductManager";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { AnalyticsChart } from "@/components/admin/AnalyticsChart";
import { VendorTable } from "@/components/admin/VendorTable";
import { CategoryManager } from "@/components/admin/categories/CategoryManager";
import { ContentBlockManager } from "@/components/admin/content/blocks/ContentBlockManager";
import { BannerManager } from "@/components/admin/content/banner/BannerManager";
import { StaticPageManager } from "@/components/admin/content/static-pages/StaticPageManager";

const AdminDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <DashboardStats />
      
      <div className="mt-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 gap-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="vendors">Vendors</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Quick Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <AnalyticsChart />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Management</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="list" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="list">Product List</TabsTrigger>
                    <TabsTrigger value="categories">Categories</TabsTrigger>
                  </TabsList>
                  <TabsContent value="list">
                    <ProductManager />
                  </TabsContent>
                  <TabsContent value="categories">
                    <CategoryManager />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Management</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="pages" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="pages">Pages</TabsTrigger>
                    <TabsTrigger value="blocks">Content Blocks</TabsTrigger>
                    <TabsTrigger value="banners">Banners</TabsTrigger>
                  </TabsList>
                  <TabsContent value="pages">
                    <StaticPageManager />
                  </TabsContent>
                  <TabsContent value="blocks">
                    <ContentBlockManager />
                  </TabsContent>
                  <TabsContent value="banners">
                    <BannerManager />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="vendors">
            <Card>
              <CardHeader>
                <CardTitle>Vendor Management</CardTitle>
              </CardHeader>
              <CardContent>
                <VendorTable />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <AnalyticsChart />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;