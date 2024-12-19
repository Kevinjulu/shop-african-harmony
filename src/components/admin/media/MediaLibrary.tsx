import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Grid, Image, Trash2, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface MediaItem {
  id: string;
  url: string;
  name: string;
  type: string;
  created_at: string;
}

export const MediaLibrary = () => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const { data: images, error } = await supabase
        .storage
        .from('product-images')
        .list();

      if (error) throw error;

      const mediaItems = images.map(image => ({
        id: image.id,
        url: supabase.storage.from('product-images').getPublicUrl(image.name).data.publicUrl,
        name: image.name,
        type: image.metadata?.mimetype || 'image/*',
        created_at: image.created_at,
      }));

      setMedia(mediaItems);
    } catch (error) {
      console.error('Error fetching media:', error);
      toast.error("Failed to load media library");
    }
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files || event.target.files.length === 0) {
        return;
      }

      setUploading(true);
      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      toast.success("File uploaded successfully");
      fetchMedia();
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error("Failed to upload file");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (fileName: string) => {
    try {
      const { error } = await supabase.storage
        .from('product-images')
        .remove([fileName]);

      if (error) throw error;

      toast.success("File deleted successfully");
      setMedia(media.filter(item => item.name !== fileName));
    } catch (error) {
      console.error('Error deleting file:', error);
      toast.error("Failed to delete file");
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Media Library</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setView('grid')}
          >
            <Grid className={`h-4 w-4 ${view === 'grid' ? 'text-primary' : ''}`} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setView('list')}
          >
            <Image className={`h-4 w-4 ${view === 'list' ? 'text-primary' : ''}`} />
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <Input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          disabled={uploading}
        />
      </div>

      <div className={view === 'grid' ? 'grid grid-cols-2 md:grid-cols-4 gap-4' : 'space-y-2'}>
        {media.map((item) => (
          <Card key={item.id} className={view === 'grid' ? 'p-2' : 'p-4'}>
            <div className={view === 'grid' ? '' : 'flex items-center gap-4'}>
              <img
                src={item.url}
                alt={item.name}
                className={view === 'grid' ? 'w-full aspect-square object-cover rounded-md mb-2' : 'w-20 h-20 object-cover rounded-md'}
              />
              <div className="flex-1">
                <p className="text-sm font-medium truncate">{item.name}</p>
                <div className="flex justify-between items-center mt-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(item.name)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};