import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BarChart3, DollarSign, Globe2, Users } from "lucide-react";

const Affiliate = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary/10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Earn With Shop African Brand
            </h1>
            <p className="text-xl mb-8 text-gray-600">
              Join our affiliate program and earn competitive commissions by promoting authentic African products to a global audience.
            </p>
            <Button className="bg-primary hover:bg-primary/90 text-white">
              Join Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Key Benefits */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardContent className="p-6 text-center">
              <DollarSign className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">10% Commission</h3>
              <p className="text-gray-600">
                Earn competitive commission on every successful referral sale.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardContent className="p-6 text-center">
              <Globe2 className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Global Products</h3>
              <p className="text-gray-600">
                Promote authentic African products to a worldwide audience.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardContent className="p-6 text-center">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">30-Day Cookie</h3>
              <p className="text-gray-600">
                Get credit for sales within 30 days of customer clicks.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardContent className="p-6 text-center">
              <BarChart3 className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Real-time Analytics</h3>
              <p className="text-gray-600">
                Track your performance with detailed analytics dashboard.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="space-y-8">
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center mr-4 flex-shrink-0">1</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
                <p className="text-gray-600">
                  Create your free affiliate account and get instant access to our promotional materials.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center mr-4 flex-shrink-0">2</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Share Products</h3>
                <p className="text-gray-600">
                  Choose from our wide range of African products and share them with your audience using your unique affiliate link.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center mr-4 flex-shrink-0">3</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Earn Commission</h3>
                <p className="text-gray-600">
                  Earn 10% commission on every successful sale made through your affiliate links.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center mr-4 flex-shrink-0">4</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Get Paid</h3>
                <p className="text-gray-600">
                  Receive monthly payments via your preferred payment method (bank transfer, mobile money, or PayPal).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8">
            Start Earning Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <p className="mt-4 text-gray-600">
            Questions? Contact our affiliate support team
          </p>
        </div>
      </div>
    </div>
  );
};

export default Affiliate;