import { Button } from "@/components/ui/button";
import { Heart, Share2, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { QuantitySelector } from "../QuantitySelector";
import { toast } from "sonner";

interface ProductActionsProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
  maxStock: number;
  onAddToCart: () => void;
  onShare: (platform: string) => void;
}

export const ProductActions = ({
  quantity,
  setQuantity,
  maxStock,
  onAddToCart,
  onShare,
}: ProductActionsProps) => {
  const isMobile = useIsMobile();

  const handleWishlist = () => {
    toast.success("Added to wishlist!");
  };

  return (
    <div className={cn(
      "flex items-center gap-4",
      isMobile ? "flex-col w-full" : "flex-row"
    )}>
      <QuantitySelector 
        quantity={quantity} 
        setQuantity={setQuantity} 
        max={maxStock} 
      />
      <Button 
        onClick={onAddToCart} 
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
          onClick={() => onShare('general')}
          className={cn("gap-2", isMobile && "flex-1")}
        >
          <Share2 className="h-4 w-4" />
          {!isMobile && "Share"}
        </Button>
      </div>
    </div>
  );
};