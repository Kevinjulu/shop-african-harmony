import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/product";
import { toast } from "sonner";

export const CACHE_TIME = 1000 * 60 * 5; // 5 minutes
export const STALE_TIME = 1000 * 30; // 30 seconds

export const useProductCache = (productId?: string) => {
  const queryClient = useQueryClient();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      console.log("Fetching product details for:", productId);
      
      if (!productId) {
        throw new Error("Product ID is required");
      }

      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          product_images (
            id,
            image_url,
            is_primary,
            display_order
          ),
          vendor:vendor_profiles (
            id,
            business_name,
            logo_url
          )
        `)
        .eq("id", productId)
        .single();

      if (error) {
        console.error("Error fetching product:", error);
        throw error;
      }

      return data as unknown as Product;
    },
    enabled: !!productId,
    gcTime: CACHE_TIME,
    staleTime: STALE_TIME,
  });

  // Prefetch related products
  const prefetchRelatedProducts = async (categoryId: string) => {
    console.log("Prefetching related products for category:", categoryId);
    
    await queryClient.prefetchQuery({
      queryKey: ["products", { category: categoryId }],
      queryFn: async () => {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("category_id", categoryId)
          .limit(4);

        if (error) {
          console.error("Error prefetching related products:", error);
          throw error;
        }

        return data;
      },
      gcTime: CACHE_TIME,
      staleTime: STALE_TIME,
    });
  };

  return {
    product,
    isLoading,
    error,
    prefetchRelatedProducts,
  };
};