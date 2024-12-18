import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ContentBlockForm } from "./ContentBlockForm";
import { ContentBlockList } from "./ContentBlockList";
import { ContentBlock } from "./types";

export const ContentBlockManager = () => {
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlocks();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('content-block-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'content_blocks' },
        () => {
          fetchBlocks();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchBlocks = async () => {
    try {
      const { data, error } = await supabase
        .from('content_blocks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBlocks(data || []);
    } catch (error) {
      console.error('Error fetching content blocks:', error);
      toast.error("Failed to load content blocks");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading content blocks...</div>;
  }

  return (
    <div className="space-y-6">
      <ContentBlockForm onSuccess={fetchBlocks} />
      <ContentBlockList blocks={blocks} onRefetch={fetchBlocks} />
    </div>
  );
};