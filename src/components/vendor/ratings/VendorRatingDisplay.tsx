import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface VendorRatingDisplayProps {
  vendorId: string;
}

interface Rating {
  rating: number;
  comment: string;
  created_at: string;
  profiles: {
    full_name: string | null;
    username: string | null;
  };
}

export const VendorRatingDisplay = ({ vendorId }: VendorRatingDisplayProps) => {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const { data, error } = await supabase
          .from("vendor_ratings")
          .select(`
            rating,
            comment,
            created_at,
            profiles (
              full_name,
              username
            )
          `)
          .eq("vendor_id", vendorId)
          .order("created_at", { ascending: false });

        if (error) throw error;

        setRatings(data || []);
        
        // Calculate average rating
        if (data && data.length > 0) {
          const avg = data.reduce((acc, curr) => acc + curr.rating, 0) / data.length;
          setAverageRating(Math.round(avg * 10) / 10);
        }
      } catch (error) {
        console.error("Error fetching ratings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRatings();

    // Set up real-time subscription
    const channel = supabase
      .channel('vendor-ratings')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'vendor_ratings',
          filter: `vendor_id=eq.${vendorId}`
        },
        () => {
          fetchRatings();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [vendorId]);

  if (isLoading) {
    return <div>Loading ratings...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((value) => (
            <Star
              key={value}
              className={`w-5 h-5 ${
                value <= averageRating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <span className="text-lg font-medium">
          {averageRating} ({ratings.length} reviews)
        </span>
      </div>

      <div className="space-y-4">
        {ratings.map((rating, index) => (
          <div key={index} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <Star
                    key={value}
                    className={`w-4 h-4 ${
                      value <= rating.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                {new Date(rating.created_at).toLocaleDateString()}
              </span>
            </div>
            <p className="text-sm font-medium">
              {rating.profiles.full_name || rating.profiles.username || "Anonymous"}
            </p>
            {rating.comment && (
              <p className="mt-2 text-gray-600">{rating.comment}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};