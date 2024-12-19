import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { Product } from "@/types/product";
import { Separator } from "@/components/ui/separator";
import { ProductHeader } from "./ProductHeader";
import { PriceSection } from "./PriceSection";
import { ProductActions } from "./ProductActions";
import { SocialShare } from "./SocialShare";
import { ProductMetadata } from "./ProductMetadata";
import { RFQForm } from "@/components/rfq/RFQForm";
import { Button } from "@/components/ui/button";
import { TieredPricing } from "../TieredPricing";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo = ({ product }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  const [showRFQ, setShowRFQ] = useState(false);
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

        {product.tier_pricing && (
          <TieredPricing tiers={product.tier_pricing} basePrice={product.price} />
        )}
      </div>

      <Separator />

      <ProductActions
        quantity={quantity}
        setQuantity={setQuantity}
        maxStock={product.stock}
        onAddToCart={handleAddToCart}
        onShare={handleShare}
        minimumOrder={product.minimum_order_quantity}
      />

      {product.is_bulk_only && (
        <Dialog open={showRFQ} onOpenChange={setShowRFQ}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              Request Bulk Quote
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Request for Quotation</DialogTitle>
            </DialogHeader>
            <RFQForm
              productId={product.id}
              vendorId={product.vendor_id || ""}
              onSuccess={() => setShowRFQ(false)}
            />
          </DialogContent>
        </Dialog>
      )}

      <SocialShare onShare={handleShare} />

      <ProductMetadata product={product} />
    </div>
  );
};