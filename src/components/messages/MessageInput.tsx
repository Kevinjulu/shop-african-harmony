import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { toast } from "sonner";
import { Send } from "lucide-react";

interface MessageInputProps {
  vendorId: string;
  onMessageSent?: () => void;
}

export const MessageInput = ({ vendorId, onMessageSent }: MessageInputProps) => {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { user } = useAuth();

  const handleSend = async () => {
    if (!message.trim() || !user) return;

    setIsSending(true);
    try {
      const { error } = await supabase.from("messages").insert({
        content: message.trim(),
        sender_id: user.id,
        receiver_id: vendorId,
      });

      if (error) throw error;

      setMessage("");
      onMessageSent?.();
      toast.success("Message sent successfully");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex gap-2">
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="resize-none"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
      />
      <Button
        onClick={handleSend}
        disabled={!message.trim() || isSending}
        className="px-3"
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
};