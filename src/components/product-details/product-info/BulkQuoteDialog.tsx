import { RFQForm } from "@/components/rfq/RFQForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface BulkQuoteDialogProps {
  showRFQ: boolean;
  setShowRFQ: (show: boolean) => void;
  productId: string;
  vendorId: string;
}

export const BulkQuoteDialog = ({
  showRFQ,
  setShowRFQ,
  productId,
  vendorId,
}: BulkQuoteDialogProps) => {
  return (
    <Dialog open={showRFQ} onOpenChange={setShowRFQ}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          Request Bulk Quote
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Request for Quotation</DialogTitle>
        </DialogHeader>
        <RFQForm
          productId={productId}
          vendorId={vendorId}
          onSuccess={() => setShowRFQ(false)}
        />
      </DialogContent>
    </Dialog>
  );
};