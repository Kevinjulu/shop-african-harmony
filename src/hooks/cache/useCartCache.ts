import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { toast } from "sonner";
import { CACHE_TIME, STALE_TIME } from "./useProductCache";

interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  product: {
    name: string;
    price: number;
    image_url: string;
  };
}

export const useCartCache = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch cart items
  const {
    data: cartItems,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cart", user?.id],
    queryFn: async () => {
      console.log("Fetching cart items for user:", user?.id);
      
      if (!user) return [];

      const { data, error } = await supabase
        .from("cart_items")
        .select(`
          *,
          product:products (
            name,
            price,
            image_url,
            stock
          )
        `)
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching cart:", error);
        throw error;
      }

      return data as CartItem[];
    },
    enabled: !!user,
    gcTime: CACHE_TIME,
    staleTime: STALE_TIME,
  });

  // Add to cart mutation
  const addToCart = useMutation({
    mutationFn: async ({ productId, quantity }: { productId: string; quantity: number }) => {
      console.log("Adding to cart:", { productId, quantity });
      
      if (!user) {
        throw new Error("Must be logged in to add to cart");
      }

      const { data, error } = await supabase
        .from("cart_items")
        .upsert({
          user_id: user.id,
          product_id: productId,
          quantity,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", user?.id] });
      toast.success("Added to cart successfully");
    },
    onError: (error) => {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart");
    },
  });

  // Remove from cart mutation
  const removeFromCart = useMutation({
    mutationFn: async (itemId: string) => {
      console.log("Removing from cart:", itemId);
      
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("id", itemId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", user?.id] });
      toast.success("Removed from cart");
    },
    onError: (error) => {
      console.error("Error removing from cart:", error);
      toast.error("Failed to remove from cart");
    },
  });

  // Update cart item quantity mutation
  const updateQuantity = useMutation({
    mutationFn: async ({ itemId, quantity }: { itemId: string; quantity: number }) => {
      console.log("Updating cart quantity:", { itemId, quantity });
      
      const { error } = await supabase
        .from("cart_items")
        .update({ quantity })
        .eq("id", itemId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", user?.id] });
      toast.success("Cart updated");
    },
    onError: (error) => {
      console.error("Error updating cart:", error);
      toast.error("Failed to update cart");
    },
  });

  return {
    cartItems,
    isLoading,
    error,
    addToCart,
    removeFromCart,
    updateQuantity,
    totalItems: cartItems?.reduce((sum, item) => sum + item.quantity, 0) ?? 0,
    subtotal: cartItems?.reduce((sum, item) => sum + (item.product.price * item.quantity), 0) ?? 0,
  };
};