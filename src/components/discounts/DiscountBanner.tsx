import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tag } from "lucide-react";

export const DiscountBanner = () => {
  const [activeDiscount, setActiveDiscount] = useState<{
    code: string;
    description: string;
    discount_value: number;
    discount_type: string;
  } | null>(null);

  useEffect(() => {
    const fetchActiveDiscount = async () => {
      try {
        const { data, error } = await supabase
          .from("discounts")
          .select("*")
          .eq("is_active", true)
          .gt("expires_at", new Date().toISOString())
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        if (error) {
          console.error("Error fetching discount:", { error });
          return;
        }

        if (data) {
          setActiveDiscount(data);
          toast.success("New discount available!");
        }
      } catch (err) {
        console.error("Error in fetchActiveDiscount:", err);
      }
    };

    fetchActiveDiscount();
  }, []);

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