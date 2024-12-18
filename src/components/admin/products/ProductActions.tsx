import { Button } from "@/components/ui/button";
import { Plus, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

interface ProductActionsProps {
  selectedProducts: string[];
  onAddProduct: () => void;
}

export const ProductActions = ({ selectedProducts, onAddProduct }: ProductActionsProps) => {
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

  const handleBulkDelete = async () => {
    if (!selectedProducts.length) return;

    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .in("id", selectedProducts);

      if (error) throw error;

      toast.success("Products deleted successfully");
    } catch (error) {
      console.error("Error deleting products:", error);
      toast.error("Failed to delete products");
    }
  };

  const handleExportCSV = () => {
    if (!products?.length) return;

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
  };

  return (
    <div className="flex space-x-2">
      {selectedProducts.length > 0 && (
        <Button variant="destructive" onClick={handleBulkDelete}>
          Delete Selected ({selectedProducts.length})
        </Button>
      )}
      <Button variant="outline" onClick={handleExportCSV}>
        <Download className="w-4 h-4 mr-2" />
        Export CSV
      </Button>
      <Button onClick={onAddProduct}>
        <Plus className="w-4 h-4 mr-2" />
        Add Product
      </Button>
    </div>
  );
};