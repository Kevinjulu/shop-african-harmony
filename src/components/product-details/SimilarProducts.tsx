import { Product } from "@/types/product";
import { Link } from "react-router-dom";
import { useCurrency } from "@/hooks/useCurrency";
import { useIsMobile } from "@/hooks/use-mobile";

interface SimilarProductsProps {
  products: Product[];
  currentProductId: string;
}

export const SimilarProducts = ({ products, currentProductId }: SimilarProductsProps) => {
  const { formatPrice } = useCurrency();
  const isMobile = useIsMobile();
  const similarProducts = products
    .filter((p) => p.id !== currentProductId)
    .slice(0, isMobile ? 2 : 4);

  return (
    <div className="mt-8 md:mt-16">
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Similar Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {similarProducts.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="group cursor-pointer"
          >
            <div className="aspect-square mb-2 overflow-hidden rounded-lg">
              <img
                src={product.image_url || '/placeholder.svg'}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
              {product.name}
            </h3>
            <p className="text-sm font-bold text-primary mt-1">
              {formatPrice(product.price)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};