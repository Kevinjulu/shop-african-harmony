import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductForm } from "@/components/vendor/ProductForm";
import { ProductList } from "@/components/vendor/ProductList";

const VendorProducts = () => {
  const [activeTab, setActiveTab] = useState("list");

  const handleProductAdded = () => {
    setActiveTab("list");
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Product Management</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="list">Product List</TabsTrigger>
            <TabsTrigger value="add">Add Product</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="mt-6">
            <ProductList />
          </TabsContent>

          <TabsContent value="add" className="mt-6">
            <ProductForm onSuccess={handleProductAdded} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default VendorProducts;