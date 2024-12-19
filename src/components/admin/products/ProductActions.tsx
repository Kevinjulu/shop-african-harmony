import { Button } from "@/components/ui/button";
import { Plus, Download, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

export interface ProductActionsProps {
  selectedProducts: string[];
  onAddProduct: () => void;
  onBulkDelete: () => Promise<void>;
}

export const ProductActions = ({ 
  selectedProducts, 
  onAddProduct,
  onBulkDelete 
}: ProductActionsProps) => {
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const handleExportCSV = () => {
    if (!products?.length) {
      toast.error("No products to export");
      return;
    }

    const headers = ["Name", "Status", "Inventory", "Price"];
    const csvContent = [
      headers.join(","),
      ...products.map((product) =>
        [
          product.name,
          product.status,
          product.inventory_quantity,
          product.price,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "products.csv";
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success("Products exported successfully");
  };

  return (
    <div className="flex items-center space-x-2">
      {selectedProducts.length > 0 && (
        <Button 
          variant="destructive" 
          onClick={onBulkDelete}
          className="flex items-center"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete Selected ({selectedProducts.length})
        </Button>
      )}
      <Button 
        variant="outline" 
        onClick={handleExportCSV}
        className="flex items-center"
      >
        <Download className="w-4 h-4 mr-2" />
        Export CSV
      </Button>
      <Button 
        onClick={onAddProduct}
        className="flex items-center bg-primary hover:bg-primary/90"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Product
      </Button>
    </div>
  );
};