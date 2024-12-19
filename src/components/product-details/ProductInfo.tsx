import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { Product } from "@/types/product";
import { Separator } from "@/components/ui/separator";
import { ProductHeader } from "./product-info/ProductHeader";
import { PriceSection } from "./product-info/PriceSection";
import { ProductActions } from "./product-info/ProductActions";
import { SocialShare } from "./product-info/SocialShare";
import { ProductMetadata } from "./product-info/ProductMetadata";

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo = ({ product }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`Added ${quantity} ${quantity === 1 ? 'item' : 'items'} to cart`);
  };

  const handleShare = async (platform: string) => {
    const url = window.location.href;
    const text = `Check out ${product.name}`;
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`,
    };

    if (shareUrls[platform as keyof typeof shareUrls]) {
      window.open(shareUrls[platform as keyof typeof shareUrls], '_blank');
    } else {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (err) {
        toast.error("Sharing failed. Try copying the URL manually.");
      }
    }
  };

  return (
    <div className="space-y-8">
      <ProductHeader product={product} />

      <div className="space-y-4">
        <PriceSection price={product.price} quantity={quantity} />

        {product.description && (
          <div className="prose max-w-none text-gray-600">
            <p>{product.description}</p>
          </div>
        )}
      </div>

      <Separator />

      <ProductActions
        quantity={quantity}
        setQuantity={setQuantity}
        maxStock={product.stock}
        onAddToCart={handleAddToCart}
        onShare={handleShare}
      />

      <SocialShare onShare={handleShare} />

      <ProductMetadata product={product} />
    </div>
  );
};