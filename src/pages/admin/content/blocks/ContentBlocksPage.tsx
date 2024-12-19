import { useState, useEffect } from "react";
import { ContentBlockForm } from "@/components/admin/content/blocks/ContentBlockForm";
import { ContentBlockList } from "@/components/admin/content/blocks/ContentBlockList";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { ContentBlock } from "@/components/admin/content/blocks/types";
import { supabase } from "@/integrations/supabase/client";

const ContentBlocksPage = () => {
  const [selectedBlock, setSelectedBlock] = useState<ContentBlock | null>(null);
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);

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
    }
  };

  useEffect(() => {
    fetchBlocks();
  }, []);

  const handleSuccess = () => {
    toast.success(selectedBlock ? "Content block updated" : "Content block created");
    setSelectedBlock(null);
    fetchBlocks();
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Content Blocks</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <ContentBlockForm 
            block={selectedBlock} 
            onSuccess={handleSuccess} 
          />
        </Card>

        <Card className="p-6">
          <ContentBlockList
            blocks={blocks}
            onRefetch={fetchBlocks}
            onEdit={setSelectedBlock}
          />
        </Card>
      </div>
    </div>
  );
};

export default ContentBlocksPage;