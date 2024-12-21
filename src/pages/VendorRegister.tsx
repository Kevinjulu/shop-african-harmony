import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { VendorFeatures } from "@/components/vendor/register/VendorFeatures";
import { VendorRegistrationForm } from "@/components/vendor/register/VendorRegistrationForm";

const VendorRegister = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  console.log("Rendering VendorRegister component", { user });

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
      <div className="bg-primary/10 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Become a Vendor</h1>
            <p className="text-xl text-gray-600">
              Join our growing marketplace and reach customers worldwide
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <VendorFeatures />
        <div className="max-w-2xl mx-auto">
          <VendorRegistrationForm />
        </div>
      </div>
    </div>
  );
};

export default VendorRegister;