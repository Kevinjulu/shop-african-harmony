import { useState } from "react";
import { ProductTable } from "./ProductTable";
import { ProductActions } from "./ProductActions";
import { ProductFormDialog } from "./ProductFormDialog";
import { Product } from "@/types/product";

const ProductManager = () => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleSuccess = () => {
    setShowForm(false);
    setSelectedProduct(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Products</h2>
        <ProductActions 
          selectedProducts={selectedProducts}
          onAddProduct={() => setShowForm(true)}
        />
      </div>

      <ProductTable
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
        onEdit={(product) => {
          setSelectedProduct(product);
          setShowForm(true);
        }}
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