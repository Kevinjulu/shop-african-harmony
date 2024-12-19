import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/product";
import { CACHE_TIME, STALE_TIME } from "./useProductCache";

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  search?: string;
}

export const useProductsCache = (filters: ProductFilters = {}, pageSize = 12) => {
  // Regular paginated query
  const {
    data: products,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["products", filters],
    queryFn: async ({ pageParam = 0 }) => {
      console.log("Fetching products page:", pageParam, "with filters:", filters);
      
      let query = supabase
        .from("products")
        .select(`
          *,
          product_images (
            id,
            image_url,
            is_primary
          ),
          vendor:vendor_profiles (
            business_name
          )
        `)
        .range(pageParam * pageSize, (pageParam + 1) * pageSize - 1);

      if (filters.category) {
        query = query.eq("category", filters.category);
      }

      if (filters.minPrice) {
        query = query.gte("price", filters.minPrice);
      }

      if (filters.maxPrice) {
        query = query.lte("price", filters.maxPrice);
      }

      if (filters.search) {
        query = query.textSearch("search_vector", filters.search);
      }

      if (filters.sortBy) {
        const [field, order] = filters.sortBy.split("-");
        query = query.order(field, { ascending: order === "asc" });
      } else {
        query = query.order("created_at", { ascending: false });
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching products:", error);
        throw error;
      }

      return {
        items: data as Product[],
        nextPage: data.length === pageSize ? pageParam + 1 : undefined,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    gcTime: CACHE_TIME,
    staleTime: STALE_TIME,
  });

  // Featured products query
  const {
    data: featuredProducts,
    isLoading: isFeaturedLoading,
  } = useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      console.log("Fetching featured products");
      
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("status", "published")
        .order("created_at", { ascending: false })
        .limit(6);

      if (error) {
        console.error("Error fetching featured products:", error);
        throw error;
      }

      return data as Product[];
    },
    gcTime: CACHE_TIME,
    staleTime: STALE_TIME,
  });

  return {
    products: products?.pages.flatMap((page) => page.items) ?? [],
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    featuredProducts,
    isFeaturedLoading,
  };
};