import { useState, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/components/AuthProvider";
import { ArrowRight, CheckCircle2, DollarSign, Globe2, ShieldCheck, Store, Building2, Users, Truck } from "lucide-react";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const SellOnShopAfrican = () => {
  const [activeTab, setActiveTab] = useState("benefits");
  const { user } = useAuth();
  const navigate = useNavigate();

  const benefits = [
    {
      icon: <Globe2 className="w-12 h-12 text-primary" />,
      title: "Global Market Access",
      description: "Reach millions of business buyers worldwide interested in authentic African products."
    },
    {
      icon: <DollarSign className="w-12 h-12 text-primary" />,
      title: "Competitive Rates",
      description: "Enjoy industry-leading commission rates and transparent pricing structure."
    },
    {
      icon: <Store className="w-12 h-12 text-primary" />,
      title: "Professional Store Management",
      description: "Access powerful tools to manage your products, orders, and B2B relationships."
    },
    {
      icon: <ShieldCheck className="w-12 h-12 text-primary" />,
      title: "Verified Business Platform",
      description: "Join a trusted marketplace with verified buyers and sellers."
    }
  ];

  const requirements = [
    {
      icon: <Building2 className="w-5 h-5 text-primary" />,
      title: "Business Registration",
      description: "Valid business registration or trade license"
    },
    {
      icon: <Store className="w-5 h-5 text-primary" />,
      title: "Product Authenticity",
      description: "Genuine African products with proper documentation"
    },
    {
      icon: <Users className="w-5 h-5 text-primary" />,
      title: "Customer Service",
      description: "Dedicated B2B customer support capability"
    },
    {
      icon: <Truck className="w-5 h-5 text-primary" />,
      title: "Logistics Capability",
      description: "Reliable international shipping infrastructure"
    }
  ];

  const handleGetStarted = () => {
    if (user) {
      navigate("/vendor/register");
    } else {
      navigate("/auth", { state: { returnTo: "/vendor/register" } });
    }
  };

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-primary/10 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Grow Your African Business Globally
              </h1>
              <p className="text-xl mb-8 text-gray-600">
                Join Shop African Brand's B2B marketplace and connect with verified business buyers worldwide
              </p>
              <Button 
                size="lg" 
                onClick={handleGetStarted}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                Start Selling Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-16">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-4xl mx-auto">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="benefits">Benefits</TabsTrigger>
              <TabsTrigger value="requirements">Requirements</TabsTrigger>
              <TabsTrigger value="process">Process</TabsTrigger>
            </TabsList>

            <TabsContent value="benefits" className="mt-8">
              <div className="grid md:grid-cols-2 gap-8">
                {benefits.map((benefit, index) => (
                  <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center">
                        {benefit.icon}
                        <h3 className="text-xl font-semibold mt-4 mb-2">
                          {benefit.title}
                        </h3>
                        <p className="text-gray-600">
                          {benefit.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="requirements" className="mt-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold mb-6">Seller Requirements</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {requirements.map((requirement, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 rounded-lg border hover:border-primary/50 transition-colors">
                        <div className="flex-shrink-0">
                          {requirement.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">{requirement.title}</h4>
                          <p className="text-gray-600 text-sm">{requirement.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="process" className="mt-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold mb-6">Getting Started</h3>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-4 flex-shrink-0">1</div>
                      <div>
                        <h4 className="text-lg font-semibold mb-2">Create Your Business Account</h4>
                        <p className="text-gray-600">Register with your business details and documentation.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-4 flex-shrink-0">2</div>
                      <div>
                        <h4 className="text-lg font-semibold mb-2">Complete Verification</h4>
                        <p className="text-gray-600">Submit required business documents and complete the verification process.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-4 flex-shrink-0">3</div>
                      <div>
                        <h4 className="text-lg font-semibold mb-2">Set Up Your B2B Store</h4>
                        <p className="text-gray-600">Add your products, set bulk pricing, and customize your store profile.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-4 flex-shrink-0">4</div>
                      <div>
                        <h4 className="text-lg font-semibold mb-2">Start Trading Globally</h4>
                        <p className="text-gray-600">Begin receiving orders and growing your international B2B business.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="text-center mt-12">
            <Button 
              size="lg"
              onClick={handleGetStarted}
              className="bg-primary hover:bg-primary/90 text-white px-8"
            >
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default SellOnShopAfrican;