import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { toast } from "sonner";

export const useWishlistCount = () => {
  const { user } = useAuth();
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    if (!user) {
      setWishlistCount(0);
      return;
    }

    const fetchWishlistCount = async () => {
      try {
        const { count, error } = await supabase
          .from('wishlists')
          .select('*', { count: 'exact' })
          .eq('user_id', user.id);

        if (error) throw error;
        setWishlistCount(count || 0);
      } catch (error) {
        console.error('Error fetching wishlist count:', error);
        toast.error("Failed to fetch wishlist count");
      }
    };

    fetchWishlistCount();

    const channel = supabase
      .channel('wishlist_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'wishlists',
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          fetchWishlistCount();
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [user]);

  return { wishlistCount };
};