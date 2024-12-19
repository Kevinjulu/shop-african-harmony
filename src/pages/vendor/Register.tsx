import { useState, useTransition } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Building2, ShieldCheck, ChartBar, DollarSign } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const VendorRegister = () => {
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
  const [isPending, startTransition] = useTransition();
  const { user } = useAuth();
  const navigate = useNavigate();

  console.log("Rendering VendorRegister component", { user, isLoading });

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

  const features = [
    {
      icon: <Building2 className="w-12 h-12 text-primary mb-4" />,
      title: "Business Verification",
      description: "Get verified status to build trust with buyers"
    },
    {
      icon: <ShieldCheck className="w-12 h-12 text-primary mb-4" />,
      title: "Secure Platform",
      description: "Advanced security measures to protect your business"
    },
    {
      icon: <ChartBar className="w-12 h-12 text-primary mb-4" />,
      title: "Analytics Dashboard",
      description: "Track your performance and growth"
    },
    {
      icon: <DollarSign className="w-12 h-12 text-primary mb-4" />,
      title: "Global Payments",
      description: "Accept payments from customers worldwide"
    }
  ];

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
      {/* Hero Section */}
      <div className="bg-primary/10 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Become a Vendor on Shop African Brand</h1>
            <p className="text-xl text-gray-600">
              Join our growing marketplace and reach customers worldwide
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="text-center p-6">
              <CardContent>
                <div className="flex flex-col items-center">
                  {feature.icon}
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="max-w-2xl mx-auto">
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
                      placeholder={user.email || "Business contact email"}
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VendorRegister;