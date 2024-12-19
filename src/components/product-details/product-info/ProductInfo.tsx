import { Product } from "@/types/product";
import { Separator } from "@/components/ui/separator";
import { ProductHeader } from "./ProductHeader";
import { PriceSection } from "./PriceSection";
import { ProductActions } from "./ProductActions";
import { SocialShare } from "./SocialShare";
import { ProductMetadata } from "./ProductMetadata";
import { ProductDescription } from "./ProductDescription";
import { BulkQuoteDialog } from "./BulkQuoteDialog";
import { useProductActions } from "@/hooks/useProductActions";

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo = ({ product }: ProductInfoProps) => {
  const {
    quantity,
    setQuantity,
    showRFQ,
    setShowRFQ,
    handleAddToCart,
    handleShare,
  } = useProductActions(product);

  return (
    <div className="space-y-8">
      <ProductHeader product={product} />

      <div className="space-y-4">
        <PriceSection price={product.price} quantity={quantity} />
        <ProductDescription product={product} />
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
        <BulkQuoteDialog
          showRFQ={showRFQ}
          setShowRFQ={setShowRFQ}
          productId={product.id}
          vendorId={product.vendor_id || ""}
        />
      )}

      <SocialShare onShare={handleShare} />

      <ProductMetadata product={product} />
    </div>
  );
};