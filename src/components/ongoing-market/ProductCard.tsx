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
        <CardContent className="p-1.5 md:p-2">
          <div className="relative mb-1.5 md:mb-2">
            <img
              src={product.image}
              alt={product.name}
              className="w-full aspect-[4/3] object-cover rounded-md"
              loading="lazy"
            />
            <span className="absolute top-1 md:top-1.5 right-1 md:right-1.5 bg-red-500 text-white px-1.5 py-0.5 rounded-md text-[10px] md:text-xs font-medium">
              {product.discount} OFF
            </span>
          </div>
          <h3 className="text-[11px] md:text-sm font-medium mb-1 line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-1 md:gap-1.5">
            <span className="text-xs md:text-base font-bold text-primary">
              {formatPrice(product.discountedPrice)}
            </span>
            <span className="text-[9px] md:text-xs text-gray-500 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          </div>
          <div className="mt-0.5 text-[9px] md:text-xs text-gray-600">
            MOQ: {product.moq} pieces
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};