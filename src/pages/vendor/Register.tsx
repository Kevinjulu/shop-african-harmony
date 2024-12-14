import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const VendorRegister = () => {
  const [businessName, setBusinessName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login first");
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.from("vendor_profiles").insert([
        {
          user_id: user.id,
          business_name: businessName,
          description: description,
        },
      ]);

      if (error) throw error;

      toast.success("Vendor profile created successfully!");
      navigate("/vendor/dashboard");
    } catch (error) {
      console.error("Error creating vendor profile:", error);
      toast.error("Failed to create vendor profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Register as a Vendor</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Business Name
              </label>
              <Input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                required
                placeholder="Enter your business name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Business Description
              </label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder="Describe your business"
                rows={4}
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register as Vendor"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VendorRegister;