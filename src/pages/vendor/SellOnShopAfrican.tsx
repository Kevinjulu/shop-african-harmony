import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/components/AuthProvider";
import { ArrowRight, CheckCircle2, DollarSign, Globe2, ShieldCheck, Store } from "lucide-react";

const SellOnShopAfrican = () => {
  const [activeTab, setActiveTab] = useState("benefits");
  const { user } = useAuth();
  const navigate = useNavigate();

  const benefits = [
    {
      icon: <Globe2 className="w-12 h-12 text-primary" />,
      title: "Global Reach",
      description: "Access customers from all over the world interested in authentic African products."
    },
    {
      icon: <DollarSign className="w-12 h-12 text-primary" />,
      title: "Competitive Rates",
      description: "Enjoy competitive commission rates and transparent pricing structure."
    },
    {
      icon: <Store className="w-12 h-12 text-primary" />,
      title: "Easy Store Management",
      description: "Powerful tools to manage your products, orders, and customer relationships."
    },
    {
      icon: <ShieldCheck className="w-12 h-12 text-primary" />,
      title: "Secure Platform",
      description: "Built-in security features to protect your business and customers."
    }
  ];

  const requirements = [
    "Valid business registration or license",
    "Authentic African products or services",
    "Quality product images and descriptions",
    "Reliable shipping capabilities",
    "Customer service commitment",
    "Bank account for payments"
  ];

  const handleGetStarted = () => {
    if (user) {
      navigate("/vendor/register");
    } else {
      navigate("/auth", { state: { returnTo: "/vendor/register" } });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-primary text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Grow Your African Business Online
            </h1>
            <p className="text-xl mb-8">
              Join Shop African Brand's marketplace and reach customers worldwide
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={handleGetStarted}
              className="text-primary hover:text-primary-dark"
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
                <Card key={index}>
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
                <div className="space-y-4">
                  {requirements.map((requirement, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
                      <span>{requirement}</span>
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
                      <h4 className="text-lg font-semibold mb-2">Create an Account</h4>
                      <p className="text-gray-600">Sign up for a seller account with your business details.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-4 flex-shrink-0">2</div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2">Complete Verification</h4>
                      <p className="text-gray-600">Submit required documents and complete the verification process.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-4 flex-shrink-0">3</div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2">Set Up Your Store</h4>
                      <p className="text-gray-600">Add your products and customize your store profile.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-4 flex-shrink-0">4</div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2">Start Selling</h4>
                      <p className="text-gray-600">Begin receiving orders and growing your business.</p>
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
            className="px-8"
          >
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SellOnShopAfrican;