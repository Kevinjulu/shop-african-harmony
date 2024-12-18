import { useState } from "react";
import { Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { Product } from "@/types/product";
import { useCurrency } from "@/hooks/useCurrency";
import { getCountryName } from "@/utils/currency";
import { QuantitySelector } from "./QuantitySelector";

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo = ({ product }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`Added ${quantity} ${quantity === 1 ? 'item' : 'items'} to cart - ${formatPrice(product.price * quantity)}`);
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } catch (err) {
      toast.error("Sharing failed. Try copying the URL manually.");
    }
  };

  const handleWishlist = () => {
    toast.success("Added to wishlist!");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
      
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-4">
          <span className="text-2xl font-bold text-primary">
            {formatPrice(product.price)}
          </span>
          {quantity > 1 && (
            <span className="text-sm text-gray-500">
              Total: {formatPrice(product.price * quantity)}
            </span>
          )}
        </div>
        <span className="text-sm text-gray-500 flex items-center gap-2">
          Product from {getCountryName(product.origin_country)}
        </span>
      </div>

      <p className="text-gray-600">{product.description}</p>

      <div className="flex items-center space-x-4">
        <QuantitySelector 
          quantity={quantity} 
          setQuantity={setQuantity} 
          max={product.stock} 
        />
        <Button onClick={handleAddToCart} className="bg-primary hover:bg-primary/90">
          Add to Cart
        </Button>
        <Button variant="outline" onClick={handleWishlist}>
          <Heart className="h-5 w-5" />
        </Button>
        <Button variant="outline" onClick={handleShare}>
          <Share2 className="h-5 w-5" />
        </Button>
      </div>

      <div className="border-t pt-6">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Category:</span>
            <span className="ml-2 text-gray-900">{product.category}</span>
          </div>
          <div>
            <span className="text-gray-500">Stock:</span>
            <span className="ml-2 text-gray-900">{product.stock} available</span>
          </div>
        </div>
      </div>
    </div>
  );
};