import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tag } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface Discount {
  code: string;
  description: string;
  discount_value: number;
  discount_type: string;
}

export const DiscountBanner = () => {
  const { data: activeDiscount, error } = useQuery({
    queryKey: ["active-discount"],
    queryFn: async () => {
      console.log("Fetching active discount...");
      const { data, error } = await supabase
        .from("discounts")
        .select("*")
        .eq("is_active", true)
        .gt("expires_at", new Date().toISOString())
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error("Error fetching discount:", error);
        throw error;
      }

      console.log("Discount data:", data);
      return data as Discount | null;
    },
    retry: 3,
    retryDelay: 1000,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  useEffect(() => {
    if (error) {
      console.error("Error in discount query:", error);
      toast.error("Failed to load discount information");
    }
  }, [error]);

  if (!activeDiscount) return null;

  return (
    <Alert className="bg-primary/10 border-primary mb-6">
      <Tag className="h-4 w-4" />
      <AlertDescription className="flex items-center gap-2">
        <span className="font-semibold">{activeDiscount.code}:</span>
        <span>
          {activeDiscount.discount_type === "percentage"
            ? `${activeDiscount.discount_value}% off`
            : `$${activeDiscount.discount_value} off`}{" "}
          - {activeDiscount.description}
        </span>
      </AlertDescription>
    </Alert>
  );
};