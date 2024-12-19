import { Product, ProductStatus } from "@/types/product";
import { ProductImages } from "./ProductImages";
import { ProductInfo } from "./ProductInfo";
import { ProductTabs } from "./ProductTabs";
import { SimilarProducts } from "./SimilarProducts";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";
import { SameBrandProducts } from "./SameBrandProducts";

interface ProductDetailsContentProps {
  product: Product;
}

export const ProductDetailsContent = ({ product }: ProductDetailsContentProps) => {
  const { data: similarProducts = [] } = useQuery({
    queryKey: ["similar-products", product.category, product.id],
    queryFn: async () => {
      console.log("Fetching similar products for category:", product.category);
      const { data, error } = await supabase
        .from("products")
        .select("*, product_images(*)")
        .eq("category", product.category)
        .neq("id", product.id)
        .eq("status", "published")
        .limit(4);

      if (error) {
        console.error("Error fetching similar products:", error);
        throw error;
      }

      const transformedProducts: Product[] = (data || []).map(item => ({
        ...item,
        status: item.status as ProductStatus,
        images: item.image_url ? [{ url: item.image_url, alt: item.name }] : [],
        product_images: Array.isArray(item.product_images) ? item.product_images : []
      }));

      console.log("Transformed similar products:", transformedProducts);
      return transformedProducts;
    },
  });

  const { data: sameBrandProducts = [] } = useQuery({
    queryKey: ["same-brand-products", product.vendor_id, product.id],
    queryFn: async () => {
      console.log("Fetching same brand products for vendor:", product.vendor_id);
      const { data, error } = await supabase
        .from("products")
        .select("*, product_images(*)")
        .eq("vendor_id", product.vendor_id)
        .neq("id", product.id)
        .eq("status", "published")
        .limit(4);

      if (error) {
        console.error("Error fetching same brand products:", error);
        throw error;
      }

      const transformedProducts: Product[] = (data || []).map(item => ({
        ...item,
        status: item.status as ProductStatus,
        images: item.image_url ? [{ url: item.image_url, alt: item.name }] : [],
        product_images: Array.isArray(item.product_images) ? item.product_images : []
      }));

      console.log("Transformed same brand products:", transformedProducts);
      return transformedProducts;
    },
  });

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

      {/* Same Brand Products */}
      {sameBrandProducts.length > 0 && (
        <>
          <Separator className="my-12" />
          <div className="mb-12">
            <SameBrandProducts 
              products={sameBrandProducts} 
              currentProductId={product.id} 
            />
          </div>
        </>
      )}

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <>
          <Separator className="my-12" />
          <div className="mb-12">
            <SimilarProducts 
              products={similarProducts} 
              currentProductId={product.id} 
            />
          </div>
        </>
      )}
    </div>
  );
};