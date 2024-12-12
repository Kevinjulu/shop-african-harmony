import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "@/components/Navbar";
import { User, Package, Heart, Clock, Settings } from "lucide-react";

const Account = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>
        
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Wishlist
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              History
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Manage your personal information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Name</label>
                      <p className="text-lg">John Doe</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <p className="text-lg">john.doe@example.com</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Phone</label>
                      <p className="text-lg">+1 234 567 890</p>
                    </div>
                    <Button variant="outline">Edit Profile</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Your latest purchases</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Order #12345</p>
                        <p className="text-sm text-muted-foreground">2 items - $150.00</p>
                      </div>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Order #12344</p>
                        <p className="text-sm text-muted-foreground">1 item - $75.00</p>
                      </div>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Saved Addresses</CardTitle>
                  <CardDescription>Your shipping addresses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium">Home</p>
                      <p className="text-sm text-muted-foreground">
                        123 Main St, Apt 4B<br />
                        New York, NY 10001
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">Office</p>
                      <p className="text-sm text-muted-foreground">
                        456 Business Ave<br />
                        New York, NY 10002
                      </p>
                    </div>
                    <Button variant="outline">Add New Address</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>View and track your orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Placeholder for order history */}
                  <p className="text-muted-foreground">No orders found.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wishlist">
            <Card>
              <CardHeader>
                <CardTitle>My Wishlist</CardTitle>
                <CardDescription>Items you've saved for later</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Placeholder for wishlist items */}
                  <p className="text-muted-foreground">Your wishlist is empty.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Browsing History</CardTitle>
                <CardDescription>Recently viewed items</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Placeholder for browsing history */}
                  <p className="text-muted-foreground">No items in history.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Placeholder for settings */}
                  <Button variant="outline">Change Password</Button>
                  <Button variant="outline">Notification Preferences</Button>
                  <Button variant="outline">Privacy Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Account;