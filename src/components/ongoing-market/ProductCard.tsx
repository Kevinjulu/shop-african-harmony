import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { useCurrency } from "@/hooks/useCurrency";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    originalPrice: number;
    discountedPrice: number;
    image: string;
    discount: string;
    moq: number;
  };
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { formatPrice } = useCurrency();

  return (
    <Link to={`/product/${product.id}`}>
      <Card className="group cursor-pointer hover:shadow-lg transition-shadow h-full">
        <CardContent className="p-2 md:p-3">
          <div className="relative mb-2 md:mb-3">
            <img
              src={product.image}
              alt={product.name}
              className="w-full aspect-square object-cover rounded-md"
            />
            <span className="absolute top-1.5 md:top-2 right-1.5 md:right-2 bg-red-500 text-white px-1.5 md:px-2 py-0.5 md:py-1 rounded-md text-[10px] md:text-xs font-medium">
              {product.discount} OFF
            </span>
          </div>
          <h3 className="text-xs md:text-sm font-medium mb-1 md:mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-1.5 md:gap-2">
            <span className="text-sm md:text-lg font-bold text-primary">
              {formatPrice(product.discountedPrice)}
            </span>
            <span className="text-[10px] md:text-sm text-gray-500 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          </div>
          <div className="mt-1 text-[10px] md:text-xs text-gray-600">
            MOQ: {product.moq} pieces
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};