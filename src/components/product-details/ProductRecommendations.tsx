import { Product } from "@/types/product";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useCurrency } from "@/hooks/useCurrency";
import { Separator } from "@/components/ui/separator";

interface ProductRecommendationsProps {
  recentlyViewed: Product[];
  similarProducts: Product[];
  frequentlyBoughtTogether: Product[];
}

const ProductGrid = ({ products, title }: { products: Product[], title: string }) => {
  const { formatPrice } = useCurrency();

  if (products.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`}>
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardContent className="p-3">
                <div className="aspect-square relative mb-2 overflow-hidden rounded-md">
                  <img
                    src={product.image_url || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <h4 className="text-sm font-medium line-clamp-2 mb-1">
                  {product.name}
                </h4>
                <p className="text-primary font-bold text-sm">
                  {formatPrice(product.price, product.origin_country)}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export const ProductRecommendations = ({
  recentlyViewed,
  similarProducts,
  frequentlyBoughtTogether,
}: ProductRecommendationsProps) => {
  return (
    <div className="space-y-8">
      <ProductGrid
        products={frequentlyBoughtTogether}
        title="Frequently Bought Together"
      />
      {frequentlyBoughtTogether.length > 0 && similarProducts.length > 0 && (
        <Separator />
      )}
      <ProductGrid
        products={similarProducts}
        title="Similar Products"
      />
      {similarProducts.length > 0 && recentlyViewed.length > 0 && (
        <Separator />
      )}
      <ProductGrid
        products={recentlyViewed}
        title="Recently Viewed"
      />
    </div>
  );
};