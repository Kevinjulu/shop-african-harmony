import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const TrackOrder = () => {
  const [trackingNumber, setTrackingNumber] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) {
      toast.error("Please enter a tracking number");
      return;
    }
    
    // TODO: Implement actual tracking logic
    toast.info("Tracking feature coming soon!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Track Your Order</h1>
        
        <div className="max-w-xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="tracking-number" className="block text-sm font-medium text-gray-700 mb-1">
                  Order Tracking Number
                </label>
                <Input
                  id="tracking-number"
                  type="text"
                  placeholder="Enter your tracking number"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <Button type="submit" className="w-full">
                Track Order
              </Button>
            </form>
            
            <div className="mt-6 text-sm text-gray-600">
              <p>Don't have a tracking number?</p>
              <ul className="list-disc ml-5 mt-2">
                <li>Check your order confirmation email</li>
                <li>Log in to your account to view order details</li>
                <li>Contact our support team for assistance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;