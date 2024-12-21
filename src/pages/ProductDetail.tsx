import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ProductDetailsContent } from "@/components/product-details/ProductDetailsContent";
import { ProductImages } from "@/components/product-details/ProductImages";
import { ProductInfo } from "@/components/product-details/ProductInfo";
import { ProductTabs } from "@/components/product-details/ProductTabs";
import { ProductRecommendations } from "@/components/product-details/ProductRecommendations";
import { Product, ProductStatus } from "@/types/product";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  console.log("Rendering ProductDetail page for id:", id);

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          product_images (*),
          vendor:vendor_profiles (
            id,
            business_name,
            logo_url
          )
        `)
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;

      // Transform the data to match the Product type
      if (data) {
        return {
          ...data,
          status: data.status as ProductStatus, // Explicitly cast status to ProductStatus
        } as Product;
      }
      return null;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetailsContent product={product} />
      <ProductTabs product={product} />
      <ProductRecommendations 
        recentlyViewed={[]}
        similarProducts={[]}
        frequentlyBoughtTogether={[]}
      />
    </div>
  );
};

export default ProductDetail;