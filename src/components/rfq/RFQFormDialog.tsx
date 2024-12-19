import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { FileText } from "lucide-react";

interface RFQFormDialogProps {
  productId: string;
  vendorId: string;
  productName: string;
}

export const RFQFormDialog = ({ productId, vendorId, productName }: RFQFormDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    quantity: "",
    desiredPrice: "",
    deliveryLocation: "",
    requirements: "",
    documents: [] as File[],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please sign in to submit an RFQ");
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.from("rfq_requests").insert([
        {
          buyer_id: user.id,
          vendor_id: vendorId,
          product_id: productId,
          quantity: parseInt(formData.quantity),
          desired_price: parseFloat(formData.desiredPrice),
          delivery_location: formData.deliveryLocation,
          requirements: formData.requirements,
          status: "pending",
        },
      ]);

      if (error) throw error;

      toast.success("RFQ submitted successfully");
      setOpen(false);
      setFormData({
        quantity: "",
        desiredPrice: "",
        deliveryLocation: "",
        requirements: "",
        documents: [],
      });
    } catch (error) {
      console.error("Error submitting RFQ:", error);
      toast.error("Failed to submit RFQ");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <FileText className="w-4 h-4 mr-2" />
          Request Quotation
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Request for Quotation - {productName}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity Required</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              required
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: e.target.value })
              }
              placeholder="Enter quantity"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="desiredPrice">Target Price Per Unit (USD)</Label>
            <Input
              id="desiredPrice"
              type="number"
              step="0.01"
              min="0"
              value={formData.desiredPrice}
              onChange={(e) =>
                setFormData({ ...formData, desiredPrice: e.target.value })
              }
              placeholder="Enter your target price"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="deliveryLocation">Delivery Location</Label>
            <Input
              id="deliveryLocation"
              required
              value={formData.deliveryLocation}
              onChange={(e) =>
                setFormData({ ...formData, deliveryLocation: e.target.value })
              }
              placeholder="Enter delivery location"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements">Additional Requirements</Label>
            <Textarea
              id="requirements"
              value={formData.requirements}
              onChange={(e) =>
                setFormData({ ...formData, requirements: e.target.value })
              }
              placeholder="Enter any specific requirements or notes"
              rows={4}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit RFQ"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};