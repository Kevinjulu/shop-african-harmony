import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ReviewForm } from "./ReviewForm";
import { ReviewList } from "./ReviewList";
import { useAuth } from "@/components/AuthProvider";
import { toast } from "sonner";

interface ProductReviewsProps {
  productId: string;
}

export const ProductReviews = ({ productId }: ProductReviewsProps) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { user } = useAuth();

  const handleAddReview = () => {
    if (!user) {
      toast.error("Please login to write a review");
      return;
    }
    setShowReviewForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Customer Reviews</h3>
        {!showReviewForm && (
          <Button onClick={handleAddReview}>
            Write a Review
          </Button>
        )}
      </div>

      {showReviewForm && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <ReviewForm
            productId={productId}
            onSuccess={() => setShowReviewForm(false)}
            onCancel={() => setShowReviewForm(false)}
          />
        </div>
      )}

      <ReviewList productId={productId} />
    </div>
  );
};