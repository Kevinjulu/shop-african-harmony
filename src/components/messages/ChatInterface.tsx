import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/components/AuthProvider";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender_id: string;
  receiver_id: string;
  created_at: string;
  sender?: {
    full_name: string;
  };
}

interface ChatInterfaceProps {
  recipientId: string;
  recipientName: string;
}

export const ChatInterface = ({ recipientId, recipientName }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!user) return;

      try {
        console.log("Fetching messages between:", user.id, "and", recipientId);
        const { data, error } = await supabase
          .from("messages")
          .select(`
            *,
            sender:profiles!messages_sender_id_fkey(full_name)
          `)
          .or(`and(sender_id.eq.${user.id},receiver_id.eq.${recipientId}),and(sender_id.eq.${recipientId},receiver_id.eq.${user.id})`)
          .order("created_at", { ascending: true });

        if (error) throw error;
        console.log("Fetched messages:", data);
        setMessages(data || []);
      } catch (error) {
        console.error("Error fetching messages:", error);
        toast.error("Failed to load messages");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();

    // Subscribe to new messages
    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `or(and(sender_id.eq.${user?.id},receiver_id.eq.${recipientId}),and(sender_id.eq.${recipientId},receiver_id.eq.${user?.id}))`,
        },
        (payload) => {
          console.log("New message received:", payload);
          setMessages((current) => [...current, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, recipientId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newMessage.trim()) return;

    try {
      console.log("Sending message to:", recipientId);
      const { error } = await supabase.from("messages").insert([
        {
          content: newMessage.trim(),
          sender_id: user.id,
          receiver_id: recipientId,
        },
      ]);

      if (error) throw error;
      setNewMessage("");
      toast.success("Message sent");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[500px] border rounded-lg">
      <div className="p-4 border-b bg-muted">
        <h3 className="font-medium">{recipientName}</h3>
      </div>

      <ScrollArea ref={scrollRef} className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender_id === user?.id ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  message.sender_id === user?.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p>{message.content}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {new Date(message.created_at).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <form onSubmit={sendMessage} className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="submit" disabled={!newMessage.trim()}>
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};