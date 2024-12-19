import { Badge } from "@/components/ui/badge";
import { getCountryName } from "@/utils/currency";
import { Star } from "lucide-react";
import { Product } from "@/types/product";

interface ProductHeaderProps {
  product: Product;
}

export const ProductHeader = ({ product }: ProductHeaderProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="text-xs">
          {product.category}
        </Badge>
        <Badge variant="outline" className="text-xs">
          {getCountryName(product.origin_country || 'KE')}
        </Badge>
      </div>
      
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.name}</h1>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className="w-4 h-4 text-yellow-400 fill-yellow-400"
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">(4.8)</span>
        </div>
        <span className="text-sm text-gray-600">
          {product.inventory_quantity} in stock
        </span>
      </div>
    </div>
  );
};