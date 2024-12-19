import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, Loader2 } from "lucide-react";

interface MarketplaceFormData {
  name: string;
  location: string;
  country: string;
  description: string;
  schedule: string;
  next_market_date: Date | null;
  end_market_date: Date | null;
}

const MarketplacesPage = () => {
  const [selectedMarketplace, setSelectedMarketplace] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<MarketplaceFormData>({
    name: "",
    location: "",
    country: "",
    description: "",
    schedule: "",
    next_market_date: null,
    end_market_date: null,
  });

  const { data: marketplaces, refetch, isLoading } = useQuery({
    queryKey: ["marketplaces"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("marketplaces")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const dataToSubmit = {
        ...formData,
        next_market_date: formData.next_market_date?.toISOString(),
        end_market_date: formData.end_market_date?.toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { error } = isEditing
        ? await supabase
            .from("marketplaces")
            .update(dataToSubmit)
            .eq("id", selectedMarketplace.id)
        : await supabase.from("marketplaces").insert([
            {
              ...dataToSubmit,
              created_at: new Date().toISOString(),
            },
          ]);

      if (error) throw error;

      toast.success(
        `Marketplace ${isEditing ? "updated" : "created"} successfully`
      );
      setIsEditing(false);
      setSelectedMarketplace(null);
      setFormData({
        name: "",
        location: "",
        country: "",
        description: "",
        schedule: "",
        next_market_date: null,
        end_market_date: null,
      });
      refetch();
    } catch (error) {
      console.error("Error saving marketplace:", error);
      toast.error("Failed to save marketplace");
    }
  };

  const handleEdit = (marketplace: any) => {
    setSelectedMarketplace(marketplace);
    setFormData({
      name: marketplace.name,
      location: marketplace.location,
      country: marketplace.country,
      description: marketplace.description || "",
      schedule: marketplace.schedule,
      next_market_date: marketplace.next_market_date
        ? new Date(marketplace.next_market_date)
        : null,
      end_market_date: marketplace.end_market_date
        ? new Date(marketplace.end_market_date)
        : null,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("marketplaces")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast.success("Marketplace deleted successfully");
      refetch();
    } catch (error) {
      console.error("Error deleting marketplace:", error);
      toast.error("Failed to delete marketplace");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Marketplace Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>
              {isEditing ? "Edit Marketplace" : "Add New Marketplace"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="schedule">Schedule</Label>
                <Input
                  id="schedule"
                  value={formData.schedule}
                  onChange={(e) =>
                    setFormData({ ...formData, schedule: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label>Next Market Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.next_market_date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.next_market_date ? (
                        format(formData.next_market_date, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.next_market_date || undefined}
                      onSelect={(date) =>
                        setFormData({ ...formData, next_market_date: date })
                      }
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label>End Market Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.end_market_date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.end_market_date ? (
                        format(formData.end_market_date, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.end_market_date || undefined}
                      onSelect={(date) =>
                        setFormData({ ...formData, end_market_date: date })
                      }
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex gap-2">
                <Button type="submit">
                  {isEditing ? "Update Marketplace" : "Add Marketplace"}
                </Button>
                {isEditing && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false);
                      setSelectedMarketplace(null);
                      setFormData({
                        name: "",
                        location: "",
                        country: "",
                        description: "",
                        schedule: "",
                        next_market_date: null,
                        end_market_date: null,
                      });
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* List */}
        <Card>
          <CardHeader>
            <CardTitle>Marketplaces</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {marketplaces?.map((marketplace) => (
                <div
                  key={marketplace.id}
                  className="p-4 border rounded-lg space-y-2"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{marketplace.name}</h3>
                      <p className="text-sm text-gray-500">
                        {marketplace.location}, {marketplace.country}
                      </p>
                      <p className="text-sm text-gray-500">
                        Schedule: {marketplace.schedule}
                      </p>
                      {marketplace.next_market_date && (
                        <p className="text-sm text-gray-500">
                          Next Market:{" "}
                          {format(
                            new Date(marketplace.next_market_date),
                            "PPP"
                          )}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(marketplace)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(marketplace.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MarketplacesPage;