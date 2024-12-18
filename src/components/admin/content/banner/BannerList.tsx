import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Banner } from "./types";

interface BannerListProps {
  banners: Banner[];
  onRefetch: () => void;
}

export const BannerList = ({ banners, onRefetch }: BannerListProps) => {
  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('banners')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      toast.success(`Banner ${newStatus}`);
      onRefetch();
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
      onRefetch();
    } catch (error) {
      console.error('Error deleting banner:', error);
      toast.error("Failed to delete banner");
    }
  };

  return (
    <div className="grid gap-6">
      {banners.map((banner) => (
        <Card key={banner.id}>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{banner.title}</h3>
                {banner.description && (
                  <p className="text-gray-600 mt-1">{banner.description}</p>
                )}
                {banner.link && (
                  <a href={banner.link} className="text-primary hover:underline mt-1 block">
                    {banner.link}
                  </a>
                )}
                <div className="flex gap-4 mt-2 text-sm text-gray-500">
                  {banner.start_date && (
                    <span>Starts: {new Date(banner.start_date).toLocaleDateString()}</span>
                  )}
                  {banner.end_date && (
                    <span>Ends: {new Date(banner.end_date).toLocaleDateString()}</span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                {banner.status === 'draft' ? (
                  <Button
                    variant="outline"
                    onClick={() => handleStatusChange(banner.id, 'published')}
                  >
                    Publish
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => handleStatusChange(banner.id, 'draft')}
                  >
                    Unpublish
                  </Button>
                )}
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(banner.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
            {banner.image_url && (
              <div className="mt-4">
                <img
                  src={banner.image_url}
                  alt={banner.title}
                  className="max-h-40 object-cover rounded-lg"
                />
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};