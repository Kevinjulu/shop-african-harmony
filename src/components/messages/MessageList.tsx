import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";
import { Loader2 } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender_id: string;
  receiver_id: string;
  created_at: string;
  sender: {
    full_name: string;
  };
  receiver: {
    full_name: string;
  };
}

export const MessageList = ({ vendorId }: { vendorId: string }) => {
  const { user } = useAuth();

  const { data: messages, isLoading } = useQuery({
    queryKey: ["messages", user?.id, vendorId],
    queryFn: async () => {
      console.log("Fetching messages for conversation:", { user: user?.id, vendor: vendorId });
      const { data, error } = await supabase
        .from("messages")
        .select(`
          *,
          sender:profiles!messages_sender_id_fkey(full_name),
          receiver:profiles!messages_receiver_id_fkey(full_name)
        `)
        .or(`sender_id.eq.${user?.id},receiver_id.eq.${user?.id}`)
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data as Message[];
    },
    enabled: !!user && !!vendorId
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <ScrollArea className="h-[400px] pr-4">
      <div className="space-y-4">
        {messages?.map((message) => (
          <Card
            key={message.id}
            className={`${
              message.sender_id === user?.id
                ? "ml-auto bg-primary text-primary-foreground"
                : "mr-auto bg-muted"
            } max-w-[80%]`}
          >
            <CardContent className="p-3">
              <div className="flex flex-col">
                <span className="text-sm font-medium">
                  {message.sender_id === user?.id ? "You" : message.sender.full_name}
                </span>
                <p className="mt-1">{message.content}</p>
                <span className="text-xs opacity-70 mt-1">
                  {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};