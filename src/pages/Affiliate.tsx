import { Navbar } from "@/components/navbar/Navbar";
import { Button } from "@/components/ui/button";

const Affiliate = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Affiliate Program</h1>

        <div className="bg-primary/10 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Earn With Us</h2>
          <p className="text-lg mb-6">
            Join our affiliate program and earn commission by promoting authentic African products.
          </p>
          <Button className="bg-mart-yellow hover:bg-mart-yellow/90 text-black">
            Join Now
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">10% Commission</h3>
            <p className="text-gray-600">
              Earn competitive commission on every successful referral.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">30-Day Cookie</h3>
            <p className="text-gray-600">
              Get credit for sales within 30 days of customer clicks.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Monthly Payments</h3>
            <p className="text-gray-600">
              Receive your earnings monthly via bank transfer or mobile money.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Affiliate;