import { Product } from "@/types/product";
import { Link } from "react-router-dom";

interface SimilarProductsProps {
  products: Product[];
  currentProductId: number;
}

export const SimilarProducts = ({ products, currentProductId }: SimilarProductsProps) => {
  const similarProducts = products
    .filter((p) => p.id !== currentProductId)
    .slice(0, 4);

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {similarProducts.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="group cursor-pointer"
          >
            <div className="aspect-square mb-2 overflow-hidden rounded-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <p className="text-sm font-bold text-primary mt-1">
              ${product.price.toFixed(2)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};