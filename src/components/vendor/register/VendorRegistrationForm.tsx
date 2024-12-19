import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const VendorRegistrationForm = () => {
  const [formData, setFormData] = useState({
    businessName: "",
    description: "",
    businessRegistrationNumber: "",
    businessAddress: "",
    contactEmail: "",
    contactPhone: "",
    businessCategory: "retail",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const createVendorProfile = async () => {
    const { error } = await supabase.from("vendor_profiles").insert([
      {
        user_id: user?.id,
        business_name: formData.businessName,
        description: formData.description,
        business_registration_number: formData.businessRegistrationNumber,
        business_address: formData.businessAddress,
        contact_email: formData.contactEmail || user?.email,
        contact_phone: formData.contactPhone,
        business_category: formData.businessCategory,
        status: "pending",
        verification_status: "pending"
      },
    ]);

    if (error) throw error;
    
    toast.success("Vendor profile created successfully! Our team will review your application.");
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
      await createVendorProfile();
    } catch (error) {
      console.error("Error creating vendor profile:", error);
      toast.error("Failed to create vendor profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register Your Business</CardTitle>
        <CardDescription>
          Fill in your business details to start selling on our platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Business Name
              </label>
              <Input
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                required
                placeholder="Your business name"
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Business Registration Number
              </label>
              <Input
                value={formData.businessRegistrationNumber}
                onChange={(e) => setFormData({ ...formData, businessRegistrationNumber: e.target.value })}
                required
                placeholder="Registration number"
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Business Address
            </label>
            <Input
              value={formData.businessAddress}
              onChange={(e) => setFormData({ ...formData, businessAddress: e.target.value })}
              required
              placeholder="Full business address"
              disabled={isLoading}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Contact Email
              </label>
              <Input
                type="email"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                placeholder={user?.email || "Business contact email"}
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Contact Phone
              </label>
              <Input
                value={formData.contactPhone}
                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                required
                placeholder="Business phone number"
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Business Description
            </label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              placeholder="Tell us about your business"
              rows={4}
              disabled={isLoading}
            />
          </div>

          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Registering...
              </>
            ) : (
              "Register as Vendor"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};