import { useState } from "react";
import { Heart, Share2, ShoppingCart, Star, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { Product } from "@/types/product";
import { useCurrency } from "@/hooks/useCurrency";
import { getCountryName } from "@/utils/currency";
import { QuantitySelector } from "./QuantitySelector";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo = ({ product }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const isMobile = useIsMobile();
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`Added ${quantity} ${quantity === 1 ? 'item' : 'items'} to cart - ${formatPrice(product.price * quantity)}`);
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

  const handleWishlist = () => {
    toast.success("Added to wishlist!");
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {getCountryName(product.origin_country || 'KE')}
          </Badge>
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.name}</h1>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className="w-4 h-4 text-yellow-400 fill-yellow-400"
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">(4.8)</span>
          </div>
          <Separator orientation="vertical" className="h-4" />
          <span className="text-sm text-gray-600">
            {product.inventory_quantity} in stock
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-baseline gap-4">
          <span className="text-3xl md:text-4xl font-bold text-primary">
            {formatPrice(product.price)}
          </span>
          {quantity > 1 && (
            <span className="text-sm text-gray-500">
              Total: {formatPrice(product.price * quantity)}
            </span>
          )}
        </div>

        {product.description && (
          <div className="prose max-w-none text-gray-600">
            <p>{product.description}</p>
          </div>
        )}
      </div>

      <Separator />

      <div className={cn(
        "flex items-center gap-4",
        isMobile ? "flex-col w-full" : "flex-row"
      )}>
        <QuantitySelector 
          quantity={quantity} 
          setQuantity={setQuantity} 
          max={product.stock} 
        />
        <Button 
          onClick={handleAddToCart} 
          className={cn(
            "bg-primary hover:bg-primary/90 gap-2",
            isMobile && "w-full"
          )}
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </Button>
        <div className={cn(
          "flex gap-2",
          isMobile && "w-full"
        )}>
          <Button 
            variant="outline" 
            onClick={handleWishlist}
            className={cn("gap-2", isMobile && "flex-1")}
          >
            <Heart className="h-4 w-4" />
            {!isMobile && "Wishlist"}
          </Button>
          <Button 
            variant="outline" 
            onClick={() => handleShare('general')}
            className={cn("gap-2", isMobile && "flex-1")}
          >
            <Share2 className="h-4 w-4" />
            {!isMobile && "Share"}
          </Button>
        </div>
      </div>

      {/* Social Sharing */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500">Share on:</span>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full p-2 hover:bg-blue-50"
            onClick={() => handleShare('facebook')}
          >
            <Facebook className="w-4 h-4 text-blue-600" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full p-2 hover:bg-sky-50"
            onClick={() => handleShare('twitter')}
          >
            <Twitter className="w-4 h-4 text-sky-500" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full p-2 hover:bg-pink-50"
            onClick={() => handleShare('instagram')}
          >
            <Instagram className="w-4 h-4 text-pink-600" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full p-2 hover:bg-blue-50"
            onClick={() => handleShare('linkedin')}
          >
            <Linkedin className="w-4 h-4 text-blue-700" />
          </Button>
        </div>
      </div>

      <div className="border rounded-lg p-6 space-y-4 bg-gray-50">
        <div className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <span className="text-gray-500">Category:</span>
            <span className="ml-2 text-gray-900 font-medium">{product.category}</span>
          </div>
          <div>
            <span className="text-gray-500">Origin:</span>
            <span className="ml-2 text-gray-900 font-medium">
              {getCountryName(product.origin_country || 'KE')}
            </span>
          </div>
          <div>
            <span className="text-gray-500">Stock:</span>
            <span className="ml-2 text-gray-900 font-medium">
              {product.stock} available
            </span>
          </div>
          <div>
            <span className="text-gray-500">SKU:</span>
            <span className="ml-2 text-gray-900 font-medium">
              {product.id.slice(0, 8).toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};