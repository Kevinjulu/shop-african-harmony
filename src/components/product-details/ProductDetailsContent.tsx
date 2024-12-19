import { Product, ProductStatus } from "@/types/product";
import { ProductImages } from "./ProductImages";
import { ProductInfo } from "./ProductInfo";
import { ProductTabs } from "./ProductTabs";
import { SimilarProducts } from "./SimilarProducts";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Separator } from "@/components/ui/separator";

interface ProductDetailsContentProps {
  product: Product;
}

export const ProductDetailsContent = ({ product }: ProductDetailsContentProps) => {
  // Fetch similar products based on category
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

      // Transform the data to match the Product type
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-8 bg-white rounded-lg shadow-sm p-6">
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

      <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
        <ProductTabs product={product} />
      </div>

      <Separator className="my-12" />

      <div className="mt-8">
        <SimilarProducts 
          products={similarProducts} 
          currentProductId={product.id} 
        />
      </div>
    </div>
  );
};