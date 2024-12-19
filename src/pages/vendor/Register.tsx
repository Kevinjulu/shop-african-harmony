import { useState, useTransition } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const VendorRegister = () => {
  const [businessName, setBusinessName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { user } = useAuth();
  const navigate = useNavigate();

  console.log("Rendering VendorRegister component", { user, isLoading });

  const createVendorProfile = async () => {
    const { error } = await supabase.from("vendor_profiles").insert([
      {
        user_id: user?.id,
        business_name: businessName,
        description: description,
      },
    ]);

    if (error) throw error;

    toast.success("Vendor profile created successfully!");
    navigate("/vendor/dashboard");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please login first");
      navigate("/auth");
      return;
    }

    setIsLoading(true);
    try {
      // Use startTransition for UI updates
      startTransition(() => {
        createVendorProfile().catch((error) => {
          console.error("Error creating vendor profile:", error);
          toast.error("Failed to create vendor profile");
          setIsLoading(false);
        });
      });
    } catch (error) {
      console.error("Error creating vendor profile:", error);
      toast.error("Failed to create vendor profile");
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Please Login First</h1>
            <p className="text-gray-600 mb-6">
              You need to be logged in to register as a vendor.
            </p>
            <Button onClick={() => navigate("/auth")}>
              Go to Login
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
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
                disabled={isLoading}
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
                disabled={isLoading}
              />
            </div>
            <Button 
              type="submit" 
              disabled={isLoading || isPending}
              className="w-full"
            >
              {(isLoading || isPending) ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Registering...
                </>
              ) : (
                "Register as Vendor"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VendorRegister;