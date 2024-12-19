import { useState } from "react";
import { ProductTable } from "./ProductTable";
import { ProductActions } from "./ProductActions";
import { ProductFormDialog } from "./ProductFormDialog";
import { Product } from "@/types/product";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ProductManager = () => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          product_images (
            id,
            image_url,
            is_primary,
            display_order
          ),
          vendor:vendor_profiles (
            id,
            business_name,
            logo_url
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProducts(data as Product[]);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccess = () => {
    setShowForm(false);
    setSelectedProduct(null);
    fetchProducts();
  };

  const handleDelete = async (productId: string) => {
    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", productId);

      if (error) throw error;
      fetchProducts();
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };

  const handleBulkDelete = async () => {
    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .in("id", selectedProducts);

      if (error) throw error;
      setSelectedProducts([]);
      fetchProducts();
      toast.success("Products deleted successfully");
    } catch (error) {
      console.error("Error deleting products:", error);
      toast.error("Failed to delete products");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Products</h2>
        <ProductActions 
          selectedProducts={selectedProducts}
          onAddProduct={() => setShowForm(true)}
          onBulkDelete={handleBulkDelete}
        />
      </div>

      <ProductTable
        products={products}
        isLoading={isLoading}
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
        onEdit={(product) => {
          setSelectedProduct(product);
          setShowForm(true);
        }}
        onDelete={handleDelete}
      />

      <ProductFormDialog
        open={showForm}
        onOpenChange={setShowForm}
        product={selectedProduct}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default ProductManager;