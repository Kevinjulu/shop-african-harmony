import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

export const NewsletterPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [dontShow, setDontShow] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem("newsletter-popup-seen");
    const timeoutId = setTimeout(() => {
      if (!hasSeenPopup) {
        setIsOpen(true);
      }
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    if (dontShow) {
      localStorage.setItem("newsletter-popup-seen", "true");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Thank you for subscribing to our newsletter!");
      localStorage.setItem("newsletter-popup-seen", "true");
      setIsOpen(false);
      setEmail("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-2xl bg-white p-8 rounded-lg shadow-xl mx-4">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-2">
              Get <span className="text-primary">25%</span> Off
            </h2>
            <p className="text-gray-600 mb-2">
              Join our Shop Africa Brand Community
            </p>
            <p className="text-gray-600 mb-6">
              Subscribe to receive updates on new arrivals, special offers, and authentic African crafts.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                required
              />
              
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                Subscribe Now
              </Button>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="dontShow"
                  checked={dontShow}
                  onCheckedChange={(checked) => setDontShow(checked as boolean)}
                />
                <label
                  htmlFor="dontShow"
                  className="text-sm text-gray-600 cursor-pointer"
                >
                  Don't show this popup again
                </label>
              </div>
            </form>
          </div>
          
          <div className="hidden md:block">
            <img
              src="/lovable-uploads/517e44fb-ebae-4f80-b44f-21411b66b3c0.png"
              alt="African beaded jewelry and crafts"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};