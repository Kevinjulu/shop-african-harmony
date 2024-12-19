import { useState } from "react";
import { ProductTable } from "@/components/admin/products/ProductTable";
import { ProductActions } from "@/components/admin/products/ProductActions";
import { ProductFormDialog } from "@/components/admin/products/ProductFormDialog";
import { Product } from "@/types/product";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ProductManager = () => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  const { data: products, isLoading, refetch } = useQuery({
    queryKey: ['admin-products'],
    queryFn: async () => {
      console.log('Fetching products for admin...');
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          product_images (
            id,
            image_url,
            is_primary
          ),
          vendor:vendor_profiles (
            business_name
          ),
          category:categories (
            name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to load products');
        throw error;
      }

      return data;
    },
  });

  const handleSuccess = () => {
    setShowForm(false);
    setSelectedProduct(null);
    refetch();
    toast.success(selectedProduct ? 'Product updated successfully' : 'Product created successfully');
  };

  const handleDelete = async (productId: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) throw error;

      refetch();
      toast.success('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <ProductActions
          selectedProducts={selectedProducts}
          onAddProduct={() => {
            setSelectedProduct(null);
            setShowForm(true);
          }}
          onBulkDelete={async () => {
            try {
              const { error } = await supabase
                .from('products')
                .delete()
                .in('id', selectedProducts);

              if (error) throw error;

              setSelectedProducts([]);
              refetch();
              toast.success('Products deleted successfully');
            } catch (error) {
              console.error('Error deleting products:', error);
              toast.error('Failed to delete products');
            }
          }}
        />
      </div>

      <Card className="p-6">
        <ProductTable
          products={products || []}
          isLoading={isLoading}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
          onEdit={(product) => {
            setSelectedProduct(product);
            setShowForm(true);
          }}
          onDelete={handleDelete}
        />
      </Card>

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