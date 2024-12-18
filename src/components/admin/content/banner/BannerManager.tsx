import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { BannerForm } from "./BannerForm";
import { BannerList } from "./BannerList";
import { Banner } from "./types";

export const BannerManager = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBanners();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('banner-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'banners' },
        () => {
          fetchBanners();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchBanners = async () => {
    try {
      const { data, error } = await supabase
        .from('banners')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBanners(data || []);
    } catch (error) {
      console.error('Error fetching banners:', error);
      toast.error("Failed to load banners");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading banners...</div>;
  }

  return (
    <div className="space-y-6">
      <BannerForm onSuccess={fetchBanners} />
      <BannerList banners={banners} onRefetch={fetchBanners} />
    </div>
  );
};