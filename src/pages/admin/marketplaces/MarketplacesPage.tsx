import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { MarketplaceForm, MarketplaceFormData } from "./components/MarketplaceForm";
import { MarketplaceList } from "./components/MarketplaceList";
import { Marketplace } from "./types";

const MarketplacesPage = () => {
  const [selectedMarketplace, setSelectedMarketplace] = useState<Marketplace | null>(null);
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
            .eq("id", selectedMarketplace?.id)
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
      resetForm();
      refetch();
    } catch (error) {
      console.error("Error saving marketplace:", error);
      toast.error("Failed to save marketplace");
    }
  };

  const handleEdit = (marketplace: Marketplace) => {
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

  const resetForm = () => {
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
        <MarketplaceForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          isEditing={isEditing}
          onCancel={resetForm}
        />
        
        <MarketplaceList
          marketplaces={marketplaces || []}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default MarketplacesPage;