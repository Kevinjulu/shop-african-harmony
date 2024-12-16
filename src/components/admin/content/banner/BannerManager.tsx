import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { BannerForm } from "./BannerForm";
import { BannerList } from "./BannerList";

interface Banner {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  link: string | null;
  start_date: string | null;
  end_date: string | null;
  status: string;
}

export const BannerManager = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBanners();
    
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

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('banners')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      toast.success(`Banner ${newStatus}`);
    } catch (error) {
      console.error('Error updating banner status:', error);
      toast.error("Failed to update banner status");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('banners')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success("Banner deleted successfully");
    } catch (error) {
      console.error('Error deleting banner:', error);
      toast.error("Failed to delete banner");
    }
  };

  if (loading) {
    return <div>Loading banners...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Banner</CardTitle>
        </CardHeader>
        <CardContent>
          <BannerForm onSuccess={fetchBanners} />
        </CardContent>
      </Card>

      <BannerList 
        banners={banners}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
      />
    </div>
  );
};