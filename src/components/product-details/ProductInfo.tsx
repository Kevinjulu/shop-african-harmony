import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Heart, Share2, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { QuantitySelector } from "./QuantitySelector";

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo = ({ product }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    toast.success(`Added ${quantity} ${product.name}(s) to cart`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <span className="ml-1 text-sm font-medium">4.8</span>
            <span className="ml-1 text-sm text-gray-500">(120 reviews)</span>
          </div>
          <span className="text-sm text-gray-500">• In stock</span>
        </div>
        <p className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</p>
      </div>

      <div className="space-y-4">
        <p className="text-gray-600">{product.description}</p>
        
        <div className="flex items-center gap-4">
          <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
          <Button className="flex-1" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </div>

        <div className="flex gap-4">
          <Button variant="outline" className="flex-1">
            <Heart className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button variant="outline" className="flex-1">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>
    </div>
  );
};