import { Product } from "@/types/product";
import { ProductImages } from "./ProductImages";
import { ProductInfo } from "./ProductInfo";
import { ProductTabs } from "./ProductTabs";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";
import { useProductRecommendations } from "@/hooks/useProductRecommendations";
import { ProductRecommendations } from "./ProductRecommendations";
import { RFQFormDialog } from "../rfq/RFQFormDialog";

interface ProductDetailsContentProps {
  product: Product;
}

export const ProductDetailsContent = ({ product }: ProductDetailsContentProps) => {
  const { recentlyViewed, similarProducts, frequentlyBoughtTogether } = 
    useProductRecommendations(product.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Breadcrumb separator={<ChevronRight className="h-4 w-4" />}>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/products">Products</Breadcrumb.Item>
          <Breadcrumb.Item href={`/products?category=${product.category}`}>
            {product.category}
          </Breadcrumb.Item>
          <Breadcrumb.Item>{product.name}</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        <ProductImages 
          images={product.product_images?.map(img => ({
            url: img.image_url,
            alt: product.name
          })) || [
            { url: product.image_url || '/placeholder.svg', alt: product.name }
          ]} 
          productName={product.name} 
        />
        <div className="space-y-6">
          <ProductInfo product={product} />
          <RFQFormDialog
            productId={product.id}
            vendorId={product.vendor_id || ""}
            productName={product.name}
          />
        </div>
      </div>

      <div className="mb-12 bg-white rounded-lg shadow-sm">
        <ProductTabs product={product} />
      </div>

      <Separator className="my-12" />
      <ProductRecommendations
        recentlyViewed={recentlyViewed}
        similarProducts={similarProducts}
        frequentlyBoughtTogether={frequentlyBoughtTogether}
      />
    </div>
  );
};