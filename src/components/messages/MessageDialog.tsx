import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChatInterface } from "./ChatInterface";
import { MessageSquare } from "lucide-react";

interface MessageDialogProps {
  vendorId: string;
  vendorName: string;
}

export const MessageDialog = ({ vendorId, vendorName }: MessageDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <MessageSquare className="h-4 w-4" />
          Message Vendor
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Chat with {vendorName}</DialogTitle>
        </DialogHeader>
        <ChatInterface recipientId={vendorId} recipientName={vendorName} />
      </DialogContent>
    </Dialog>
  );
};