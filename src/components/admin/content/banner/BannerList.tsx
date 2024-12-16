import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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

interface BannerListProps {
  banners: Banner[];
  onStatusChange: (id: string, status: string) => void;
  onDelete: (id: string) => void;
}

export const BannerList = ({ banners, onStatusChange, onDelete }: BannerListProps) => {
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
                    onClick={() => onStatusChange(banner.id, 'published')}
                  >
                    Publish
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => onStatusChange(banner.id, 'draft')}
                  >
                    Unpublish
                  </Button>
                )}
                <Button
                  variant="destructive"
                  onClick={() => onDelete(banner.id)}
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