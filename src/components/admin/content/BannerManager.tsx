import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon } from "lucide-react";

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
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from('banners').insert([
        {
          title,
          description,
          image_url: imageUrl,
          link,
          start_date: startDate?.toISOString(),
          end_date: endDate?.toISOString(),
          status: 'draft'
        }
      ]);

      if (error) throw error;

      toast.success("Banner created successfully");
      setTitle("");
      setDescription("");
      setImageUrl("");
      setLink("");
      setStartDate(undefined);
      setEndDate(undefined);
    } catch (error) {
      console.error('Error creating banner:', error);
      toast.error("Failed to create banner");
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <Input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Link</label>
              <Input
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Start Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">End Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <Button type="submit">Create Banner</Button>
          </form>
        </CardContent>
      </Card>

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
    </div>
  );
};