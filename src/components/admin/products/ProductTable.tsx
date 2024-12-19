import { useState } from "react";
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
import { Edit, Trash2, Eye } from "lucide-react";
import { Product } from "@/types/product";
import { ProductFilters } from "./ProductFilters";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";

export interface ProductTableProps {
  products: Product[];
  isLoading: boolean;
  selectedProducts: string[];
  setSelectedProducts: (products: string[]) => void;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export const ProductTable = ({
  products,
  isLoading,
  selectedProducts,
  setSelectedProducts,
  onEdit,
  onDelete,
}: ProductTableProps) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !categoryFilter || categoryFilter === "all" || product.category === categoryFilter;
    const matchesStatus = !statusFilter || statusFilter === "all" || product.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-500 hover:bg-green-600";
      case "draft":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "out_of_stock":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading products...</div>
        </div>
      </Card>
    );
  }

  return (
    <div>
      <ProductFilters
        onSearchChange={setSearchQuery}
        onCategoryChange={setCategoryFilter}
        onStatusChange={setStatusFilter}
      />

      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-12">
                <Checkbox
                  checked={products.length > 0 && selectedProducts.length === products.length}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedProducts(products.map((p) => p.id));
                    } else {
                      setSelectedProducts([]);
                    }
                  }}
                />
              </TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Inventory</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                  No products found
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product.id} className="hover:bg-gray-50">
                  <TableCell>
                    <Checkbox
                      checked={selectedProducts.includes(product.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedProducts([...selectedProducts, product.id]);
                        } else {
                          setSelectedProducts(selectedProducts.filter((id) => id !== product.id));
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-10 h-10 object-cover rounded-lg border border-gray-200"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Eye className="w-5 h-5 text-gray-400" />
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">SKU: {product.id.slice(0, 8)}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{product.category || "Uncategorized"}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeColor(product.status)}>
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className={product.inventory_quantity <= 10 ? "text-red-600 font-medium" : ""}>
                      {product.inventory_quantity}
                    </span>
                  </TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.vendor?.business_name || "N/A"}</TableCell>
                  <TableCell>
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/product/${product.id}`)}
                        className="hover:bg-gray-100"
                      >
                        <Eye className="w-4 h-4 text-gray-500" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(product)}
                        className="hover:bg-gray-100"
                      >
                        <Edit className="w-4 h-4 text-blue-500" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(product.id)}
                        className="hover:bg-gray-100"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};