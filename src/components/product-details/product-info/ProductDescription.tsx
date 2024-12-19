import { TieredPricing } from "../TieredPricing";
import { Product } from "@/types/product";

interface ProductDescriptionProps {
  product: Product;
}

export const ProductDescription = ({ product }: ProductDescriptionProps) => {
  return (
    <div className="space-y-4">
      {product.description && (
        <div className="prose max-w-none text-gray-600">
          <p>{product.description}</p>
        </div>
      )}

      {product.tier_pricing && (
        <TieredPricing tiers={product.tier_pricing} basePrice={product.price} />
      )}
    </div>
  );
};