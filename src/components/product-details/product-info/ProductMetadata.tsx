import { Product } from "@/types/product";
import { getCountryName } from "@/utils/currency";

interface ProductMetadataProps {
  product: Product;
}

export const ProductMetadata = ({ product }: ProductMetadataProps) => {
  return (
    <div className="border rounded-lg p-6 space-y-4 bg-gray-50">
      <div className="grid grid-cols-2 gap-6 text-sm">
        <div>
          <span className="text-gray-500">Category:</span>
          <span className="ml-2 text-gray-900 font-medium">{product.category}</span>
        </div>
        <div>
          <span className="text-gray-500">Origin:</span>
          <span className="ml-2 text-gray-900 font-medium">
            {getCountryName(product.origin_country || 'KE')}
          </span>
        </div>
        <div>
          <span className="text-gray-500">Stock:</span>
          <span className="ml-2 text-gray-900 font-medium">
            {product.stock} available
          </span>
        </div>
        <div>
          <span className="text-gray-500">SKU:</span>
          <span className="ml-2 text-gray-900 font-medium">
            {product.id.slice(0, 8).toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
};