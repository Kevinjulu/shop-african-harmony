import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { toast } from "sonner";

export interface OrderDetails {
  id: string;
  created_at: string;
  total_amount: number;
  status: string;
  tracking_number: string | null;
  shipping_method: string;
  shipping_address: {
    full_name: string;
    address_line1: string;
    address_line2: string | null;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  } | null;
  items: Array<{
    id: string;
    quantity: number;
    price_at_time: number;
    product: {
      name: string;
      image_url: string;
    };
  }>;
}

export const useOrders = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const fetchOrders = async (): Promise<OrderDetails[]> => {
    console.log('Fetching orders for user:', user?.id);
    if (!user) throw new Error("User not authenticated");

    const { data, error } = await supabase
      .from("orders")
      .select(`
        *,
        shipping_address:shipping_addresses(*),
        items:order_items(
          *,
          product:products(name, image_url)
        )
      `)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }

    return data as OrderDetails[];
  };

  const { data: orders, isLoading, error } = useQuery({
    queryKey: ["orders", user?.id],
    queryFn: fetchOrders,
    enabled: !!user,
  });

  const updateOrderStatus = useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string; status: string }) => {
      const { error } = await supabase
        .from("orders")
        .update({ status })
        .eq("id", orderId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order status updated successfully");
    },
    onError: (error) => {
      console.error('Error updating order status:', error);
      toast.error("Failed to update order status");
    },
  });

  return {
    orders,
    isLoading,
    error,
    updateOrderStatus,
  };
};