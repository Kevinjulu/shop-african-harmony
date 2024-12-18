import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export const InventoryAlert = ({ productId }: { productId: string }) => {
  const [lowStock, setLowStock] = useState(false);

  useEffect(() => {
    const checkInventory = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("inventory_quantity")
        .eq("id", productId)
        .single();

      if (error) {
        console.error("Error checking inventory:", error);
        return;
      }

      if (data && data.inventory_quantity <= 10) {
        setLowStock(true);
      }
    };

    checkInventory();

    // Subscribe to inventory changes
    const subscription = supabase
      .channel(`product-${productId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "products",
          filter: `id=eq.${productId}`,
        },
        (payload: any) => {
          if (payload.new.inventory_quantity <= 10) {
            setLowStock(true);
          } else {
            setLowStock(false);
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [productId]);

  if (!lowStock) return null;

  return (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Low Stock Alert</AlertTitle>
      <AlertDescription>
        This item is running low on stock. Order soon to avoid missing out!
      </AlertDescription>
    </Alert>
  );
};