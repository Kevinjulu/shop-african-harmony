import { Product, ProductStatus } from "@/types/product";
import { ProductImages } from "./ProductImages";
import { ProductInfo } from "./ProductInfo";
import { ProductTabs } from "./ProductTabs";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";
import { useProductRecommendations } from "@/hooks/useProductRecommendations";
import { ProductRecommendations } from "./ProductRecommendations";

interface ProductDetailsContentProps {
  product: Product;
}

export const ProductDetailsContent = ({ product }: ProductDetailsContentProps) => {
  const { recentlyViewed, similarProducts, frequentlyBoughtTogether } = 
    useProductRecommendations(product.id);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
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

      {/* Product Details */}
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
        <ProductInfo product={product} />
      </div>

      {/* Product Tabs */}
      <div className="mb-12 bg-white rounded-lg shadow-sm">
        <ProductTabs product={product} />
      </div>

      {/* Product Recommendations */}
      <Separator className="my-12" />
      <ProductRecommendations
        recentlyViewed={recentlyViewed}
        similarProducts={similarProducts}
        frequentlyBoughtTogether={frequentlyBoughtTogether}
      />
    </div>
  );
};