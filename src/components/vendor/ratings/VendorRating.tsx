import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface VendorRatingProps {
  vendorId: string;
  onRatingSubmit?: () => void;
}

export const VendorRating = ({ vendorId, onRatingSubmit }: VendorRatingProps) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const handleRatingSubmit = async () => {
    if (!user) {
      toast.error("Please login to submit a rating");
      return;
    }

    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("vendor_ratings").insert([
        {
          vendor_id: vendorId,
          user_id: user.id,
          rating,
          comment,
        },
      ]);

      if (error) throw error;

      toast.success("Rating submitted successfully");
      setRating(0);
      setComment("");
      onRatingSubmit?.();
    } catch (error) {
      console.error("Error submitting rating:", error);
      toast.error("Failed to submit rating");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setRating(value)}
            onMouseEnter={() => setHoveredRating(value)}
            onMouseLeave={() => setHoveredRating(0)}
            className="p-1"
          >
            <Star
              className={`w-6 h-6 ${
                value <= (hoveredRating || rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>

      <Textarea
        placeholder="Share your experience with this vendor (optional)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="min-h-[100px]"
      />

      <Button
        onClick={handleRatingSubmit}
        disabled={isSubmitting || rating === 0}
      >
        Submit Rating
      </Button>
    </div>
  );
};