import { Product } from "@/types/product";
import { ProductImages } from "./ProductImages";
import { ProductInfo } from "./ProductInfo";
import { ProductTabs } from "./ProductTabs";
import { SimilarProducts } from "./SimilarProducts";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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
        .select("*")
        .eq("category", product.category)
        .neq("id", product.id)
        .limit(4);

      if (error) {
        console.error("Error fetching similar products:", error);
        throw error;
      }

      // Transform the data to match the Product type
      const transformedProducts: Product[] = (data || []).map(item => ({
        ...item,
        status: item.status as ProductStatus,
        images: item.image_url ? [{ url: item.image_url, alt: item.name }] : []
      }));

      return transformedProducts;
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
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

      <ProductTabs product={product} />

      <div className="mt-12">
        <SimilarProducts 
          products={similarProducts} 
          currentProductId={product.id} 
        />
      </div>
    </div>
  );
};