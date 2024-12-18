import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Product, ProductStatus } from "@/types/product";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface ProductTableProps {
  selectedProducts: string[];
  setSelectedProducts: (products: string[]) => void;
  onEdit: (product: Product) => void;
}

export const ProductTable = ({
  selectedProducts,
  setSelectedProducts,
  onEdit,
}: ProductTableProps) => {
  const { data: products, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching products:", error);
        throw error;
      }

      const transformedProducts: Product[] = data.map(product => ({
        ...product,
        status: product.status as ProductStatus,
        images: product.image_url ? [{ url: product.image_url, alt: product.name }] : [],
      }));

      return transformedProducts;
    },
  });

  const handleDelete = async (productId: string) => {
    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", productId);

      if (error) throw error;

      toast.success("Product deleted successfully");
      refetch();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-500";
      case "draft":
        return "bg-yellow-500";
      case "out_of_stock":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12">
            <Checkbox
              checked={
                products?.length === selectedProducts.length &&
                selectedProducts.length > 0
              }
              onCheckedChange={(checked) => {
                if (checked && products) {
                  setSelectedProducts(products.map((p) => p.id));
                } else {
                  setSelectedProducts([]);
                }
              }}
            />
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Inventory</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products?.map((product) => (
          <TableRow key={product.id}>
            <TableCell>
              <Checkbox
                checked={selectedProducts.includes(product.id)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedProducts([...selectedProducts, product.id]);
                  } else {
                    setSelectedProducts(
                      selectedProducts.filter((id) => id !== product.id)
                    );
                  }
                }}
              />
            </TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>
              <Badge className={getStatusBadgeColor(product.status)}>
                {product.status}
              </Badge>
            </TableCell>
            <TableCell>{product.inventory_quantity}</TableCell>
            <TableCell>${product.price.toFixed(2)}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(product)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(product.id)}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};