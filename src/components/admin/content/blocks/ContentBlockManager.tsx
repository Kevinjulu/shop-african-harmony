import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ContentBlockForm } from "./ContentBlockForm";
import { ContentBlockList } from "./ContentBlockList";

interface ContentBlock {
  id: string;
  name: string;
  content: any;
  type: string;
  status: string;
  page: string | null;
}

export const ContentBlockManager = () => {
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlocks();
    
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

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('content_blocks')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      toast.success(`Content block ${newStatus}`);
    } catch (error) {
      console.error('Error updating content block status:', error);
      toast.error("Failed to update content block status");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('content_blocks')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success("Content block deleted successfully");
    } catch (error) {
      console.error('Error deleting content block:', error);
      toast.error("Failed to delete content block");
    }
  };

  if (loading) {
    return <div>Loading content blocks...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Content Block</CardTitle>
        </CardHeader>
        <CardContent>
          <ContentBlockForm onSuccess={fetchBlocks} />
        </CardContent>
      </Card>

      <ContentBlockList 
        blocks={blocks}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
      />
    </div>
  );
};