import { Product } from "@/types/product";
import { Link } from "react-router-dom";
import { useCurrency } from "@/hooks/useCurrency";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent } from "@/components/ui/card";

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

  if (similarProducts.length === 0) {
    return null;
  }

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
            <Card className="group cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-2 md:p-3">
                <div className="aspect-square relative mb-2 overflow-hidden rounded-md">
                  <img
                    src={product.image_url || '/placeholder.svg'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-white">
                    {product.origin_country}
                  </div>
                </div>
                <h3 className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-base font-bold text-primary mt-1">
                  {formatPrice(product.price)}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};