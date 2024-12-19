import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/product";
import { useEffect } from "react";

export const useProductRecommendations = (productId: string) => {
  // Track product view
  useEffect(() => {
    const trackProductView = async () => {
      console.log("Tracking product view:", productId);
      try {
        const { data: existingHistory } = await supabase
          .from("search_history")
          .select("*")
          .eq("user_id", (await supabase.auth.getUser()).data.user?.id)
          .eq("query", `product_view_${productId}`)
          .single();

        if (!existingHistory) {
          await supabase.from("search_history").insert({
            user_id: (await supabase.auth.getUser()).data.user?.id,
            query: `product_view_${productId}`,
            filters: { type: "product_view", productId }
          });
        }
      } catch (error) {
        console.error("Error tracking product view:", error);
      }
    };

    trackProductView();
  }, [productId]);

  // Get recently viewed products
  const { data: recentlyViewed = [] } = useQuery({
    queryKey: ["recently-viewed"],
    queryFn: async () => {
      console.log("Fetching recently viewed products");
      const { data: history } = await supabase
        .from("search_history")
        .select("*")
        .eq("user_id", (await supabase.auth.getUser()).data.user?.id)
        .like("query", "product_view_%")
        .order("created_at", { ascending: false })
        .limit(4);

      if (!history) return [];

      const productIds = history
        .map(h => h.query.replace("product_view_", ""))
        .filter(id => id !== productId);

      const { data: products } = await supabase
        .from("products")
        .select("*, product_images(*)")
        .in("id", productIds)
        .limit(4);

      return products as Product[] || [];
    },
  });

  // Get similar products in the same category
  const { data: similarProducts = [] } = useQuery({
    queryKey: ["similar-products", productId],
    queryFn: async () => {
      console.log("Fetching similar products");
      const { data: currentProduct } = await supabase
        .from("products")
        .select("category")
        .eq("id", productId)
        .single();

      if (!currentProduct) return [];

      const { data: products } = await supabase
        .from("products")
        .select("*, product_images(*)")
        .eq("category", currentProduct.category)
        .neq("id", productId)
        .limit(4);

      return products as Product[] || [];
    },
  });

  // Get products frequently bought together
  const { data: frequentlyBoughtTogether = [] } = useQuery({
    queryKey: ["frequently-bought-together", productId],
    queryFn: async () => {
      console.log("Fetching frequently bought together products");
      const { data: orderItems } = await supabase
        .from("order_items")
        .select("order_id")
        .eq("product_id", productId);

      if (!orderItems?.length) return [];

      const orderIds = orderItems.map(item => item.order_id);

      const { data: relatedItems } = await supabase
        .from("order_items")
        .select("product_id")
        .in("order_id", orderIds)
        .neq("product_id", productId)
        .limit(4);

      if (!relatedItems?.length) return [];

      const productIds = [...new Set(relatedItems.map(item => item.product_id))];

      const { data: products } = await supabase
        .from("products")
        .select("*, product_images(*)")
        .in("id", productIds)
        .limit(4);

      return products as Product[] || [];
    },
  });

  return {
    recentlyViewed,
    similarProducts,
    frequentlyBoughtTogether,
  };
};